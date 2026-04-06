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
  <div class="head">
    <h3>
      This is your friend requests
    </h3>
  </div>
  <div v-for="friend in friends" :key="friend.id" class="friendcard">
    <ProfileComponent :user_id="friend.sender_id" :connection_id="friend.id"/>
  </div>
</template>

<style scoped>


.head{
    background-color: var(--contrast);
    color: black;
    padding: 10px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: 1px solid var(--darkColor);
}
.friendcard{
  background-color: var(--whiteColor);
  padding: 10px;
  border: 1px solid var(--darkColor);
}

</style>
