<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ProfileComponent from './ProfileComponent.vue';


let friends = ref([])

async function getFriends(){
    try {
        const userId = localStorage.getItem('userId');
        console.log(userId)
        const response = await axios.get('/api/v1/friend/' + userId);
        friends.value = response.data; // reactive update
        console.log('friends loaded:', friends.value);
    } catch (error) {
        console.error('Failed to fetch friends:', error);
    }
}


onMounted(()=>{
    getFriends()
})
</script>

<template>
  <div>
    <h3>
      This is your friends
    </h3>
  </div>
  <div v-for="friend in friends" :key="friend.id">
    <hr>
    
    <ProfileComponent :user_id="friend.recipient_id"/>
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
    background-color: rgb(127, 229, 255);
    color: black;
}
</style>
