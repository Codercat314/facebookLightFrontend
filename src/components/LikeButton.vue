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
        console.log(props.post_id)
        console.log(localStorage.getItem("userId"))
        
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
        const response = await axios.get('/api/v1/like/' + props.post_id);
        likeNumber.value = response.data; // reactive update
        console.log('likenumber loaded:', likeNumber.value);

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
    <p>{{ likeNumber }}</p>
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
    background-color: rgb(73, 8, 252);
    color:black;
}

.liked{
  background-color: blue;
}
</style>
