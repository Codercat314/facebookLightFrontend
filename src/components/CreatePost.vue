<script setup>
import axios from 'axios';
//import { onMounted, ref } from 'vue';

//let feedData = ref([])
let content;

async function create(){
    try {
        const response = await axios.post('/api/v1/posts', {
        content: content,
        user_id: localStorage.getItem("userId")
    });

    console.log('Server response:', response.data);
    alert("post created")

    } catch (error) {
        console.error('Failed to fetch feeds:', error);
        alert("post failed creating")
    }
}


</script>

<template>
  <div>
    <h3>
      This is the post creation
    </h3>
  </div>
  <div>
    <textarea name="content" id="contentArea" v-model="content"></textarea>
    <br>
    <button v-on:click="create">Publish</button>
  </div>
</template>

<style scoped>


h3 {
  font-size: 1.2rem;
}


h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

textarea{
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
