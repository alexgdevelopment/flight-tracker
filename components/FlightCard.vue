<template>
  <v-card elevation="5" class="mt-6">
    <v-list-item
      ><v-list-item-content
        ><v-list-item-title>{{ flight.number }}</v-list-item-title
        ><v-list-item-subtitle
          >Flight code</v-list-item-subtitle
        ></v-list-item-content
      ></v-list-item
    >
    <v-list-item v-if="hasDepartureData"
      ><v-list-item-content
        ><v-list-item-title>{{
          flight.departure.airport.name
        }}</v-list-item-title
        ><v-list-item-subtitle>From</v-list-item-subtitle></v-list-item-content
      ></v-list-item
    >
    <v-list-item v-if="hasArrivalData"
      ><v-list-item-content
        ><v-list-item-title>{{ flight.arrival.airport.name }}</v-list-item-title
        ><v-list-item-subtitle>To</v-list-item-subtitle></v-list-item-content
      ></v-list-item
    >
    <v-list-item v-if="hasDepartureData"
      ><v-list-item-content
        ><v-list-item-title>{{ departureLocal }}</v-list-item-title
        ><v-list-item-subtitle
          >Scheduled Departure (Local Time)</v-list-item-subtitle
        ></v-list-item-content
      ></v-list-item
    >
    <v-list-item v-if="hasArrivalData"
      ><v-list-item-content
        ><v-list-item-title>{{ arrivalLocal }}</v-list-item-title
        ><v-list-item-subtitle
          >Scheduled Arrival (Local Time)</v-list-item-subtitle
        ></v-list-item-content
      ></v-list-item
    >
    <v-list-item v-if="flight.status === 'Arrived' && !!flight.arrival.terminal"
      ><v-list-item-content
        ><v-list-item-title>{{ flight.arrival.terminal }}</v-list-item-title
        ><v-list-item-subtitle
          >Terminal</v-list-item-subtitle
        ></v-list-item-content
      ></v-list-item
    >

    <v-list-item
      ><v-list-item-content
        ><v-list-item-title>{{ flight.status }}</v-list-item-title
        ><v-list-item-subtitle
          >Status</v-list-item-subtitle
        ></v-list-item-content
      ></v-list-item
    >
  </v-card>
</template>

<script>
  export default {
    name: 'FlightCard',
    props: {
      flight: {
        type: Object,
        required: true,
      },
    },
    computed: {
      hasArrivalData() {
        return !!this.flight.arrival
      },
      hasDepartureData() {
        return !!this.flight.departure
      },
      departureLocal() {
        return this.getLocalTime(this.flight.departure.scheduledTimeLocal)
      },
      arrivalLocal() {
        return this.getLocalTime(this.flight.arrival.scheduledTimeLocal)
      },
    },
    methods: {
      getLocalTime(localTime) {
        const date = new Date(localTime)
        return date.toTimeString()
      },
    },
  }
</script>