import axios from 'axios'

const baseUrl = 'https://newsapi.org/v2'
const apiKey = import.meta.env.VITE_NEWS_API_KEY

// Function to fetch top headlines
export const getTopHeadlines = async (country, category) => {
  try {
    const response = await axios.get(`${baseUrl}/top-headlines`, {
      params: {
        country,
        category,
        apiKey
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching headlines:', error)
    throw error
  }
}

// Add new function for search
export const searchNews = async (query) => {
  try {
    const response = await axios.get(`${baseUrl}/everything`, {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        apiKey
      }
    })
    return response.data
  } catch (error) {
    console.error('Error searching news:', error)
    throw error
  }
}
