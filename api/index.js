require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const router = express.Router();
app.use(cors())

const API_TOKEN = process.env.TMDB_API_KEY
const API_URL = 'https://api.themoviedb.org'
const DEFAULT_LANGUAGE = 'en-US'
const DEFAULT_REGION = 'US'
const DEFAULT_INCLUDE_ADULT = false
const ADULT_ERROR_MESSAGE = { error: 'Access denied. This content is marked as adult content and is not available with your current settings.' }
const PRIVATE_ERROR_MESSAGE = { error: 'Access denied. This content is private and is not available with your current permissions.' }

const correctLanguage = (URL) => {
  URL.searchParams.append('language', DEFAULT_LANGUAGE)
}
const correctRegion = (URL) => {
  URL.searchParams.append('region', DEFAULT_REGION)
  URL.searchParams.append('watch_region', DEFAULT_REGION)
}
const validIncludeAdult = (includeAdult) => (
  includeAdult 
    ? includeAdult === "true"
    : DEFAULT_INCLUDE_ADULT
)
const adultContentCleaner = (data) => (
  data
    .filter(item => !item.adult)
)
const getFetch = async (url) => (
  await axios.get(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + API_TOKEN
    }
  })
)

// GENERAL
router.get('/get-api-configuration', async (req, res) => {
  const url = new URL(`${API_URL}/3/configuration`)
  url.searchParams.append('append_to_response', 'countries,jobs,languages,timezones,primary_translations')

  try {
    const response = await getFetch(url.href)

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-movie-genres', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE

  const url = new URL(`${API_URL}/3/genre/movie/list`)
  url.searchParams.append('language', language)
  
  try {
    let response = await getFetch(url.href)

    if (response?.data?.genres.some(genre => genre.name === null) && language !== DEFAULT_LANGUAGE) {
      correctLanguage(url)
      response = await getFetch(url.href)
    }
    
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-tv-genres', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE

  const url = new URL(`${API_URL}/3/genre/tv/list`)
  url.searchParams.append('language', language)

  try {
    let response = await getFetch(url.href)

    if (response?.data?.genres.some(genre => genre.name === null) && language !== DEFAULT_LANGUAGE) {
      correctLanguage(url)
      response = await getFetch(url.href)
    }
    
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// HOME
router.get('/get-now-playing-movies', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const region = req.query.region || DEFAULT_REGION
  const includeAdult = validIncludeAdult(req.query.includeAdult)

  const url = new URL(`${API_URL}/3/movie/now_playing`)
  url.searchParams.append('language', language)
  url.searchParams.append('region', region)

  try {
    const response = await getFetch(url.href)
    const results = response?.data?.results
    
    if(!includeAdult && results) {
      const cleanResults = adultContentCleaner(results)
      response.data.results = cleanResults
    }

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error?.message })
  }
})
router.get('/get-trending-all', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const page = req.query.page || 1
  const timeWindow = req.query.time_window || 'day'
  const includeAdult = validIncludeAdult(req.query.includeAdult)

  const url = new URL(`${API_URL}/3/trending/all/${timeWindow}`)
  url.searchParams.append('language', language)
  url.searchParams.append('page', page)

  try {
    const response = await getFetch(url.href)
    const results = response?.data?.results
    
    if(!includeAdult && results) {
      const cleanResults = adultContentCleaner(results)
      response.data.results = cleanResults
    }

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-popular-movies', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const region = req.query.region || DEFAULT_REGION
  const page = req.query.page || 1
  const includeAdult = validIncludeAdult(req.query.includeAdult)

  const url = new URL(`${API_URL}/3/movie/popular`)
  url.searchParams.append('language', language)
  url.searchParams.append('region', region)
  url.searchParams.append('page', page)

  try {
    const response = await getFetch(url.href)
    const results = response?.data?.results
    
    if(!includeAdult && results) {
      const cleanResults = adultContentCleaner(results)
      response.data.results = cleanResults
    }

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-popular-tvs', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const page = req.query.page || 1
  const includeAdult = validIncludeAdult(req.query.includeAdult)
  
  const url = new URL(`${API_URL}/3/tv/popular`)
  url.searchParams.append('language', language)
  url.searchParams.append('page', page)

  try {
    const response = await getFetch(url.href)
    const results = response?.data?.results
    
    if(!includeAdult && results) {
      const cleanResults = adultContentCleaner(results)
      response.data.results = cleanResults
    }

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-popular-people', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const page = req.query.page || 1
  const includeAdult = validIncludeAdult(req.query.includeAdult)

  const url = new URL(`${API_URL}/3/person/popular`)
  url.searchParams.append('language', language)
  url.searchParams.append('page', page)

  try {
    const response = await getFetch(url.href)
    const results = response?.data?.results
    
    if(!includeAdult && results) {
      const cleanResults = adultContentCleaner(results)
      response.data.results = cleanResults
    }

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DISCOVER
router.get('/discover-movies', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const watchRegion = req.query.region || DEFAULT_REGION
  const includeAdult = validIncludeAdult(req.query.includeAdult)
  const includeVideo = req.query.includeVideo || true
  const page = req.query.page || 1
  const sortBy = `${req.query.sortBy || 'popularity'}.${req.query.sortDirection || 'desc'}`
  const watchTypes = req.query.watchTypes || ''
  const voteCount = req.query.voteCount || ''
  const voteMin = req.query.voteMin || ''
  const voteMax = req.query.voteMax || ''
  const durationMin = req.query.durationMin || ''
  const durationMax = req.query.durationMax || ''
  const fromDate = req.query.fromDate || ''
  const toDate = req.query.toDate || ''
  const genres = req.query.genres || ''
  const keywords = req.query.keywords 
    ? req.query.keywords.split('|').map(kw => kw.split('%')[0]).join('|') 
    : ''
  const watchProviders = req.query.watchProviders || ''
  
  const url = new URL(`${API_URL}/3/discover/movie`)
  url.searchParams.append('language', language)
  url.searchParams.append('watch_region', watchRegion)
  url.searchParams.append('include_video', includeVideo)
  url.searchParams.append('page', page)
  url.searchParams.append('include_adult', includeAdult)
  url.searchParams.append('sort_by', sortBy)
  url.searchParams.append('with_watch_monetization_types', watchTypes)
  url.searchParams.append('vote_count.gte', voteCount)
  url.searchParams.append('vote_average.gte', voteMin)
  url.searchParams.append('vote_average.lte', voteMax)
  url.searchParams.append('with_runtime.gte', durationMin)
  url.searchParams.append('with_runtime.lte', durationMax)
  url.searchParams.append('release_date.gte', fromDate)
  url.searchParams.append('release_date.lte', toDate)
  url.searchParams.append('with_genres', genres)
  url.searchParams.append('with_keywords', keywords)
  url.searchParams.append('with_watch_providers', watchProviders)
  
  try {
    const response = await getFetch(url.href)

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/discover-tvs', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const watchRegion = req.query.region || DEFAULT_REGION
  const includeAdult = validIncludeAdult(req.query.includeAdult)
  const page = req.query.page || 1
  const sortBy = `${req.query.sortBy || 'popularity'}.${req.query.sortDirection || 'desc'}`
  const watchTypes = req.query.watchTypes || ''
  const voteCount = req.query.voteCount || ''
  const voteMin = req.query.voteMin || ''
  const voteMax = req.query.voteMax || ''
  const durationMin = req.query.durationMin || ''
  const durationMax = req.query.durationMax || ''
  const fromDate = req.query.fromDate || ''
  const toDate = req.query.toDate || ''
  const genres = req.query.genres || ''
  const keywords = req.query.keywords 
    ? req.query.keywords.split('|').map(kw => kw.split('%')[0]).join('|') 
    : ''
  const watchProviders = req.query.watchProviders || ''
  
  const url = new URL(`${API_URL}/3/discover/tv`)
  url.searchParams.append('language', language)
  url.searchParams.append('watch_region', watchRegion)
  url.searchParams.append('page', page)
  url.searchParams.append('include_adult', includeAdult)
  url.searchParams.append('sort_by', sortBy)
  url.searchParams.append('with_watch_monetization_types', watchTypes)
  url.searchParams.append('vote_count.gte', voteCount)
  url.searchParams.append('vote_average.gte', voteMin)
  url.searchParams.append('vote_average.lte', voteMax)
  url.searchParams.append('with_runtime.gte', durationMin)
  url.searchParams.append('with_runtime.lte', durationMax)
  url.searchParams.append('first_air_date.gte', fromDate)
  url.searchParams.append('first_air_date.lte', toDate)
  url.searchParams.append('with_genres', genres)
  url.searchParams.append('with_keywords', keywords)
  url.searchParams.append('with_watch_providers', watchProviders)
  
  try {
    const response = await getFetch(url.href)

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-movie-providers', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const watchRegion = req.query.region || DEFAULT_REGION

  const url = new URL(`${API_URL}/3/watch/providers/movie`)
  url.searchParams.append('language', language)
  url.searchParams.append('watch_region', watchRegion)

  try {
    const response = await getFetch(url.href)

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-tv-providers', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const watchRegion = req.query.region || DEFAULT_REGION
  
  const url = new URL(`${API_URL}/3/watch/providers/tv`)
  url.searchParams.append('language', language)
  url.searchParams.append('watch_region', watchRegion)
  
  try {
    const response = await getFetch(url.href)
    
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/search-keywords', async (req, res) => {
  const query = req.query.query || ''
  const page = req.query.page || 1
  
  const url = new URL(`${API_URL}/3/search/keyword`)
  url.searchParams.append('query', query)
  url.searchParams.append('page', page)

  try {
    const response = await getFetch(url.href)

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DETAILS
router.get('/get-movie-details', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const includeAdult = validIncludeAdult(req.query.includeAdult)
  const id = req.query.id

  const url = new URL(`${API_URL}/3/movie/${id}`)
  url.searchParams.append('language', language)
  url.searchParams.append('include_image_language', 'null')
  url.searchParams.append('append_to_response', 'images,videos,keywords,lists,recommendations,reviews,watch/providers,release_dates,external_ids,credits')

  try {
    const response = await getFetch(url.href)
    const adultContent = response?.data?.adult

    if (!includeAdult && adultContent) {
      res.status(403).json(ADULT_ERROR_MESSAGE)
      return
    }
    
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-tv-details', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const id = req.query.id
  const includeAdult = validIncludeAdult(req.query.includeAdult)

  const url = new URL(`${API_URL}/3/tv/${id}`)
  url.searchParams.append('language', language)
  url.searchParams.append('append_to_response', 'aggregate_credits,content_ratings,external_ids,images,keywords,lists,recommendations,reviews,videos,watch/providers')
  url.searchParams.append('include_image_language', 'null')

  try {
    const response = await getFetch(url.href)
    const adultContent = response?.data?.adult

    if (!includeAdult && adultContent) {
      res.status(403).json(ADULT_ERROR_MESSAGE)
      return
    }

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-tv-season-details', async (req, res) => {
  const tvId = req.query.tv
  const seasonId = req.query.season
  const language = req.query.language || DEFAULT_LANGUAGE

  const url = new URL(`${API_URL}/3/tv/${tvId}/season/${seasonId}`)
  url.searchParams.append('language', language)
  url.searchParams.append('include_image_language', 'en,null')
  url.searchParams.append('include_video_language', 'en,null')
  url.searchParams.append('append_to_response', 'account_states,aggregate_credits,images,videos')

  try {
    const response = await getFetch(url.href)

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-person-details', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const id = req.query.id
  const includeAdult = validIncludeAdult(req.query.includeAdult)

  const url = new URL(`${API_URL}/3/person/${id}`)
  url.searchParams.append('language', language)
  url.searchParams.append('append_to_response', 'combined_credits,external_ids,images')

  try {
    const response = await getFetch(url.href)
    const combinedCredits = response?.data?.combined_credits

    if (!includeAdult) {
      combinedCredits.cast = adultContentCleaner(combinedCredits?.cast)
      combinedCredits.crew = adultContentCleaner(combinedCredits?.crew)
    }

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-collection-details', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const id = req.query.id
  const includeAdult = validIncludeAdult(req.query.includeAdult)

  const url = new URL(`${API_URL}/3/collection/${id}`)
  url.searchParams.append('language', language)
  url.searchParams.append('include_image_language', 'null')
  url.searchParams.append('append_to_response', 'images')

  try {
    const response = await getFetch(url.href)
    const parts = response?.data?.parts
    const allPartsAreAdult = parts?.every(p => p.adult)
    
    if (allPartsAreAdult && !includeAdult) {
      res.status(403).json(ADULT_ERROR_MESSAGE)
      return
    }
    
    if (!includeAdult && parts) {
      const cleanResults = adultContentCleaner(parts)
      response.data.parts = cleanResults
    }

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-list-details', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const id = req.query.id
  const page = req.query.page || 1
  const includeAdult = validIncludeAdult(req.query.includeAdult)

  const url = new URL(`${API_URL}/4/list/${id}`)
  url.searchParams.append('language', language)
  url.searchParams.append('page', page)

  try {
    const response = await getFetch(url.href)
    const isPublic = response?.data?.public
    const results = response?.data?.results

    if (!isPublic) {
      res.status(403).json(PRIVATE_ERROR_MESSAGE)
      return
    }

    if (!includeAdult && results) {
      response.data.results = adultContentCleaner(results)
    }

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// SEARCH
router.get('/search-movies', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const includeAdult = validIncludeAdult(req.query.includeAdult)
  const page = req.query.page || 1
  const query = req.query.query || ''
  
  const url = new URL(`${API_URL}/3/search/movie`)
  url.searchParams.append('language', language)
  url.searchParams.append('include_adult', includeAdult)
  url.searchParams.append('query', query)
  url.searchParams.append('page', page)

  try {
    const response = await getFetch(url.href)

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/search-tvs', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const includeAdult = validIncludeAdult(req.query.includeAdult)
  const page = req.query.page || 1
  const query = req.query.query || ''

  const url = new URL(`${API_URL}/3/search/tv`)
  url.searchParams.append('language', language)
  url.searchParams.append('include_adult', includeAdult)
  url.searchParams.append('query', query)
  url.searchParams.append('page', page)

  try {
    const response = await getFetch(url.href)

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/search-people', async (req, res) => {
  const language = req.query.language || DEFAULT_LANGUAGE
  const includeAdult = validIncludeAdult(req.query.includeAdult)
  const page = req.query.page || 1
  const query = req.query.query || ''

  const url = new URL(`${API_URL}/3/search/person`)
  url.searchParams.append('language', language)
  url.searchParams.append('include_adult', includeAdult)
  url.searchParams.append('query', query)
  url.searchParams.append('page', page)

  try {
    const response = await getFetch(url.href)

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.use(router)
app.use((req, res, next) => {
  res.status(403).json({error: 'Request blocked: endpoint not allowed.'});
});

app.listen(3000, () => console.log("Server ready on port 3000."))

module.exports = app