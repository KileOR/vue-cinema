<template>
  <span class="genre mr-2">{{ getGenreName }}</span>
</template>

<script>

export default {
  props: {
    id: [String, Number]
  },
  computed: {
    genre() {
     return this.$store.state.genres.find(g => g.id === this.id)
    },
    getGenreName() {
      return this.genre ? this.genre.name : null
    }

  }
}
</script>

