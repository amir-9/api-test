<template>
  <v-simple-table dark>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          Asset
        </th>
        <th class="text-left">
          Total
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in balances"
          :key="item.asset">
        <td>{{ item.asset }}</td>
        <td>{{ item.total }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
const axios = require('axios');
// let dataResponse;
let dataTeams = [];

export default {
  name: 'App',

  data: () => ({
    info: [],
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
    async getData() {
      try {
        const response = await axios.get('https://app.sportdataapi.com/api/v1/soccer/teams?apikey=746e8490-8caf-11ec-8b49-ff10d696164c&country_id=48');
        (response.data.data).forEach((elem)=>{
          this.info.push(elem)
        })
        console.log(this.info[2]);
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    this.getData();
  }

}
</script>
