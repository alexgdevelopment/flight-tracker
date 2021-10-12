<template>
  <v-col>
    <v-card class="pa-3">
      <v-fab-transition>
        <v-btn
          :color="mainColor"
          elevation="2"
          absolute
          top
          left
          fab
          x-small
          data-testid="backButton"
          @click="onBack"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-fab-transition>
      <AirportCard v-if="airport" ref="airportCard" :airport="airport" />
      <v-row justify="center" class="mt-3">
        <v-col>
          <v-card elevation="5" class="pa-3">
            <v-row justify="center">
              <v-col cols="auto">
                <div>From</div>
              </v-col>
            </v-row>
            <v-menu
              v-model="dateFromPicker"
              :close-on-content-click="false"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFrom"
                  readonly
                  prepend-icon="mdi-calendar"
                  data-testid="dateFromTextField"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="dateFrom"
                :color="mainColor"
                :max="dateTo"
                :min="oneDayLess(dateTo)"
                data-testid="dateFromPicker"
                @click:date="dateFromPicker = false"
              />
            </v-menu>
            <v-menu
              v-model="timeFromPicker"
              :close-on-content-click="false"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="timeFrom"
                  readonly
                  prepend-icon="mdi-clock"
                  data-testid="timeFromTextField"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-time-picker
                v-model="timeFrom"
                :color="mainColor"
                format="24hr"
                :min="twelveHoursLess(timeTo)"
                data-testid="timeFromPicker"
                @click:minute="timeFromPicker = false"
              />
            </v-menu>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="5" class="pa-3">
            <v-row justify="center">
              <v-col cols="auto">
                <div>To</div>
              </v-col>
            </v-row>
            <v-menu
              v-model="dateToPicker"
              :close-on-content-click="false"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="dateTo"
                  readonly
                  prepend-icon="mdi-calendar"
                  data-testid="dateToTextField"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="dateTo"
                :color="mainColor"
                :min="dateFrom"
                :max="oneDayMore(dateFrom)"
                data-testid="dateToPicker"
                @click:date="dateToPicker = false"
              />
            </v-menu>
            <v-menu
              v-model="timeToPicker"
              :close-on-content-click="false"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="timeTo"
                  readonly
                  prepend-icon="mdi-clock"
                  data-testid="timeToTextField"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-time-picker
                v-model="timeTo"
                :color="mainColor"
                :max="twelveHoursMore(timeFrom)"
                format="24hr"
                data-testid="timeToPicker"
                @click:minute="timeToPicker = false"
              />
            </v-menu>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-6">
        <v-btn data-testid="clearTermsButton" @click.native="onClear">
          clear terms
        </v-btn>
        <v-btn data-testid="searchButton" @click.native="onSearch">
          search
        </v-btn>
      </v-row>
      <v-row justify="center">
        <v-col
          v-if="arrivals && arrivals.length !== 0"
          data-testid="arrivalsColumn"
        >
          <v-row justify="center">
            <v-col cols="auto">
              <div>Arrivals</div>
            </v-col>
          </v-row>
          <FlightCard
            v-for="(flight, index) in arrivals"
            :key="index"
            :flight="flight"
          />
        </v-col>
        <v-col
          v-if="departures && departures.length !== 0"
          data-testid="departuresColumn"
          ><v-row justify="center">
            <v-col cols="auto">
              <div>Departures</div>
            </v-col>
          </v-row>
          <FlightCard
            v-for="(flight, index) in departures"
            :key="index"
            :flight="flight"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        dateFromPicker: false,
        timeFromPicker: false,
        dateToPicker: false,
        timeToPicker: false,
      }
    },
    computed: {
      ...mapState({
        airport: (state) => state.airports.currentAirport,
        arrivals: (state) => state.flights.arrivals,
        departures: (state) => state.flights.departures,
        mainColor: (state) => state.mainColor,
      }),
      dateFrom: {
        get() {
          return this.$store.state.dateFrom
        },
        set(value) {
          this.$store.commit('set', { varName: 'dateFrom', value })
        },
      },
      dateTo: {
        get() {
          return this.$store.state.dateTo
        },
        set(value) {
          this.$store.commit('set', { varName: 'dateTo', value })
        },
      },
      timeFrom: {
        get() {
          return this.$store.state.timeFrom
        },
        set(value) {
          this.$store.commit('set', { varName: 'timeFrom', value })
        },
      },
      timeTo: {
        get() {
          return this.$store.state.timeTo
        },
        set(value) {
          this.$store.commit('set', { varName: 'timeTo', value })
        },
      },
    },
    methods: {
      onSearch() {
        this.$store.dispatch('flights/getFlightsForAirport')
      },
      onClear() {
        this.$store.dispatch('clearToFromDates')
      },
      onBack() {
        this.$store.dispatch('clearCurrentAirport')
      },
      oneDayLess(date) {
        if (!date) return

        let newDate = new Date(date)
        newDate = newDate.getTime() - 1000 * 60 * 60 * 24
        return new Date(newDate).toISOString().substring(0, 10)
      },
      oneDayMore(date) {
        if (!date) return
        let newDate = new Date(date)
        newDate = newDate.getTime() + 1000 * 60 * 60 * 24
        return new Date(newDate).toISOString().substring(0, 10)
      },
      twelveHoursMore(date) {
        if (!date) return
        let newDate = new Date()
        const dateArr = date.split(':')
        newDate.setHours(+dateArr[0], +dateArr[1])
        newDate = newDate.getTime() + 1000 * 60 * 60 * 12
        newDate = new Date(newDate)
        let hours = newDate.getHours()
        if (hours < 10) {
          hours = `0${hours}`
        }
        let minutes = newDate.getMinutes()
        if (minutes < 10) {
          minutes = `0${minutes}`
        }
        return `${hours}:${minutes}`
      },
      twelveHoursLess(date) {
        if (!date) return
        let newDate = new Date()
        const dateArr = date.split(':')
        newDate.setHours(+dateArr[0], +dateArr[1])
        newDate = newDate.getTime() - 1000 * 60 * 60 * 12
        newDate = new Date(newDate)
        let hours = newDate.getHours()
        if (hours < 10) {
          hours = `0${hours}`
        }
        let minutes = newDate.getMinutes()
        if (minutes < 10) {
          minutes = `0${minutes}`
        }
        return `${hours}:${minutes}`
      },
    },
  }
</script>