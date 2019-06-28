<template>
  <v-flex class="mb-5">
    <template v-if="m">
      <router-link :to="{ name: 'movie-detail', params: {movieId: m.id}}" class="undecorate">
        <div class="movie-card">
        <img :src="`http://image.tmdb.org/t/p/w200/${m.poster_path}`" :alt="m.title">
        <div class="subheading">{{ m.title }}</div>
          <div class="grey--text genre-list">
            <template v-if="m.genre_ids">
              <GenreComponent v-for="(genre_id, index) in m.genre_ids" :key="index" :id="genre_id"/>
            </template>
            <template v-if="m.genres">
              <GenreComponent v-for="(genre, index) in m.genres" :key="index" :id="genre.id"/>
            </template>
        </div>
        </div>
      </router-link>
      <v-btn v-if="m.isFavorite" color="indigo" small flat icon class="white--text mt-2" @click="addToFavorite(m.id, !m.isFavorite)">
        <v-icon>favorite</v-icon> 
      </v-btn>
      <v-btn v-else color="indigo" small flat icon class="white--text mt-2" @click="addToFavorite(m.id, !m.isFavorite)">
        <v-icon>favorite_border</v-icon> 
      </v-btn>
    </template>
  </v-flex>
</template>

<script>
import movieService from '@/services/movie.service'
import GenreComponent from '@/components/GenreComponent'

export default {
  props: {
    id: [String, Number],
    movie: Object,
    autoLoad: Boolean
  },
  data() {
    return {
      m: this.autoLoad ? null : this.movie
    }
  },
  components: {
    GenreComponent
  },
  methods: {
    loadMovie() { 
      movieService.getMovieById(this.id)
      .then(movie => {
        this.m = movie
        console.log(this.m.genres)
      })
    },
    getGenreName(id) {
      const genre = movieService.getGenreById(id)
      return genre ? genre.name : null
    },
    addToFavorite(id, value) {
      movieService.addToFavorite(id, value)
      this.m.isFavorite = value
    }
  },
  mounted() {
    if (this.autoLoad) {
      this.loadMovie()
    }

    movieService.getGenresOnce()
  }
}
</script>

<style>
.movie-card {
  width: 200px;
}

.genre-list {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
