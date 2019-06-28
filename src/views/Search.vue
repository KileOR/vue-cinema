<template>
  <div class="search" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <v-container class="my-4">
      <v-layout row wrap>
        <movie-block v-for="movie in movies" :key="movie.id" :movie="movie" />
      </v-layout>
      <template v-if="responseStatus === 'loading'">
        <h1>Loading</h1>
      </template>
    </v-container>
  </div>
</template>

<script>
import movieService from '@/services/movie.service'
import MovieBlock from '@/components/MovieBlock'


export default {
  props: {
    query: String,
  },
  data() {
    return {
      movies: [],
      responseStatus: 'clean',
      activePage: 1,
      busy: false,
      isChangedPage: false
    }
  },
  components: {
    MovieBlock
  },
  methods: {
    loadSearchedMovies(page = this.activePage, isChangedPage = this.isChangedPage) {
      this.responseStatus = 'loading'
      this.busy = true
      movieService.searchMovies(this.query, page)
      .then(({results, page}) => {
        if (isChangedPage) {
          this.movies = this.movies.concat(results)
        } else {
          this.movies = results
        }
        this.activePage = page
        this.busy = false
        this.responseStatus = 'success'
      })
      .catch(err => {
          console.log(err)
          this.busy = true
          this.responseStatus = 'error'
        })
    },
    changePage() {
      this.activePage += 1
      this.isChangedPage = true
      this.loadSearchedMovies(this.activePage, this.isChangedPage)
      },
    loadMore() {
      this.changePage()
    }
  },
  watch: {
    query(to, from) {
      if (to !== from) {
        this.isChangedPage = false
        this.activePage = 1
        this.loadSearchedMovies(this.activePage, this.isChangedPage);
      }
    }
  },
  mounted() {
    this.loadSearchedMovies()
  }
}
</script>
