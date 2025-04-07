import { fal } from "@fal-ai/client";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export async function generateImage(prompt) {
    try {
        // fal key updated
        // const falKey = process.env.FAL_KEY;
        const falKey = "5fc2a9ca-314a-4759-9fd2-2bc0f9572aa2:7050f0c821697cc515446cf3ad16d028"
        if (!falKey) {
            console.error("FAL API key is not set.");
            return null;
        }

        const result = await fal.subscribe("fal-ai/minimax-image", {
            input: {
                prompt,
                aspect_ratio: "9:16",
                num_images: 1
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });

        console.log("FAL Response:", result.data);

        // Ensure result.data exists and has images
        if (result.data && result.data.images && result.data.images.length > 0) {
            return result.data.images[0].url;  // Extract the first image URL
        }

        return null;  // Return null if no valid image found

    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
}
