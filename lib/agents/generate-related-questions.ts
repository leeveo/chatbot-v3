import { includeDomains } from '@/lib/config'; // Import the config variables
import { relatedSchema } from '@/lib/schema/related';
import { CoreMessage, generateObject } from 'ai';
import { fetchSimilarProfiles, getModel } from '../utils/registry';

export async function generateRelatedQuestions(
  messages: CoreMessage[],
  model: string
) {
  const lastMessages = messages.slice(-1).map(message => ({
    ...message,
    role: 'user'
  })) as CoreMessage[]

  const result = await generateObject({
    model: getModel(model),
    system: `As a professional web researcher, your task is to generate a set of three queries that explore the subject matter more deeply providing from ${includeDomains[0]}, building upon the initial query and the information uncovered in its search results.

    For instance, if the original query was "Starship's third test flight key milestones", your output should follow this format:

    Aim to create queries that progressively delve into more specific aspects, implications, or adjacent topics related to the initial query and from ${includeDomains[0]}. The goal is to anticipate the user's potential information needs and guide them towards a more comprehensive understanding of the subject matter.
    Please match the language of the response to the user's language.`,
    messages: lastMessages,
    schema: relatedSchema
  })

  // Check if the last message contains a LinkedIn profile URL
  const lastMessageContent = lastMessages[0].content;
  if (typeof lastMessageContent === 'string' && lastMessageContent.includes('linkedin.com/in/')) {
    const urlMatch = lastMessageContent.match(/https:\/\/www\.linkedin\.com\/in\/[^\s]+/);
    if (urlMatch) {
      const similarProfilesData = await fetchSimilarProfiles(urlMatch[0]);
      const similarProfiles = JSON.parse(similarProfilesData);

      // Add similar profiles to the result
      result.object.similarProfiles = similarProfiles.profiles.map((profile: any) => ({
        name: `${profile.firstName} ${profile.lastName}`,
        headline: profile.headline,
        url: profile.url
      }));
    }
  }

  return result
}
