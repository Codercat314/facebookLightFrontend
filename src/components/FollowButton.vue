<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

import { useAppStore } from '@/stores/vars'
let user_id = ref()
let friendCheck = ref(null)
console.log(friendCheck)
const store = useAppStore()
user_id.value = store.chosenUser
async function getConnection(){
    try {
        const token = localStorage.getItem("accessToken")
        const response = await axios.get('/api/v1/friend/check/' + user_id.value,
        {headers: 
        {
          Authorization: `Bearer ${token}`
        }});
        friendCheck.value = response.data
        console.log(response.data)
        console.log(friendCheck.value)


    } catch (error) {
        console.error('Failed to fetch feeds:', error);
        alert("wrong password")
    }
}

async function sendFriendRequest(){
  try {
        
        
        const response = await axios.post('/api/v1/friend/', {
        sender_id : localStorage.getItem("userId"),
        recipient_id : user_id.value
    });
        console.log(response)
    
  } catch (error) {
      console.error('Failed to fetch feeds:', error);
  }
}

onMounted(()=>{
  getConnection()
})
</script>

<template>
  <div v-if="friendCheck">
    <button @click="sendFriendRequest" v-if="friendCheck.status === 0">Follow</button>
    <span v-if="friendCheck.status === 1">friend request in progress</span>
    <span v-if="friendCheck.status === 2">you are friends</span>
  </div>
</template>

<style scoped>
button{
  width: 96%;
  height: 30px;
  font-size: large;
  margin-right: 15px;
  margin: 5px;
  border: none;
  background-color: var(--purple);
  border-radius: 10px;
  padding:5px;  
}
</style>
