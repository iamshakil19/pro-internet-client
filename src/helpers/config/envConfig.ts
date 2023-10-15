export const getBaseUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1"
}

export const getUploadUrl = (): string => {
    return process.env.UPLOAD_URL || "https://api.cloudinary.com/v1_1/de2t00kiz/image/upload"
}