<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ProfileComponent from './ProfileComponent.vue';


let users = ref([])

async function getUsers(){
    try {


        const response = await axios.get('/api/v1/users/');
        users.value = response.data; // reactive update
        console.log('users loaded:', users.value);
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
}


onMounted(()=>{
    getUsers()
})
</script>

<template>
  <div>
    <h3>
      This is all users
    </h3>
  </div>
  <div v-for="user in users" :key="user.id">
    <hr>
    
    <ProfileComponent :user_id="user.id"/>
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

div{
    background-color: rgb(255, 127, 127);
    color: black;
}
</style>