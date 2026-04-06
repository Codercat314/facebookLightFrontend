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
        
        const response = await axios.post('/api/v1/like', {
        post_id: props.post_id,
        user_id: localStorage.getItem("userId")

        
    });
    console.log('Server response:', response.data);
    alert("post created")

    } catch (error) {
        console.error('Failed to fetch feeds:', error);
        alert("post failed creating")
    }
}

async function getLikeNumber(){
    try {
        
        console.log(props.post_id)
        const response = await axios.get('/api/v1/like/' + props.post_id);
        likeNumber.value = response.data; // reactive update
        console.log('likenumber loaded:', likeNumber.value);
        console.log(response.data)

        const didUserLike = await axios.post('/api/v1/likeCheck', {
        post_id: props.post_id,
        user_id: localStorage.getItem("userId")
    });

        buttonLook.value = didUserLike.data; // reactive update
        console.log('valueif user liked loaded:', buttonLook.value);
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
}

.liked{
  background-color: var(--darkColor);
  
  border:solid 1px var(--darkColor);
}

.notLiked{
  background-color: var(--contrast);
  border:solid 1px var(--contrast);
}
</style>
