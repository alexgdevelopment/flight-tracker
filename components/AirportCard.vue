<template>
  <v-card elevation="5">
    <v-list-item
      ><v-list-item-content
        ><v-list-item-title>{{ airport.fullName }}</v-list-item-title
        ><v-list-item-subtitle
          >Airport name</v-list-item-subtitle
        ></v-list-item-content
      ></v-list-item
    >
    <v-list-item
      ><v-list-item-content
        ><v-list-item-title>{{ airport.country.name }}</v-list-item-title
        ><v-list-item-subtitle
          >Country</v-list-item-subtitle
        ></v-list-item-content
      ></v-list-item
    >
  </v-card>
</template>

<script>
  export default {
    name: 'AirportCard',
    props: {
      airport: {
        type: Object,
        required: true,
      },
    },
  }
</script>