<template>
  <div class="movie-details">
    <template v-if="responseStatus === 'loading'">
      <h1>Loading</h1>
    </template>
    <v-container class="mt-3">
      <v-layout row wrap>
        <v-flex xs12 sm12 md6>
         <img :src="`http://image.tmdb.org/t/p/w400/${details.poster_path}`" alt="Poster">
        </v-flex>
        <v-flex xs12 sm6 md6>
          <h1>{{ details.original_title }}</h1>
          <div class="grey--text">
            <span v-for="(genre, index) in details.genres" :key="index" class="mr-3">{{ genre.name }}</span>
          </div>
          <div class="mt-5">
            <h2>Overview</h2>
            <p>{{ details.overview }}</p>
          </div>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="mt-5">
        <v-flex sm12 xs12>
          <h2 class="mb-3">Recommendations</h2>
        </v-flex>
        <movie-block v-for="movie in recomendations" :key="movie.id" :movie="movie" />
      </v-layout>
    </v-container>
    
  </div>
</template>

<script>
import movieService from '@/services/movie.service'
import MovieBlock from '@/components/MovieBlock'

export default {
  name: 'movie-detail',
  data() {
    return {
      movieId: this.$route.params.movieId,
      details: {},
      responseStatus: 'clean',
      recomendations: [],
      genres: []
    }
  },
  components: {
    MovieBlock
  },
  methods: {
    loadDetailes() {
      this.responseStatus = 'loading'
      movieService.getMovieById(this.movieId)
      .then(res => {
        this.details = res
        this.responseStatus = 'sucess'
        this.loadRecomendations()
        console.log(this.details)
      })
      .catch(err => {
          console.log(err)
          this.responseStatus = 'error'
        })
    },
    loadRecomendations() {
      movieService.getRecomandations(this.movieId)
      .then(res => {
        this.recomendations = res.results
      })
    },
  },
  mounted() {
    this.loadDetailes()
  }
}
</script>

<style>
</style>
