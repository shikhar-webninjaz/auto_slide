import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY, // Use environment variable for security
});

export default async function generateImagePrompts(storyline, category) {
  const msg = await anthropic.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 20000,
    temperature: 1,
    messages: [
      {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": `Generate six image search queries for an Instagram and Tik Tok carousel post based on the storyline and theme. Each query must focus on a person in the image to make it engaging and less dramatic and make sure the lightning is perfect and ensure images are SFW while being cinematic.\n\nGuidelines:\nmake sure to write 50 word search query for every image.\nOutput only the six image search queries, with no titles, headings, or numbering.\nEach query must be short, descriptive, and visually relevant.\nEnsure a progression from the problem (before) to the solution (after).\nDo not include extra text, explanations, or formatting.\nEach query should describe a specific moment from the transformation journey\nInclude a person in every search query to ensure relatability.\nEnsure progression from the before stage (problem) to the after stage (solution).\nKeep it aesthetically appealing for social media.\n\nStoryline:\n${storyline}\n\nTheme:\n${category}`
            }
        ]
      }
    ]
  });

  return msg;
}