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
  <div>
    <div v-for="comment in comments" :key="comment.id" class="commentRow">
      <p>{{ comment.content }}</p>
      <p>// {{ comment.displayname }}</p>
    </div>
    <div class="commentInput">
      <input type="text" v-model="content" placeholder="new comment"/>
      <button @click="comment">post</button>
    </div>
    <p v-if="submitError">{{ submitError }}</p>
  </div>
</template>
<style scoped>

.commentRow {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--purple);
  border-radius: 8px;
  margin-bottom: 5px;
  color: black;
}

.commentInput {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}

.commentInput input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: var(--purple);
}

.commentInput button {
  padding: 8px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--purple);
}
</style>