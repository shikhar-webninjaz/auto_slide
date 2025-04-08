import AIContentGenerator from './storyline-generator';
import { selectImagesFromS3 } from './s3ImageRetreiever';
import createConnection from "@/lib/db";
import generateImagePrompts from './imagePromptGeneration';
import { generateImage } from './imageGenerator';

const BUCKET_NAME = 'ninjaslides';

export async function POST(request) {
    let connection;
    try {
        // Parse the request body
        const { category, userId, productName, productDescription } = await request.json();

        // Validate required parameters
        if (!category || !userId || !productName || !productDescription) {
            return new Response(
                JSON.stringify({ error: 'Missing required parameters' }),
                { status: 400 }
            );
        }

        // Api Checking

        const query = `
            SELECT * FROM public.user WHERE id = $1;
        `;

        connection = await createConnection();
        const updateData = await connection.query(query, [userId]);

        if (updateData.rows[0].credits < 10) {
            return new Response(
                JSON.stringify({ error: "Insufficient Credits to use" }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
        }
        // Create DB connection

        // Generate story template
        const generator = new AIContentGenerator();
        const template = await generator.generateTemplate(category, productName, productDescription);

        console.log(template);

        // Convert the template to a storyline string
        const storyline = `
            Hook: ${template.hook}
            Filler1: ${template.filler1}
            Filler2: ${template.filler2}
            Filler3: ${template.filler3}
            Bait: ${template.bait}
            CTA: ${template.cta}
        `;

        // Generate image prompts
        const imagePromptsResponse = await generateImagePrompts(storyline, category);

        // Extract and format image prompts
        const imagePromptsText = imagePromptsResponse.content[0].text;
        const imagePrompts = imagePromptsText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line);

        // Select specific prompts by index
        const selectedPrompts = [imagePrompts[0], imagePrompts[1], imagePrompts[2], imagePrompts[5]];

        // Generate images using FAL API for selected prompts
        const imageUrls = await Promise.all(selectedPrompts.map(async (prompt) => {
            const result = await generateImage(prompt);
        
            // Ensure result contains valid image data
            if (result) {
                return result;  // Directly return the URL from generateImage
            }
            return null;  // Return null if no valid image is found
        }));

        // Filter out any null values in case some images were not generated
        const validImageUrls = imageUrls.filter(url => url !== null);

        // Pass the valid image URLs to selectImagesFromS3
        const imagePaths = await selectImagesFromS3(
            BUCKET_NAME,
            category,
            userId,
            productName,
            connection,
            validImageUrls // Pass the generated image URLs here
        );

        // console.log("imagePaths : ", imagePaths);
        if(imagePaths.includes(undefined)) {
            return new Response(
                JSON.stringify({ error: "something went wrong..." }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
        }
        // Log or return the valid image URLs
        // console.log(validImageUrls);

        const query2 = `
            UPDATE public.user
            SET credits = credits - 10
            WHERE id = $1 AND credits >= 10;
        `;

        const updateResult = await connection.query(query2, [userId]);
        if (updateResult.rowCount == 0) {
            return new Response(
                JSON.stringify({ error: "something went wrong..." }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
        }

        // Combine both results
        return new Response(
            JSON.stringify({
                success: true,
                imagePaths, // Use the filtered valid image URLs
                template: {
                    0: template.hook,
                    1: template.filler1,
                    2: template.filler2,
                    3: template.filler3,
                    4: template.bait,
                    5: template.cta
                },
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

    } catch (error) {
        console.error('Error in POST handler:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }
    // finally {
    //     if (connection) {
    //         await connection.end();
    //     }
    // }
}