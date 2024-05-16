<script setup lang="ts">
import { ref } from 'vue';
import { type User, getUsers } from '@/model/users';
import { searchUser } from '@/model/users';
import { computed } from 'vue';

const users = ref([] as User[]);
const info = ref([] as User[]);

//fetching the data from the model
async function fetchData() {
  users.value = await getUsers();
}

fetchData().then(() => (users.value));
searchUser("null").then((u)=>info.value=u);

//----------------------------------------------

const data=users;
const name = ref("");
const selected = ref();

const filteredDataArray = computed(() =>
    data.value.filter(
        (option) =>
            option.toString().toLowerCase().indexOf(name.value.toLowerCase()) >=
            0,
    ),
);

</script>

<template>
  <section>
    <o-field label="Find a User">
        <o-autocomplete
            v-model="name"
            rounded
            expanded
            placeholder="Search for a User"
            icon="Search"
            clearable
            open-on-focus
            :data="filteredDataArray"
            :field="'firstName'"  
            @select="(option: User) => (selected = option)">
            <template #empty>Try another User!</template>
        </o-autocomplete>
    </o-field>

    <div v-if="selected">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ selected.firstName }} {{ selected.lastName }}</h5>
        </div>
        <img :src="selected.image" alt="User Image" class="card-img-top">
      </div>
    </div>

  </section>
    
  </template>
  
  <style>


.card-img-top{
  width:50px;
}

.field{
  margin: 10px;
}
.o-autocomplete {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
}

.o-autocomplete .dropdown-item {
  padding: 10px;
}

  </style>
  