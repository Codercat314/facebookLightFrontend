<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useAppStore } from '@/stores/vars'
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
let userInfo = ref(null)

let userOwn = localStorage.getItem("userId")
const store = useAppStore()
async function getUserInfo(){
    try {
        const response = await axios.get('/api/v1/you/' + props.user_id);
        userInfo.value = response.data; // reactive update
    } catch (error) {
        console.error('Failed to fetch feeds:', error);
    }
}

function switchUser(){
  store.setUser(props.user_id)
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
    <template v-if="userInfo && userInfo.user">
      <div v-on:click="switchUser">
        <img src="../assets/defaultProfile.png" alt="default profile pic"> 
        {{ userInfo.user.displayname }}
      </div>
      
      <span v-if="connection_id">
        <button @click="accept">✓</button>
        <button @click="deny">✗</button>
      </span>
    </template>
  </div>
</template>

<style scoped>

img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

div{
    
    color:black;
    padding-left: 15px;
    
    padding-right: 30px;
    border-radius: 30px;
}

button{
  background-color: var(--contrast);
  border: none;
  margin: 5px;
}


</style>
