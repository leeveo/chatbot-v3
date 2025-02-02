import { CoreMessage, smoothStream, streamText } from 'ai';
import { retrieveGoogleNewsTool, retrievePostsTool, retrieveTool } from '../tools/retrieve';
import { searchTool } from '../tools/search';
import { videoSearchTool } from '../tools/video-search';
import { getModel } from '../utils/registry';

const TEMPERATURE = 0.6; // Ajustable selon besoin

const SYSTEM_PROMPT = `
// ...existing code...
`

type ResearcherReturn = Parameters<typeof streamText>[0]

export async function researcher({
  messages,
  model
}: {
  messages: CoreMessage[]
  model: string
}): Promise<ResearcherReturn> {
  try {
    const currentDate = new Date().toLocaleString()
    const lastMessage = messages[messages.length - 1].content as string;
    let linkedInData = '';
    let linkedInPostsData = '';
    let googleNewsData = '';
    let profilePicture = '';

    if (lastMessage.includes('linkedin.com')) {
      const urlMatch = lastMessage.match(/https:\/\/www\.linkedin\.com\/in\/[^\s]+/);
      if (urlMatch) {
        console.log(`LinkedIn URL found in message: ${urlMatch[0]}`); // Log the LinkedIn URL found
        const results = await retrieveTool.execute(
          { url: urlMatch[0] },
          { toolCallId: 'retrieve-linkedin-profile', messages: [] }
        );
        if (results && results.results && results.results.length > 0) {
          linkedInData = results.results[0].content;
          // Vérifiez si la propriété images existe et est un tableau
          if (Array.isArray(results.results[0].images) && results.results[0].images.length > 0) {
            profilePicture = results.results[0].images[0];
          }
          console.log(`Fetched LinkedIn data: ${linkedInData}`); // Log the fetched LinkedIn data
          console.log(`Fetched LinkedIn profile picture: ${profilePicture}`); // Log the fetched LinkedIn profile picture
        }
      }

      const postUrlMatch = lastMessage.match(/https:\/\/www\.linkedin\.com\/feed\/update\/urn:li:activity:[^\s]+/);
      if (postUrlMatch) {
        console.log(`LinkedIn post URL found in message: ${postUrlMatch[0]}`); // Log the LinkedIn post URL found
        const postsResults = await retrievePostsTool.execute(
          { url: postUrlMatch[0] },
          { toolCallId: 'retrieve-linkedin-post', messages: [] }
        );
        if (postsResults && postsResults.results && postsResults.results.length > 0) {
          linkedInPostsData = postsResults.results[0].content;
          console.log(`Fetched LinkedIn posts data: ${linkedInPostsData}`); // Log the fetched LinkedIn posts data
        } else {
          console.log(`No LinkedIn posts data found for URL: ${postUrlMatch[0]}`); // Log if no posts data found
        }
      }
    }

    if (lastMessage.toLowerCase().includes('dernières nouvelles en intelligence artificielle')) {
      const newsResults = await retrieveGoogleNewsTool.execute(
        {},
        { toolCallId: 'retrieve-google-news', messages: [] }
      );
      if (newsResults && newsResults.results && newsResults.results.length > 0) {
        googleNewsData = newsResults.results[0].content;
        console.log(`Fetched Google News data: ${googleNewsData}`); // Log the fetched Google News data
      }
    }

    const systemPromptWithLinkedInData = `${SYSTEM_PROMPT}\nCurrent date and time: ${currentDate}\n${linkedInData}\nProfile Picture: ${profilePicture}\n${linkedInPostsData}\n${googleNewsData}`;

    return {
      model: getModel(model),
      system: systemPromptWithLinkedInData,
      messages,
      tools: {
        search: searchTool,
        retrieve: retrieveTool,
        videoSearch: videoSearchTool
      },
      maxSteps: 5,
      experimental_transform: smoothStream(),
      temperature: TEMPERATURE
    }
  } catch (error) {
    console.error('Error in chatResearcher:', error)
    throw error
  }
}
