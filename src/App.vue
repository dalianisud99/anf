<template>
  <v-container style="width: 90%">
    <H1>FORMULARIO</H1>
    <form style="margin-bottom: 50px;">
      <v-text-field
          v-model="userObject.name"
          label="Name"
      ></v-text-field>
      <v-text-field
          v-model="userObject.lastName"
          label="Apellidos"
      ></v-text-field>
      <v-text-field
          v-model="userObject.age"
          label="Edad"
      ></v-text-field>
      <v-select
          :items="sexItems"
          label="Sexo"
          v-model="userObject.sex"
      ></v-select>
      <v-text-field
          v-model="userObject.email"
          label="Correo"
      ></v-text-field>
      <v-btn
          class="mr-4"
          @click="insertUser"
      >
        Insertar
      </v-btn>
    </form>
    <v-row style="width: 100%">
      <v-col cols="8">
        <v-data-table
            :headers="headers"
            :items="users"
            mobile-breakpoint="300"
        ></v-data-table>
      </v-col>
      <v-col cols="4">
        <h5> Edad promedio de las personas insertadas</h5>
        <v-text-field
            v-model="average"
            readonly
        >
        </v-text-field>
        <h5> Cantidad de personas del sexo femenino</h5>
        <v-text-field
            v-model="countFemales"
            readonly
        >
        </v-text-field>
        <h5> Cantidad de personas del sexo masculino</h5>
        <v-text-field
            v-model="countMales"
            readonly
        >
        </v-text-field>
        <h5> Cantidad de personas menores de edad</h5>
        <v-text-field
            v-model="minorAges"
            readonly
        >
        </v-text-field>
        <h5> Cantidad de personas mayores de edad</h5>
        <v-text-field
            v-model="majorAges"
            readonly
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>


import axios from "axios";

export default {
  name: 'App',
  components: {},
  data: function () {
    return {
      userObject: {
        name: '',
        lastName: '',
        age: '',
        sex: '',
        email: '',
        nationality: '',

      },
      users: [],
      count: 0,

      sexItems: ['Femenino', 'Masculino'],
    }
  },
  methods: {
    insertUser: async function () {
      this.users.push(this.userObject);
      await this.probableNationality();
      this.clearFields();
      this.averageAge();
      this.countFemale();
      this.countMale();
      this.minorAge();
      this.majorAge();
    },
    clearFields: function () {
      this.userObject = {
        name: '',
        lastName: '',
        age: '',
        sex: '',
        email: '',
        nationality: '',
      }
    },
    averageAge: function () {
      let total = 0;
      let count = this.users.length;
      this.users.forEach((user) => {
        total += parseInt(user.age);
      });

      this.average = total / count;
    },
    countFemale: function () {
      this.countFemales = '';
      this.users.forEach((user) => {
        if (user.sex === 'F' || user.sex === 'f' || user.sex === 'Femenino' || user.sex === 'femenino') {
          this.countFemales++;
        }
      });
    },
    countMale: function () {
      this.cm = '';
      this.users.forEach((user) => {
        if (user.sex === 'M' || user.sex === 'm' || user.sex === 'Masculino' || user.sex === 'masculino') {
          this.countMales++;
        }
      });
    },
    minorAge: function () {
      this.minorAges = '';
      this.users.forEach((user) => {
        if (user.age < 18) {
          this.minorAges++;
        }
      });
    },
    majorAge: function () {
      this.majorAges = '';
      this.users.forEach((user) => {
        if (user.age >= 18) {
          this.majorAges++;
        }
      });
    },
    probableNationality: function () {
        axios.get('https://api.nationalize.io/?name=Dalianis').then((response) => {
        this.users[0].nationality= response.data.country[0].country_id;
        console.log(this.userObject);
      });
    },
  },
  computed: {
    headers() {
      let headers = [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'name',
        },
      ];
      if (!this.$vuetify.breakpoint.xsOnly) {
        headers.push({text: 'Apellidos', value: 'lastName'});
        headers.push({text: 'Edad', value: 'age'});
      }
      headers.push({text: 'Sexo', value: 'sex'});
      headers.push({text: 'Correo', value: 'email'});
      headers.push({text: 'Nacionalidad Probable', value: 'nationality'});
      return headers;
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
