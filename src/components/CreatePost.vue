<script setup>
import axios from 'axios';
import { ref } from 'vue';

//let feedData = ref([])
let content = ref();
let submitError = ref();
const emit = defineEmits(['postCreated'])

async function create(){
    try {
      if (!content.value) {
        submitError.value = "comment requried"
        return
      }else if (content.value.length > 500){
        submitError.value = "content to long"
        return
      }
        let token = localStorage.getItem("accessToken")
        const response = await axios.post('/api/v1/posts', 
        {
        content: content.value
        },
        {headers: 
        {
          Authorization: `Bearer ${token}`
        }});

    console.log('Server response:', response.data);
    emit('postCreated')
    content.value = ''

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
    <form @submit.prevent="create">
    <textarea name="content" id="contentArea" v-model="content"></textarea>
    <br>
    <button>Publish</button> 
    </form>
    <p v-if="submitError"> {{ submitError }}</p>
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
