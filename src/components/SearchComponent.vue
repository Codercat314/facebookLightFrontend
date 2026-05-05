<script setup>
import axios from 'axios';
import { ref } from 'vue';

let content = ref()
let searchData = ref([])

async function search(){
    try {
        const response = await axios.get('/api/v1/search/' + content.value);
        searchData.value = response.data; // reactive update
        
    } catch (error) {
        console.error('Failed to fetch friends:', error);
    }
}

</script>

<template>
  <div>
    <h3>
      This is the registering
    </h3>
  </div>
  <div>
    <input type="text" name="name" id="name" v-model="content" placeholder="what are you looking for">
    
    <button v-on:click="search">Search</button>
  </div>
  <div>
    <div v-for="post in searchData.posts" :key="post.id">
        <p>POST: <b>{{ post.content }}</b> </p>
    </div>
    <div v-for="user in searchData.users" :key="user.id">
        <p>User: <b>{{ user.name }}</b> // {{ user.displayname }} </p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

input{
  width: 100%;
  height: 30px;
  font-size: large;
  margin: 5px;
  border: none;
  background-color: var(--lightColor);
  border-radius: 10px;
  padding:5px;  
}
</style>
