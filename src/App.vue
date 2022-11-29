<template>
  <v-container style="width: 90%">
    <H1>FORMULARIO</H1>
    <form style="margin-bottom: 50px;">
      <v-text-field
          v-model="userObject.name"
          label="Name"
      ></v-text-field>
      <v-text-field
          v-model="userObject.last_name"
          label="Apellidos"
      ></v-text-field>
      <v-text-field
          v-model="userObject.age"
          label="Edad"
      ></v-text-field>
      <v-text-field
          v-model="userObject.sex"
          label="Sexo"
      ></v-text-field>
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
            v-model="cf"
            readonly
        >
        </v-text-field>
        <h5> Cantidad de personas del sexo masculino</h5>
        <v-text-field
            v-model="cm"
            readonly
        >
        </v-text-field>
        <h5> Cantidad de personas menores de edad</h5>
        <v-text-field
            v-model="mAge"
            readonly
        >
        </v-text-field>
        <h5> Cantidad de personas mayores de edad</h5>
        <v-text-field
            v-model="mayAge"
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
        last_name: '',
        age: '',
        sex: '',
        email: '',
        nacionalidad: '',
      },
      users: [],
      count: 0,
      average: '',
      cf: '',
      cm: '',
      mAge: '',
      mayAge: '',
    }
  },
  methods: {
    insertUser: function () {
      this.probableNacionalidad();
      console.log(this.userObject);
      this.users.push(this.userObject);
      this.clearFields();
      this.averageAge();
      this.countFemale();
      this.countMale();
      this.menorAge();
      this.mayorAge();
    },
    clearFields: function () {
      this.userObject = {
        name: '',
        last_name: '',
        age: '',
        sex: '',
        email: '',
        nacionalidad: '',
      }
    },
    averageAge: function () {
      let cc = 0;
      let count = this.users.length;
      this.users.forEach((user) => {
        cc += parseInt(user.age);
      });

      this.average = cc / count;
    },
    countFemale: function () {
      this.cf = '';
      this.users.forEach((user) => {
        if (user.sex === 'F' || user.sex === 'f' || user.sex === 'Femenino' || user.sex === 'femenino') {
          this.cf++;
        }
      });
    },
    countMale: function () {
      this.cm = '';
      this.users.forEach((user) => {
        if (user.sex === 'M' || user.sex === 'm' || user.sex === 'Masculino' || user.sex === 'masculino') {
          this.cm++;
        }
      });
    },
    menorAge: function () {
      this.mAge = '';
      this.users.forEach((user) => {
        if (user.age < 18) {
          this.mAge++;
        }
      });
    },
    mayorAge: function () {
      this.mayAge = '';
      this.users.forEach((user) => {
        if (user.age >= 18) {
          this.mayAge++;
        }
      });
    },
    probableNacionalidad:async function () {
      await axios.get('https://api.nationalize.io/?name=' + this.userObject.name).then((response) => {
        this.userObject.nacionalidad = response.data.country[0].country_id;
      });
    },
  },
  computed: {
    headers() {
      let hh = [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'name',
        },
      ];
      if (!this.$vuetify.breakpoint.xsOnly) {
        hh.push({text: 'Apellidos', value: 'last_name'});
        hh.push({text: 'Edad', value: 'age'});
      }
      hh.push({text: 'Sexo', value: 'sex'});
      hh.push({text: 'Correo', value: 'email'});
      hh.push({text: 'Nacionalidad Probable', value: 'nacionalidad'});
      return hh;
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
