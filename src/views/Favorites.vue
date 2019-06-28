<template>
  <v-container class="my-4">
      <v-layout row wrap>
        <movie-block v-for="id in movies" :key="id" :id="id" autoLoad/>
      </v-layout>
    </v-container>
</template>

<script>
import movieService from '@/services/movie.service'
import MovieBlock from '@/components/MovieBlock'

export default {
  name: 'favorite',
  data() {
    return {
      movies: [],
    }
  },
  components: {
    MovieBlock
  },
  methods: {
    loadMovies() {
      this.movies = movieService.getFavorites()
    }
  },
  mounted() {
    this.loadMovies()
  }
}
</script>
