<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
const props = defineProps({
  user_id: {
    type: String,
    required: true,
  },
  connection_id: {
    type: String,
    required: false,
  },
})
let userInfo = ref("default")
let friend = ref(true)
let userOwn = localStorage.getItem("userId")
async function getUserInfo(){
    try {
        
        console.log(props.post_id)
        const response = await axios.get('/api/v1/you/' + props.user_id);
        userInfo.value = response.data; // reactive update
        console.log('usernumber loaded:', userInfo.value);
        console.log(response.data)

        const friendCheck = await axios.get('/api/v1/friend/check/' + props.user_id);
        friend.value = friendCheck.data.status; // reactive update
        console.log('usernumber loaded:', friend.value);
        console.log(friendCheck.data)
    
    } catch (error) {
        console.error('Failed to fetch feeds:', error);
    }
}

async function sendFriendRequest(){
  try {
        
        console.log(userOwn)
        const response = await axios.post('/api/v1/friend/', {
        sender_id : userOwn,
        recipient_id : props.user_id
    });
        console.log(response)
    
  } catch (error) {
      console.error('Failed to fetch feeds:', error);
  }
}

async function accept(){
  try {
        
        console.log(userOwn)
        const response = await axios.post('/api/v1/friend/accept', {
        id : props.connection_id
    });
        console.log(response)
    
  } catch (error) {
      console.error('Failed to fetch feeds:', error);
  }
}

async function deny(){
  try {
        
        console.log(userOwn)
        const response = await axios.post('/api/v1/friend/deny', {
        id : props.connection_id
    });
        console.log(response)
    
  } catch (error) {
      console.error('Failed to fetch feeds:', error);
  }
}

onMounted(()=>{
  getUserInfo()
})
</script>

<template>
  <div>
    <p>
      <img src="../assets/defaultProfile.png" alt="default profile pic"> 
      {{ userInfo.displayname }}
      <button v-if="!(friend == 2 || props.user_id == userOwn || connection_id)" v-on:click="sendFriendRequest">follow</button>
      <button v-if="connection_id" v-on:click="accept">Accept request</button>
      <button v-if="connection_id" v-on:click="deny">Deny request</button>
      
    
    </p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

p{
    text-align: right;
    background-color: rgb(252, 8, 8);
}

div{
    background-color: rgb(252, 8, 8);
    color:black;
}


</style>
