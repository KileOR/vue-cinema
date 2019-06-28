import client from '@/api/'
import store from '@/store'


const lsFavorites = 'favorites'

let favorites = localStorage.getItem(lsFavorites) ? JSON.parse(localStorage.getItem(lsFavorites)) : []

const movieService = {
  genres: [],
  genreStatus: 'clean',
  getPopular(page = 1) {
    return client.get(`movie/popular?page=${page}`)
    .then(res => {
      res.data.results = res.data.results.map(m => normalizeMovie(m))
      return res.data
    }).catch(err => {
      console.log(err)
    })
  },
  getMovieById(id) {
    return client.get(`movie/${id}`)
    .then(res => {
      return normalizeMovie(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getGenresOnce() {
    if (this.genreStatus === 'clean') {
      this.getGenresList()
    }
  },
  getGenresList() {
    this.genreStatus = 'loading'
    return client.get(`/genre/movie/list`)
    .then(res => {
      this.genres = res.data.genres
      store.commit('setGenres', res.data.genres)
      this.genreStatus = 'success'
      return res.data
    }).catch(err => {
      console.log(err)
      this.genreStatus = 'error'
      throw err
    })
  },
  getGenreById(id) {
    return this.genres ? this.genres.find(g => g.id === id) : null
  },
  addToFavorite(movieId, value) {
    const index = favorites.findIndex(m => m == movieId)
    if (index !== -1 && !value) {
      favorites.splice(index, 1);
    } else if (index === -1 && value) {
      favorites.push(movieId)
    }
    localStorage.setItem(lsFavorites, JSON.stringify(favorites))

    return value
  },
  searchMovies(query, page = 1) {
    return client.get(`/search/movie`, {params: {query, page}})
    .then(res => {
      res.data.results = res.data.results.map(m => normalizeMovie(m))
      return res.data
    }).catch(err => {
      console.log(err)
      throw err
    })
  },
  getRecomandations(id) {
    return client.get(`movie/${id}/recommendations`)
    .then(res => {
      res.data.results = res.data.results.map(m => normalizeMovie(m))
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
  },
  getFavorites() {
    return favorites
  }
}

function normalizeMovie(movie) {
  movie.isFavorite = !!favorites.find(mf => mf === movie.id)
  return movie
}

export default movieService