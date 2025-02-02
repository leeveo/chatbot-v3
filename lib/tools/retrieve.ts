import { retrieveSchema } from '@/lib/schema/retrieve'
import { SearchResults as SearchResultsType } from '@/lib/types'
import { tool } from 'ai'
import { fetchGoogleNews, fetchLinkedInData, fetchLinkedInPosts, fetchSimilarProfiles } from '../utils/registry'

const CONTENT_CHARACTER_LIMIT = 10000

async function fetchTavilyExtractData(
  url: string
): Promise<SearchResultsType | null> {
  try {
    const apiKey = process.env.TAVILY_API_KEY
    const response = await fetch('https://api.tavily.com/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ api_key: apiKey, urls: [url] })
    })
    const json = await response.json()
    if (!json.results || json.results.length === 0) {
      return null
    }

    const result = json.results[0]
    // Limite le contenu brut à CONTENT_CHARACTER_LIMIT caractères
    const content = result.raw_content.slice(0, CONTENT_CHARACTER_LIMIT)

    return {
      results: [
        {
          title: content.slice(0, 100), // Utilise les 100 premiers caractères comme titre
          content,
          url: result.url
        }
      ],
      query: '',
      images: []
    }
  } catch (error) {
    console.error('Tavily Extract API error:', error)
    return null
  }
}

async function fetchLinkedInProfileData(
  url: string
): Promise<SearchResultsType | null> {
  try {
    const linkedInData = await fetchLinkedInData(url)
    const linkedInProfile = JSON.parse(linkedInData)

    const content = `
Name: ${linkedInProfile.firstName} ${linkedInProfile.lastName}
Headline: ${linkedInProfile.headline}
Location: ${linkedInProfile.geo?.full}
Summary: ${linkedInProfile.summary}
Current Position: ${linkedInProfile.position?.[0]?.title} at ${linkedInProfile.position?.[0]?.companyName}
Skills: ${linkedInProfile.skills?.map((skill: { name: string }) => skill.name).join(', ')}
Photo: ${linkedInProfile.profilePicture}
`

    return {
      results: [
        {
          title: `${linkedInProfile.firstName} ${linkedInProfile.lastName} - LinkedIn Profile`,
          content,
          url
        }
      ],
      query: '',
      images: [linkedInProfile.profilePicture]
    }
  } catch (error) {
    console.error('LinkedIn Profile Data Fetch Error:', error)
    return null
  }
}

async function fetchLinkedInProfilePosts(
  url: string
): Promise<SearchResultsType | null> {
  try {
    const linkedInPostsData = await fetchLinkedInPosts(url)
    const linkedInPost = JSON.parse(linkedInPostsData)

    const content = `
Post:
- Content: ${linkedInPost.content}
- Date: ${linkedInPost.date}
- Likes: ${linkedInPost.likes}
- Comments: ${linkedInPost.comments}
`

    return {
      results: [
        {
          title: `Post from ${url}`,
          content,
          url
        }
      ],
      query: '',
      images: []
    }
  } catch (error) {
    console.error('LinkedIn Profile Posts Fetch Error:', error)
    return null
  }
}

async function fetchGoogleNewsData(): Promise<SearchResultsType | null> {
  try {
    const googleNewsData = await fetchGoogleNews()
    const googleNews = JSON.parse(googleNewsData)

    const content = googleNews.articles.map((article: any) => `
Article:
- Title: ${article.title}
- Snippet: ${article.snippet}
- Publisher: ${article.publisher}
- URL: ${article.newsUrl}
`).join('\n')

    return {
      results: [
        {
          title: `Latest AI News`,
          content,
          url: 'https://news.google.com'
        }
      ],
      query: '',
      images: []
    }
  } catch (error) {
    console.error('Google News Data Fetch Error:', error)
    return null
  }
}

async function fetchSimilarProfilesData(
  url: string
): Promise<SearchResultsType | null> {
  try {
    const similarProfilesData = await fetchSimilarProfiles(url)
    const similarProfiles = JSON.parse(similarProfilesData)

    const content = similarProfiles.profiles.map((profile: any) => `
Profile:
- Name: ${profile.firstName} ${profile.lastName}
- Headline: ${profile.headline}
- URL: ${profile.url}
`).join('\n')

    return {
      results: [
        {
          title: `Similar Profiles`,
          content,
          url
        }
      ],
      query: '',
      images: []
    }
  } catch (error) {
    console.error('Similar Profiles Data Fetch Error:', error)
    return null
  }
}

export const retrieveTool = tool({
  description: 'Retrieve content from the web',
  parameters: retrieveSchema,
  execute: async ({ url }) => {
    if (url.includes('linkedin.com/in/')) {
      return await fetchLinkedInProfileData(url)
    }

    const results = await fetchTavilyExtractData(url)

    if (!results) {
      return null
    }

    return results
  }
})

export const retrievePostsTool = tool({
  description: 'Retrieve LinkedIn posts from a profile',
  parameters: retrieveSchema,
  execute: async ({ url }) => {
    return await fetchLinkedInProfilePosts(url)
  }
})

export const retrieveGoogleNewsTool = tool({
  description: 'Retrieve latest AI news from Google News',
  parameters: retrieveSchema,
  execute: async () => {
    return await fetchGoogleNewsData()
  }
})

export const retrieveSimilarProfilesTool = tool({
  description: 'Retrieve similar profiles from LinkedIn',
  parameters: retrieveSchema,
  execute: async ({ url }) => {
    return await fetchSimilarProfilesData(url)
  }
})
