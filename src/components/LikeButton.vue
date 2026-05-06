<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
const props = defineProps({
  post_id: {
    type: String,
    required: true,
  },
})
let likeNumber = ref()
let buttonLook = ref()

async function like(){
    try {
        console.log("postLiked")
        let token = localStorage.getItem("accessToken")
        await axios.post('/api/v1/like', 
          { post_id: props.post_id },
          { headers: { Authorization: `Bearer ${token}` } }
);
      getLikeNumber()
    } catch (error) {
        console.error('Failed to fetch feeds:', error);
        alert("post failed creating")
    }
}

async function getLikeNumber(){
    try {
      let token = localStorage.getItem("accessToken")
        const response = await axios.get('/api/v1/like/' + props.post_id);
        likeNumber.value = response.data; // reactive update
  
        const didUserLike = await axios.post('/api/v1/likeCheck', 
          { post_id: props.post_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(didUserLike.value)
        buttonLook.value = didUserLike.data; // reactive update
        
    } catch (error) {
        console.error('Failed to fetch feeds:', error);
    }
}

onMounted(()=>{
  getLikeNumber()
})
</script>

<template>
  <div>
    <button v-on:click="like" :class="buttonLook">like!</button>
    {{ likeNumber }}
  </div>
</template>

<style scoped>

div{
    
    color:black;
    width: 50%;
    padding-left: 30px;
    border-radius: 30px;
    text-align: right;
}

.liked{
  background-color: var(--green);
  border: 2px solid green;
  
  
}

.notLiked{
  background-color: var(--gray);
  
}
</style>
