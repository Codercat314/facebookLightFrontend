<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
const props = defineProps({
  post_id: {
    type: String,
    required: true,
  },
})
let comments = ref([])
let content = ref()


async function getComments(){
    try {
        
        console.log(props.post_id)
        const response = await axios.get('/api/v1/comment/' + props.post_id);
        comments.value = response.data; // reactive update
        console.log(response.data)

    } catch (error) {
        console.error('Failed to fetch feeds:', error);
    }
}

async function comment(){
    try {
        const response = await axios.post('/api/v1/comment', {
        content: content.value,
        post_id: props.post_id
    });
        console.log(response)
    } catch (error) {
        console.error('Failed to fetch feeds:', error);
        alert("post failed creating")
    }
}

onMounted(()=>{
  getComments()
})
</script>

<template>
  <div v-for="comment in comments" :key="comment.id">
    <p>{{ comment.content }} // {{ comment.displayname }}</p>

  </div>
  <div>
    <input type="text" v-model="content"><button v-on:click="comment">Comment!</button>
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
  background-color: var(--darkColor);
  
  border:solid 1px var(--darkColor);
}

.notLiked{
  background-color: var(--contrast);
  border:solid 1px var(--contrast);
}
</style>