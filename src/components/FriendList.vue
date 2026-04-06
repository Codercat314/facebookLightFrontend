<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ProfileComponent from './ProfileComponent.vue';


let friends = ref([])

async function getFriends(){
    try {
        const userId = localStorage.getItem('userId');
        console.log(userId)
        const response = await axios.get('/api/v1/friend/list/' + userId);
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
  <div class="component">
    <div class="head">
      <h3>
        This is your friends
      </h3>
    </div>
    <div v-for="friend in friends" :key="friend.id" class="friendcard">
      <ProfileComponent :user_id="friend.recipient_id"/>
    </div>
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
