<template>
  <v-lazy>

    <div id="app">

      <v-table fixed-header :height="tableHeight">
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
        <tr v-for="(team ,index) in someData"
            :key="team.name">
          <td>{{ ((pageNumber - 1) * itemsInPage) + (index + 1) }}</td>
          <td>{{ team.name }}</td>
          <td>{{ team.short_code }}</td>
          <td><img :src="team.logo" :alt="team.short_code"></td>

        </tr>
        </tbody>

      </v-table>
      <v-progress-linear
          width="100vw"
          v-if="loader"
          indeterminate
          color="green">
      </v-progress-linear>

      <div class="pagination-buttons">
        <div>
          <button @click="pageData('first')">
            <span> first</span>
          </button>
        </div>
        <div>
          <button @click="pageData('prev')">
            <span><font-awesome-icon :icon="['fas','circle-chevron-left']" /></span>
            <span> prev</span>
          </button>
        </div>
        <div class="tdot">
          <span>...</span>
        </div>
        <div @click="pageData('prev-3')">
          <button>{{ pageNumber - 3 }}</button>
        </div>
        <div @click="pageData('prev-2')">
          <button>{{ pageNumber - 2 }}</button>
        </div>
        <div @click="pageData('prev-1')">
          <button>{{ pageNumber - 1 }}</button>
        </div>
        <div class="current">
          <button>{{ pageNumber }}</button>
        </div>
        <div @click="pageData('next-1')">
          <button>{{ pageNumber + 1 }}</button>
        </div>
        <div @click="pageData('next-2')">
          <button>{{ pageNumber + 2 }}</button>
        </div>
        <div @click="pageData('next-3')">
          <button>{{ pageNumber + 3 }}</button>
        </div>
        <div class="tdot">
          <span>...</span>
        </div>
        <div>
          <button @click="pageData('next')">
            <span> next</span>
            <span><font-awesome-icon :icon="['fas','circle-chevron-right']" /></span>
          </button>
        </div>
        <div>
          <button @click="pageData('last')">
            <span> last</span>
          </button>
        </div>
      </div>
    </div>
  </v-lazy>

</template>

<script>
import './assets/css/font-awesome-all.css'

const axios = require('axios');

export default {

  name: 'App',
  data() {
    return {
      tableHeight: '10vh',
      teamData: null,
      someData: null,
      currentItem: 0,
      itemsInPage: 7,
      pageNumber: 1,
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
              this.tableHeight = '93vh'
              this.pageData('first');
            });
      } catch (error) {
        console.error(error);
      }
    },
    pageData(item) {
      switch (item) {
        case 'next':
          if (this.currentItem < this.teamData.length - this.itemsInPage) {
            this.currentItem += this.itemsInPage;
            this.someData = this.teamData.slice(this.currentItem, this.currentItem + this.itemsInPage);
          }
          break;
        case 'prev':
          if (this.currentItem > 0) {
            this.currentItem -= this.itemsInPage;
            this.someData = this.teamData.slice(this.currentItem, this.currentItem + this.itemsInPage);
          }
          break;
        case 'first':
          this.currentItem = 0;
          this.someData = this.teamData.slice(0, this.itemsInPage);
          break;
        case 'last':
          this.currentItem = Math.floor((this.teamData.length) / this.itemsInPage) * this.itemsInPage;
          this.someData = this.teamData.slice(Math.floor((this.currentItem)), this.teamData.length);
          break;
        default:
          if (item.includes('next')) {
            if (this.currentItem < this.teamData.length - (item[5] * this.itemsInPage)) {
              this.currentItem += item[5] * this.itemsInPage;
              this.someData = this.teamData.slice(this.currentItem, this.currentItem + this.itemsInPage);
            }
          }else {
            if (this.currentItem >= (item[5] * this.itemsInPage)) {
              this.currentItem -= item[5] * this.itemsInPage;
              this.someData = this.teamData.slice(this.currentItem, this.currentItem + this.itemsInPage);
            }
          }

      }

    },
    say(word) {
      console.log(word)
    }
  },
  watch: {
    currentItem() {
      this.pageNumber = (this.currentItem / this.itemsInPage) + 1
    }
  },
  created() {
    this.getData();
  },
}
</script>
