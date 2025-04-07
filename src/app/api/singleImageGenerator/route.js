import { NextResponse } from 'next/server';
import { generateImage } from './imageGenertaor';

export async function POST(request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        const imageUrl = await generateImage(prompt);

        if (!imageUrl) {
            return NextResponse.json(
                { error: 'Failed to generate image' },
                { status: 500 }
            );
        }

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Error in singleImageGenerator:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 