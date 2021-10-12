<template>
  <div>
    <v-text-field
      v-model="searchValue"
      clearable
      label="Airport name"
      autofocus
      class="px-4"
      data-testid="searchField"
      :counter="10"
      :rules="searchFieldRules"
    ></v-text-field>
    <v-row v-if="showSearchButton" class="mt-3" justify="center">
      <v-col cols="auto">
        <v-btn @click="buttonClick">Go</v-btn>
      </v-col>
    </v-row>
    <AirportDetail v-if="currentAirport" />
    <v-col v-else-if="noResultsInSearch">
      <p>No results.</p>
    </v-col>
    <v-col
      v-else-if="airports"
      class="results-container"
      data-testid="airportsContainer"
    >
      <AirportCard
        v-for="airport in airports"
        :key="airport.fullName"
        class="mb-3"
        :airport="airport"
        @click.native="airportClicked(airport)"
      />
    </v-col>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        searchFieldRules: [
          (v) => v === null || v.length > 2 || 'Min 3 characters',
          (v) => v === null || v.length <= 10 || 'Max 10 characters',
        ],
      }
    },
    computed: {
      ...mapState({
        mainColor: (state) => state.mainColor,
        airports: (state) => state.airports.airports,
        currentAirport: (state) => state.airports.currentAirport,
      }),
      noResultsInSearch() {
        return this.airports?.length === 0
      },
      searchValue: {
        get() {
          return this.$store.state.searchStringParam
        },
        set(value) {
          this.$store.commit('setSearchStringParam', { searchStringParam: value })
        },
      },
      showSearchButton() {
        return this.searchValue !== '' && this.searchValue !== null
      },
    },
    methods: {
      buttonClick() {
        this.$store.dispatch('search')
      },
      airportClicked(airport) {
        this.$store.commit('airports/setCurrentAirport', { airport })
      },
    },
  }
</script>