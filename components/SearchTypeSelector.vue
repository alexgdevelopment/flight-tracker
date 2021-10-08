<template>
  <v-radio-group v-model="searchType" row>
    <v-spacer />
    <v-radio color="orange" :value="searchTypeVar.AIRPORT">
      <template #label>
        <div class="orange--text">Airports</div>
      </template>
    </v-radio>
    <v-spacer />
    <v-radio color="blue" :value="searchTypeVar.FLIGHT">
      <template #label>
        <div class="blue--text">Flights</div>
      </template>
    </v-radio>
    <v-spacer />
  </v-radio-group>
</template>
<script>
  import searchTypeMixin from '@/assets/mixins/searchTypeMixin.js'
  export default {
    mixins: [searchTypeMixin],
    computed: {
      searchType: {
        get() {
          return this.$store.state.searchType
        },
        set(value) {
          this.$store.dispatch('changeSearchType', { searchType: value })
        },
      },
    },
  }
</script>