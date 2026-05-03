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
let submitError = ref()


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

      if (!content.value) {
        submitError.value = "comment requried"
        return
      }else if (content.value.length > 100){
        submitError.value = "content to long"
        return
      }
        const response = await axios.post('/api/v1/comment', {
        content: content.value,
        post_id: props.post_id
    });
        console.log(response)
        getComments()
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
    <form @submit.prevent="comment">
      <input type="text" v-model="content">
      <button>Comment!</button>
    </form>
    <p v-if="submitError"> {{ submitError }}</p>
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