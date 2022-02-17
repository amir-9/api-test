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
      showModal: false,
      modalHeader: '',
      modalTeamId: 0,
      modalCountry: '',
      modalContinent: '',
      modalLogo:'',
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
              console.log(this.someData)
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
          } else {
            if (this.currentItem >= (item[5] * this.itemsInPage)) {
              this.currentItem -= item[5] * this.itemsInPage;
              this.someData = this.teamData.slice(this.currentItem, this.currentItem + this.itemsInPage);
            }
          }

      }

    },
    modal(idx) {
      console.log(this.teamData[idx])
      const TEAM = this.teamData[idx];
      this.modalHeader = TEAM.name
      this.modalCountry = TEAM.country.name
      this.modalContinent = TEAM.country.continent
      this.modalTeamId = TEAM.team_id
      this.modalLogo = TEAM.logo


      this.showModal = true;
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
            :key="team.name"
            @click="modal(((pageNumber - 1) * itemsInPage) + (index ))"
        >
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
          <button :disabled="currentItem === 0" @click="pageData('prev')">
            <span><font-awesome-icon :icon="['fas','circle-chevron-left']" /></span>
            <span> prev</span>
          </button>
        </div>
        <div class="tdot">
          <span>...</span>
        </div>
        <div v-if="currentItem >= (3 * itemsInPage)" @click="pageData('prev-3')">
          <button>{{ pageNumber - 3 }}</button>
        </div>
        <div v-if="currentItem >= (2 * itemsInPage)" @click="pageData('prev-2')">
          <button>{{ pageNumber - 2 }}</button>
        </div>
        <div v-if="currentItem >= itemsInPage" @click="pageData('prev-1')">
          <button>{{ pageNumber - 1 }}</button>
        </div>
        <div class="current">
          <button disabled>{{ pageNumber }}</button>
        </div>
        <div v-if="currentItem < teamData.length - itemsInPage" @click="pageData('next-1')">
          <button>{{ pageNumber + 1 }}</button>
        </div>
        <div v-if="currentItem < teamData.length - (2 * itemsInPage)" @click="pageData('next-2')">
          <button>{{ pageNumber + 2 }}</button>
        </div>
        <div v-if="currentItem < teamData.length - (3 * itemsInPage)" @click="pageData('next-3')">
          <button>{{ pageNumber + 3 }}</button>
        </div>
        <div class="tdot">
          <span>...</span>
        </div>
        <div>
          <button :disabled="currentItem > (teamData.length - itemsInPage)" @click="pageData('next')">
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
  <div>
    <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
      <span class="modal__title">{{ modalHeader }} </span>
      <span @click="showModal=false" class="close">X</span>
      <div class="modal__info">
        <div class="modal__content">
          <p><b>country name: </b> {{ modalCountry }}</p>
          <p><b>Continent name: </b> {{ modalContinent }}</p>
          <p><b>Team Id: </b> {{ modalTeamId }}</p>
        </div>
        <div class="modal__logo">
          <img :src="modalLogo" :alt="modalHeader">
        </div>
      </div>
    </vue-final-modal>
  </div>

</template>
<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modal-content {
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  font-size: 15px;
  text-align: start;
  position: relative;

}
.modal__content{
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
}
.modal__info{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.close{
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: 600;
  width: 25px;
  height: 25px;
  color: #fff;
  background: #f84b2d;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close:hover{
  background: #ff1f00;
}
</style>
<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>