
// ...existing code...

export default async function handler(req, res) {
  // Log environment variables
  console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
  console.log('OPENAI_API_MODEL:', process.env.OPENAI_API_MODEL);

  // ...existing code...
}