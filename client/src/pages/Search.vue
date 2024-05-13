
<script setup lang="ts">
import { ref } from 'vue';
import { type User } from '@/model/users';
import { searchUser } from '@/model/users';

const info = ref([] as User[]);
const searches=ref('');
const nothing=ref('null');

function findUser(string: string){
  searchUser(string).then((u)=>info.value=u);
}


</script>

<template>


<!--Add a search bar-->
<div class="field">
  <div class="control">
    <input class="input" type="text" placeholder="Search" v-model="searches">
  </div>
</div>
  <p>You Searched for: {{ searches }}</p>

  <button class="button is-primary" style="margin: 10px;" @click="findUser(searches)">Search</button>
  <button class="button is-primary" style="margin: 10px;" @click="findUser(nothing); searches='';">Clear</button>


    <div class="Search">
          

      <div class="card" v-for="item in info" :key="item.firstName">
        <div class="media-content">
          <p class="title is-4">{{ item.firstName }}</p>
        </div>
        <div class="card-image">
          <figure class="image" style="width: 200px;">
        <img :src="item.image" alt="Product image" style="width: 100%;">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
        
          </div>
        </div>
      </div>



    </div>
  </template>
  
  <style>

  </style>
  
