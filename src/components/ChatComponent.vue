<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';


const props = defineProps({
  user_id: {
    type: String,
    required: true,
  },
})

let chats = ref([])
let message = ref()
const userId = localStorage.getItem('userId');
async function getChats(){
    console.log("hej hej")
    try {
        
        console.log(props.user_id)
        const response = await axios.get('/api/v1/chat/' + props.user_id);
        chats.value = response.data; // reactive update
        console.log('chats loaded:', chats.value);
    } catch (error) {
        console.error('Failed to fetch chats:', error);
    }
}

async function sendMessage(){
    console.log("hej hej")
    try {
        
        console.log(props.user_id)
        await axios.post('/api/v1/chat/', {
        content: message.value,
        sender_id: localStorage.getItem("userId"),
        recipient_id: props.user_id
    });
    } catch (error) {
        console.error('Failed to fetch chats:', error);
    }
}


onMounted(()=>{
    getChats()
})
</script>

<template>
  <div class="component">
    <div class="head">
    </div>
    <div v-for="chat in chats" :key="chat.id" class="friendcard">
      <p v-if="userId == chat.sender_id" class="yourMessage">{{ chat.content }}</p>
      <p v-else class="theirMessage">{{ chat.content }}</p>
    </div>
    <div>new message <input type="text" v-model="message">
    <br>
        <button v-on:click="sendMessage">send</button></div>
  </div>
</template>

<style scoped>
.yourMessage{
    background-color: blue;
}

.theirMessage{
    background-color: rgb(255, 0, 13);
}
</style>