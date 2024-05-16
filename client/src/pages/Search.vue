<script setup lang="ts">
import { ref } from 'vue';
import { type User, getUsers } from '@/model/users';
import { searchUser } from '@/model/users';
import { computed } from 'vue';

const users = ref([] as User[]);
const info = ref([] as User[]);

async function fetchData() {
  users.value = await getUsers();

  return users;
}

fetchData().then(() => (users.value));
searchUser("null").then((u)=>info.value=u);


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
    <o-field label="Searching for someone?">
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
            <template #empty>oops</template>
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
  width:100px;
}

.field{
  margin: 50px;
}
.o-autocomplete {
  border: 10px solid #989898;
  border-radius: 10px;
  padding: 20px;
  font-size: 30px;
}

.o-autocomplete .dropdown-item {
  padding: 40px;

}

  </style>
  