import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

export const uploadFileToS3 = async (Body, Key) => {
  try {
    // Initialize S3 client
    const s3Client = new S3Client({
      // For testing in local environment, please uncomment the next line
      // credentials: { accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY },
      region: process.env.AWS_REGION
    })

    const data = await s3Client.send(
      new PutObjectCommand({
        Body,
        Bucket: process.env.AWS_S3_BUCKET,
        Key
      })
    )

    return { data, success: true }
  } catch (err) {
    console.error('Error happened in uploadFileToS3:', err)
    throw err
  }
}
