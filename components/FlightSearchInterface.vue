<template>
  <div>
    <v-text-field
      v-model="searchValue"
      clearable
      label="Flight number"
      autofocus
      class="px-4"
      :counter="10"
      :rules="searchFieldRules"
      @click:clear="onClear"
    ></v-text-field>
    <v-menu
      v-model="datePicker"
      :close-on-content-click="true"
      transition="scroll-y-transition"
      :nudge-right="30"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-show="showDatePicker"
          v-model="searchDate"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="searchDate"
        :color="mainColor"
        show-adjacent-months
        @input="datePicker = false"
      >
      </v-date-picker>
    </v-menu>
    <v-row v-if="showSearchButton" class="mt-3" justify="center">
      <v-col cols="auto">
        <v-btn @click="buttonClick">Go</v-btn>
      </v-col>
    </v-row>
    <v-col v-if="noResultsInSearch">
      <p>No results.</p>
    </v-col>
    <v-col
      v-else-if="flights"
      class="results-container"
      data-testid="flightsContainer"
    >
      <FlightCard
        v-for="flight in flights"
        :key="flight.number"
        :flight="flight"
      />
    </v-col>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        datePicker: false,
        searchFieldRules: [
          (v) => v === null || v.length > 1 || 'Min 2 characters',
          (v) => v === null || v.length <= 10 || 'Max 10 characters',
        ],
      }
    },
    computed: {
      ...mapState({
        mainColor: (state) => state.mainColor,
        flights: (state) => state.flights.flights,
      }),
      noResultsInSearch() {
        return this.flights?.length === 0
      },
      searchValue: {
        get() {
          return this.$store.state.searchStringParam
        },
        set(value) {
          this.$store.commit('setSearchStringParam', { searchStringParam: value })
        },
      },
      searchDate: {
        get() {
          return this.$store.state.searchDate
        },
        set(value) {
          this.$store.commit('setSearchDate', { searchDate: value })
        },
      },

      showDatePicker() {
        return this.searchValue !== '' && this.searchValue !== null
      },

      showSearchButton() {
        return (
          this.searchValue !== '' && this.searchValue !== null && this.searchDate
        )
      },
    },

    methods: {
      buttonClick() {
        this.$store.dispatch('search')
      },
      onClear() {
        this.$store.dispatch('clearSearch')
      },
    },
  }
</script>