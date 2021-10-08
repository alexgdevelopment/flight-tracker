<template>
  <div class="error-container">{{ errorMessage }}</div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        errorMessage: (state) => state.errorMessage,
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .error-container {
    border: 1px solid red;
  }
</style>