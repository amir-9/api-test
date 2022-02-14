<template>
  <v-lazy>

    <div id="app">

      <v-table fixed-header
               :height="tableHeight">

        <thead>

        <tr>
          <th>#</th>
          <th class="text-left">
            Team Name
          </th>
          <th class="text-left">
            Short Name
          </th>
          <th class="text-left">
            logo
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(team ,index) in teamData"
            :key="team.name">
          <td>{{ index + 1 }}</td>
          <td>{{ team.name }}</td>
          <td>{{ team.short_code }}</td>
          <td><img :src="team.logo" :alt="team.short_code"></td>

        </tr>
        </tbody>

      </v-table>
      <v-progress-linear
          width= "100vw"
          v-if="loader"
          indeterminate
          color="green"
      ></v-progress-linear>

    </div>
  </v-lazy>

</template>

<script>
const axios = require('axios');

export default {

  name: 'App',
  data() {
    return {
      tableHeight: '10vh',
      teamData: null,
      loader: true,
    }
  },
  methods: {
    async getData() {
      try {
        await axios.get('https://app.sportdataapi.com/api/v1/soccer/teams?apikey=746e8490-8caf-11ec-8b49-ff10d696164c&country_id=48')
            .then((response) => {
              this.loader = false
              this.teamData = response.data.data
              this.tableHeight='100vh'
              console.log(response.data.data)
            });
      } catch (error) {
        console.error(error);
      }
    },
    say(word) {
      console.log(word)
    }
  },
  created() {
    this.getData();
  }
}
</script>
