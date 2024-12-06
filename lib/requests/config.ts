export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://dev.bandyresultat.se'

export const mobileBaseUrl = 'http://192.168.38.191:3001'

export const header = { Authorization: true }
