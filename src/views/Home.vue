<template>
  <div class="home" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <v-container class="my-4">
      <h1>Popular movies</h1>

      <v-layout row wrap class="mt-3">
        <movie-block v-for="movie in movies" :key="movie.id" :movie="movie"/>
      </v-layout>
    </v-container>
    <template v-if="responseStatus === 'loading'">
      <h1>Loading</h1>
    </template>
  </div>
</template>

<script>
import movieService from '@/services/movie.service'
import MovieBlock from '@/components/MovieBlock'

  export default {
    data() {
      return {
        activePage: 1,
        totalPages: 0,
        movies: [],
        responseStatus: 'clean',
        busy: false
      }
    },
    components: {
      MovieBlock
    },
    methods: {
      loadMovies(page = this.activePage) {
        this.responseStatus = 'loading'
        this.busy = true
        movieService.getPopular(page)
        .then(({results, page, total_pages}) => {
          this.movies = this.movies.concat(results)
          this.activePage = page
          this.totalPages = total_pages
          this.responseStatus = 'success'
          this.busy = false
        })
        .catch(err => {
          console.log(err)
          this.responseStatus = 'error'
          this.busy = true
        })
      },
      changePage() {
        this.activePage += 1
        this.loadMovies(this.activePage)
      },
      showDetails(id) {
        this.$router.push({name:'movie-detail', params: {movieId: id}})
      },
      loadMore() {
        this.changePage()
      }
    },
    mounted() {
      this.loadMovies()
    }
  }
</script>

<style>
</style>
