require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const router = express.Router();
app.use(cors())

const API_TOKEN = process.env.TMDB_API_KEY
const API_URL = 'https://api.themoviedb.org'
const DEFAULT_LANGUAGE = 'es-ES'
const DEFAULT_REGION = 'ES'

router.get('/get-api-configuration', async (req, res) => {
  const url = new URL(`${API_URL}/3/configuration`)
  url.searchParams.append('append_to_response', 'countries,jobs,languages,timezones')

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-movie-genres', async (req, res) => {
  const url = new URL(`${API_URL}/3/genre/movie/list`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-tv-genres', async (req, res) => {
  const url = new URL(`${API_URL}/3/genre/tv/list`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-tv-providers', async (req, res) => {
  const url = new URL(`${API_URL}/3/watch/providers/tv`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('watch_region', req.query.watch_region || DEFAULT_REGION)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-movie-providers', async (req, res) => {
  const url = new URL(`${API_URL}/3/watch/providers/movie`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('watch_region', req.query.watch_region || DEFAULT_REGION)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-movie-details', async (req, res) => {
  const url = new URL(`${API_URL}/3/movie/${req.query.id}`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('include_image_language', 'null')
  url.searchParams.append('append_to_response', 'images,videos,keywords,lists,recommendations,reviews,watch/providers,release_dates,external_ids,credits')

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-collection-details', async (req, res) => {
  const url = new URL(`${API_URL}/3/collection/${req.query.id}`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('include_image_language', 'null')
  url.searchParams.append('append_to_response', 'images')

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-person-details', async (req, res) => {
  const url = new URL(`${API_URL}/3/person/${req.query.id}`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('append_to_response', 'combined_credits,external_ids,images')

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-tv-details', async (req, res) => {
  const url = new URL(`${API_URL}/3/tv/${req.query.id}`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('append_to_response', 'aggregate_credits,content_ratings,external_ids,images,keywords,lists,recommendations,reviews,videos,watch/providers')
  url.searchParams.append('include_image_language', 'null')

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-list-details', async (req, res) => {
  const url = new URL(`${API_URL}/4/list/${req.query.id}`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('page', req.query.page || 1)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/search-movies', async (req, res) => {
  const url = new URL(`${API_URL}/3/search/movie`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('include_adult', req.query.include_adult || false)
  url.searchParams.append('query', req.query.query || '')
  url.searchParams.append('page', req.query.page || 1)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/search-tvs', async (req, res) => {
  const url = new URL(`${API_URL}/3/search/tv`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('include_adult', req.query.include_adult || false)
  url.searchParams.append('query', req.query.query || '')
  url.searchParams.append('page', req.query.page || 1)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/search-people', async (req, res) => {
  const url = new URL(`${API_URL}/3/search/person`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('include_adult', req.query.include_adult || false)
  url.searchParams.append('query', req.query.query || '')
  url.searchParams.append('page', req.query.page || 1)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-tv-season-details', async (req, res) => {
  const url = new URL(`${API_URL}/3/tv/${req.query.tv}/season/${req.query.season}`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('include_image_language', 'en,null')
  url.searchParams.append('include_video_language', 'en,null')
  url.searchParams.append('append_to_response', 'account_states,aggregate_credits,images,videos')

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/search-keywords', async (req, res) => {
  const url = new URL(`${API_URL}/3/search/keyword`)
  url.searchParams.append('query', req.query.query || '')
  url.searchParams.append('page', req.query.page || 1)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/discover-movies', async (req, res) => {
  const url = new URL(`${API_URL}/3/discover/movie`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('watch_region', req.query.watch_region || DEFAULT_REGION)
  url.searchParams.append('include_video', req.query.include_video || true)
  url.searchParams.append('page', req.query.page || 1)
  url.searchParams.append('include_adult', req.query.include_adult || false)
  url.searchParams.append('sort_by', `${req.query.sort_by || 'popularity'}.${req.query.sort_direction || 'desc'}`)
  url.searchParams.append('with_watch_monetization_types', req.query.watch_types || '')
  url.searchParams.append('vote_count.gte', req.query.vote_count || '')
  url.searchParams.append('vote_average.gte', req.query.vote_min || '')
  url.searchParams.append('vote_average.lte', req.query.vote_max || '')
  url.searchParams.append('with_runtime.gte', req.query.duration_min || '')
  url.searchParams.append('with_runtime.lte', req.query.duration_max || '')
  url.searchParams.append('release_date.gte', req.query.from_date || '')
  url.searchParams.append('release_date.lte', req.query.to_date || '')
  url.searchParams.append('with_genres', req.query.genres || '')
  url.searchParams.append('with_keywords', req.query.keywords 
    ? req.query.keywords.split('|').map(kw => kw.split('%')[0]).join('|') 
    : '')
  url.searchParams.append('with_watch_providers', req.query.watch_providers || '')
  
  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/discover-tvs', async (req, res) => {  
  const url = new URL(`${API_URL}/3/discover/tv`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('watch_region', req.query.watch_region || DEFAULT_REGION)
  url.searchParams.append('page', req.query.page || 1)
  url.searchParams.append('include_adult', req.query.include_adult || false)
  url.searchParams.append('sort_by', `${req.query.sort_by || 'popularity'}.${req.query.sort_direction || 'desc'}`)
  url.searchParams.append('with_watch_monetization_types', req.query.watch_types || '')
  url.searchParams.append('vote_count.gte', req.query.vote_count || '')
  url.searchParams.append('vote_average.gte', req.query.vote_min || '')
  url.searchParams.append('vote_average.lte', req.query.vote_max || '')
  url.searchParams.append('with_runtime.gte', req.query.duration_min || '')
  url.searchParams.append('with_runtime.lte', req.query.duration_max || '')
  url.searchParams.append('first_air_date.gte', req.query.from_date || '')
  url.searchParams.append('first_air_date.lte', req.query.to_date || '')
  url.searchParams.append('with_genres', req.query.genres || '')
  url.searchParams.append('with_keywords', req.query.keywords 
    ? req.query.keywords.split('|').map(kw => kw.split('%')[0]).join('|') 
    : '')
  url.searchParams.append('with_watch_providers', req.query.watch_providers || '')
  
  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-now-playing-movies', async (req, res) => {
  const url = new URL(`${API_URL}/3/movie/now_playing`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('region', req.query.region || DEFAULT_REGION)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-trending-all', async (req, res) => {
  const url = new URL(`${API_URL}/3/trending/all/${req.query.time_window || 'day'}`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('page', req.query.page || 1)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-popular-movies', async (req, res) => {
  const url = new URL(`${API_URL}/3/movie/popular`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('region', req.query.region || DEFAULT_REGION)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-popular-tvs', async (req, res) => {
  const url = new URL(`${API_URL}/3/tv/popular`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('page', req.query.page || 1)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get('/get-popular-people', async (req, res) => {
  const url = new URL(`${API_URL}/3/person/popular`)
  url.searchParams.append('language', req.query.language || DEFAULT_LANGUAGE)
  url.searchParams.append('page', req.query.page || 1)

  try {
    const response = await axios.get(url.href, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      }
    })
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