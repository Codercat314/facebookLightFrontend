<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ProfileComponent from './ProfileComponent.vue';


let friends = ref([])

async function getFriendsRequests(){
    try {
        const userId = localStorage.getItem('userId');
        console.log(userId)
        const response = await axios.get('/api/v1/friend/requests/');
        friends.value = response.data; // reactive update
        console.log('friend requests loaded:', friends.value);
    } catch (error) {
        console.error('Failed to fetch friends requests:', error);
    }
}


onMounted(()=>{
    getFriendsRequests()
})
</script>

<template>
  <div>
    <h3>
      This is your friend requests
    </h3>
  </div>
  <div v-for="friend in friends" :key="friend.id">
    <hr>
    
    <ProfileComponent :user_id="friend.sender_id" :connection_id="friend.id"/>
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
    background-color: rgb(243, 118, 1);
    color: black;
}
</style>
