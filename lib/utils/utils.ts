type HostName =
  | 'localhost'
  | 'dev.bandyresultat.se'
  | 'bandyresultat.se'

export const getBaseUrl = () => {
  const apiBaseUrl =
    process.env.NODE_ENV === 'production'
      ? (process.env.EXPO_PUBLIC_API_PROD_URL as string)
      : (process.env
          .EXPO_PUBLIC_API_LOCALHOST_URL as string)

  return { apiBaseUrl }
}
