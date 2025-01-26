import { includeDomains as configIncludeDomains } from '@/lib/config'
import { searchSchema } from '@/lib/schema/search'
import {
  SearchResultImage,
  SearchResultItem,
  SearchResults,
  SearXNGResponse,
  SearXNGResult
} from '@/lib/types'
import { sanitizeUrl } from '@/lib/utils'
import { tool } from 'ai'
import Exa from 'exa-js'

export const searchTool = tool({
  description: 'Search the web for information',
  parameters: searchSchema,
  execute: async ({
    query,
    max_results,
    search_depth,
    include_domains = configIncludeDomains,
    exclude_domains
  }) => {
    // Tavily API requires a minimum of 5 characters in the query
    const filledQuery =
      query.length < 5 ? query + ' '.repeat(5 - query.length) : query
    let searchResult: SearchResults
    const searchAPI =
      (process.env.SEARCH_API as 'tavily' | 'exa' | 'searxng') || 'tavily'

    const effectiveSearchDepth =
      searchAPI === 'searxng' &&
      process.env.SEARXNG_DEFAULT_DEPTH === 'advanced'
        ? 'advanced'
        : search_depth || 'basic'

    console.log(
      `Using search API: ${searchAPI}, Search Depth: ${effectiveSearchDepth}`
    )
    console.log(`Query: ${query}, Max Results: ${max_results}, Search Depth: ${search_depth}`);
    console.log(`Include Domains: ${include_domains}, Exclude Domains: ${exclude_domains}`);

    try {
      if (searchAPI === 'searxng' && effectiveSearchDepth === 'advanced') {
        // API route for advanced SearXNG search
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/advanced-search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: filledQuery,
            maxResults: max_results,
            searchDepth: effectiveSearchDepth,
            includeDomains: include_domains,
            excludeDomains: exclude_domains,
            includeImages: true // Force image search
          })
        })
        if (!response.ok) {
          throw new Error(
            `Advanced search API error: ${response.status} ${response.statusText}`
          )
        }
        searchResult = await response.json()
        console.log('Advanced SearXNG search result:', searchResult);
      } else {
        searchResult = await (searchAPI === 'tavily'
          ? tavilySearch
          : searchAPI === 'exa'
          ? exaSearch
          : searxngSearch)(
          filledQuery,
          max_results,
          effectiveSearchDepth === 'advanced' ? 'advanced' : 'basic',
          include_domains,
          exclude_domains
        )
        console.log(`${searchAPI} search result:`, searchResult);
      }
    } catch (error) {
      console.error('Search API error:', error)
      searchResult = {
        results: [],
        query: filledQuery,
        images: [],
        number_of_results: 0
      }
    }

    return searchResult
  }
})

async function tavilySearch(
  query: string,
  maxResults: number = 10,
  searchDepth: 'basic' | 'advanced' = 'advanced',
  includeDomains: string[] = [],
  excludeDomains: string[] = []
): Promise<SearchResults> {
  const apiKey = process.env.TAVILY_API_KEY
  if (!apiKey) {
    throw new Error('TAVILY_API_KEY is not set in the environment variables')
  }
  const includeImageDescriptions = true
  const domainQuery = includeDomains.length > 0 ? ` site:${includeDomains.join(' OR ')}` : ''
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: apiKey,
      query: query + domainQuery,
      max_results: Math.max(maxResults, 2),
      search_depth: 'advanced', // Always use advanced mode
      include_images: true, // Force image search
      include_image_descriptions: includeImageDescriptions,
      include_answers: true,
      include_domains: includeDomains,
      exclude_domains: excludeDomains
    })
  })

  if (!response.ok) {
    throw new Error(
      `Tavily API error: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()
  console.log('Tavily search result:', data);
  const processedImages = includeImageDescriptions
    ? data.images
        .map(({ url, description }: { url: string; description: string }) => ({
          url: sanitizeUrl(url),
          description
        }))
        .filter(
          (
            image: SearchResultImage
          ): image is { url: string; description: string } =>
            typeof image === 'object' &&
            image.description !== undefined &&
            image.description !== ''
        )
        .filter((image: { url: string; description: string }) => includeDomains.some(domain => image.url.includes(domain))) // Filtrer les images par domaine
    : data.images
        .map((url: string) => sanitizeUrl(url))
        .filter((url: string) => includeDomains.some(domain => url.includes(domain))) // Filtrer les images par domaine

  // Add default images if no images are found
  if (processedImages.length === 0) {
    processedImages.push({
      url: 'https://example.com/default-image.jpg',
      description: 'Default image'
    })
  }

  return {
    ...data,
    images: processedImages
  }
}

async function exaSearch(
  query: string,
  maxResults: number = 10,
  _searchDepth: string,
  includeDomains: string[] = [],
  excludeDomains: string[] = []
): Promise<SearchResults> {
  const apiKey = process.env.EXA_API_KEY
  if (!apiKey) {
    throw new Error('EXA_API_KEY is not set in the environment variables')
  }

  const exa = new Exa(apiKey)
  const exaResults = await exa.searchAndContents(query, {
    highlights: true,
    numResults: maxResults,
    includeDomains,
    excludeDomains
  })
  console.log('Exa search result:', exaResults);
  return {
    results: exaResults.results.map((result: any) => ({
      title: result.title,
      url: result.url,
      content: result.highlight || result.text
    })),
    query,
    images: [], // No image search in Exa
    number_of_results: exaResults.results.length
  }
}

async function searxngSearch(
  query: string,
  maxResults: number = 10,
  searchDepth: string,
  includeDomains: string[] = [],
  excludeDomains: string[] = []
): Promise<SearchResults> {
  const apiUrl = process.env.SEARXNG_API_URL
  if (!apiUrl) {
    throw new Error('SEARXNG_API_URL is not set in the environment variables')
  }

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/search`)
    const domainQuery = includeDomains.length > 0 ? ` site:${includeDomains.join(' OR ')}` : ''
    url.searchParams.append('q', query + domainQuery)
    url.searchParams.append('format', 'json')
    url.searchParams.append('categories', 'general,images') // Force image search

    // Apply search depth settings
    if (searchDepth === 'advanced') {
      url.searchParams.append('time_range', '')
      url.searchParams.append('safesearch', '0')
      url.searchParams.append('engines', 'google,bing,duckduckgo,wikipedia')
    } else {
      url.searchParams.append('time_range', 'year')
      url.searchParams.append('safesearch', '1')
      url.searchParams.append('engines', 'google,bing')
    }

    // Fetch results from SearXNG
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`SearXNG API error (${response.status}):`, errorText)
      throw new Error(
        `SearXNG API error: ${response.status} ${response.statusText} - ${errorText}`
      )
    }

    const data: SearXNGResponse = await response.json()
    console.log('SearXNG search result:', data);
    // Separate general results and image results, and limit to maxResults
    const generalResults = data.results
      .filter(result => !result.img_src)
      .slice(0, maxResults)
    const imageResults = data.results
      .filter(result => result.img_src)
      .slice(0, maxResults)

    // Format the results to match the expected SearchResults structure
    return {
      results: generalResults.map(
        (result: SearXNGResult): SearchResultItem => ({
          title: result.title,
          url: result.url,
          content: result.content
        })
      ),
      query: data.query,
      images: imageResults
        .map(result => {
          const imgSrc = result.img_src || ''
          return imgSrc.startsWith('http') ? imgSrc : `${apiUrl}${imgSrc}`
        })
        .filter(Boolean),
      number_of_results: data.number_of_results
    }
  } catch (error) {
    console.error('SearXNG API error:', error)
    throw error
  }
}
