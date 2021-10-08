<template>
  <v-app dark>
    <v-main>
      <v-row style="height: 100%" align="center" justify="center" class="mb-6">
        <v-col>
          <v-container>
            <v-row justify="center">
              <ErrorContainer v-if="hasError" />
              <v-col cols="auto">
                <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  :color="mainColor"
                ></v-progress-circular>
              </v-col>
            </v-row>
            <Nuxt />
          </v-container>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        hasError: (state) => state.hasError,
        mainColor: (state) => state.mainColor,
        isLoading: (state) => state.isLoading,
      }),
    },
  }
</script>
