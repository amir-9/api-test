<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="teams"
        :page="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination
          v-model="page"
          :length="pageCount"
      ></v-pagination>
      <v-text-field
          :value="itemsPerPage"
          label="Items per page"
          type="number"
          min="-1"
          max="15"
          @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
// let dataResponse;
let dataTeams = [];

// Make a request for a user with a given ID
const sendGetRequest = async () => {
  try {
    const resp = await axios.get('https://app.sportdataapi.com/api/v1/soccer/teams?apikey=746e8490-8caf-11ec-8b49-ff10d696164c&country_id=48')
    // console.log(resp.data)
    dataTeams = resp.data.data
  } catch (err) {
    console.log(err)
  }

}
sendGetRequest();

export default {
  name: 'App',

  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    headers: [
      {
        text: 'team',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Calories', value: 'calories'},
      {text: 'Fat (g)', value: 'fat'},
      {text: 'Carbs (g)', value: 'carbs'},
      {text: 'Protein (g)', value: 'protein'},
      {text: 'Iron (%)', value: 'iron'},
    ],
    teams: dataTeams,
  }),
  methods: {
    tessst() {
      console.log(dataTeams)
    }
  }
}
</script>
