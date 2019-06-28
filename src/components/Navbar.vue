<template>
  <nav>
    <v-toolbar flat app dark color="indigo darken-1">
      <v-toolbar-title class="text-uppercase">
        <router-link :to="{ name: 'home' }" class="logo-title">
          Vue-Cinema
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat class="mr-3" :to="{name: 'favorites'}">Favorites</v-btn>
        <v-text-field
            hide-details
            clearable
            placeholder="Search a film"
            append-icon="search"
            single-line
            color=""
            @keyup.enter="searchMovie()"
            v-model="searchQuery"
          ></v-text-field>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    searchMovie() {
      this.$router.push({name:'search', params: {query: this.searchQuery}})
    }
  }
}
</script>

<style>
.logo-title {
  text-decoration: none;
  color: #fff
}
</style>
