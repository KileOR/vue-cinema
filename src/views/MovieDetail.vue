<template>
  <div class="movie-details">
    <template v-if="responseStatus === 'loading'">
      <h1>Loading</h1>
    </template>
    <v-container class="mt-3">
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 offset-sm3 offset-md0>
         <img :src="`http://image.tmdb.org/t/p/w400/${details.poster_path}`" alt="Poster">
        </v-flex>
        <v-flex xs12 sm6 md6 offset-sm3 offset-md0>
          <h1>{{ details.original_title }}</h1>
          <div class="grey--text">
            <span v-for="(genre, index) in details.genres" :key="index" class="mr-3">{{ genre.name }}</span>
          </div>
          <ul class="info-list mt-3">
            <li class="mt-1">Budget: {{ normalizeBudget }}</li>
            <li class="mt-1">Runtime: {{ details.runtime }} min</li>
            <li class="mt-1">Popularity: {{ details.popularity }}m</li>
          </ul>
          <div class="mt-3 movie-overview">
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
import numeral from 'numeral'

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
  computed: {
    normalizeBudget() {
      return numeral(this.details.budget).format('0.0a')
    }
  },
  methods: {
    loadDetailes() {
      this.responseStatus = 'loading'
      movieService.getMovieById(this.movieId)
      .then(res => {
        this.details = res
        console.log(res)
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
.info-list {
  list-style-type: none;
  padding: 0;
}
</style>
