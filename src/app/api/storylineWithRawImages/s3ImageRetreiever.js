import createConnection from "@/lib/db"; // Assuming this function establishes a connection to PostgreSQL
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";



const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  },
});

function getS3Url(bucketName, objectKey, region = "us-east-1") {
    // Generate a proper S3 URL for the object key
    return `https://${bucketName}.s3.${region}.amazonaws.com/${objectKey}`;
}

export async function retrieveProductImgPathsFromS3(userId, productName, connection) {
    // Remove connection creation here since we'll pass it in
    try {
        const query = `
            SELECT product_name, user_id, files 
            FROM public.slideProduct 
            WHERE user_id = $1 AND product_name ILIKE $2;
        `;

        const result = await connection.query(query, [userId, productName]);

        if (result.rows.length === 0) {
            throw new Error(`No records found for product: ${productName}`);
        }

        const record = result.rows[Math.floor(Math.random() * result.rows.length)];
        const allPaths = JSON.parse(record.files);

        if (allPaths.length === 0) {
            throw new Error(`Need at least 2 product images, found ${allPaths.length}`);
        }

        const paths = allPaths.length === 1 ? [allPaths[0], allPaths[0]] : allPaths;
        const twoRandomImgPaths = paths.sort(() => 0.5 - Math.random()).slice(0, 2);

        return twoRandomImgPaths;

    } catch (error) {
        throw new Error(`Error retrieving product images: ${error.message}`);
    }
    // Remove the finally block that ends the connection
}

export async function selectImagesFromS3(bucketName, category, userId, productName, connection, generatedImageUrls, region = process.env.NEXT_PUBLIC_REGION) {
    try {
        const categoryPrefix = `unsplash_images/${category}/`;
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: categoryPrefix
        });

        const response = await s3.send(command);

        if (!response.Contents) {
            throw new Error(`No images found in S3 category folder: ${category}`);
        }

        const categoryImages = response.Contents
            .map(obj => obj.Key)
            .filter(key => key.match(/\.(jpg|jpeg|png)$/));

        if (categoryImages.length < 4) {
            throw new Error(`Need at least 4 category images, found ${categoryImages.length}`);
        }

        const selectedCategoryImages = categoryImages
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        // Pass the connection to retrieveProductImgPathsFromS3
        const selectedProductImages = await retrieveProductImgPathsFromS3(userId, productName, connection);

        const getS3Url = (bucket, key, region) => 
            `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

        // Construct the final image paths array
        const imagePaths = [
            generatedImageUrls[0], // Hook (generated)
            generatedImageUrls[1], // Filler1 (generated)
            generatedImageUrls[2], // Filler2 (generated)
            selectedProductImages[0], // Filler3 (Product)
            selectedProductImages[1], // Bait (Product)
            generatedImageUrls[3]  // CTA (generated)
        ];

        return imagePaths;

    } catch (error) {
        if (error.name === "CredentialsProviderError") {
            throw new Error("AWS credentials not found.");
        }
        throw new Error(`Error selecting images: ${error.message}`);
    }
}


