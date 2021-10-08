<template>
  <v-row justify="center">
    <v-col cols="9">
      <SearchTypeSelector />

      <FlightSearchInterface v-if="searchType === searchTypeVar.FLIGHT" />
      <AirportSearchInterface v-if="searchType === searchTypeVar.AIRPORT" />
    </v-col>
  </v-row>
</template>

<script>
  import { mapState } from 'vuex'
  import searchTypeMixin from '@/assets/mixins/searchTypeMixin.js'
  export default {
    mixins: [searchTypeMixin],
    computed: {
      ...mapState({
        searchType: (state) => state.searchType,
      }),
    },
  }
</script>