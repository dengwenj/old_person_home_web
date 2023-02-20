const devBaseURL: string = 'http://localhost:2023'
const proBaseURL: string = 'http://139.192.212.216:2023'

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 10000
