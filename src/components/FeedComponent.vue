<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import LikeButton from './LikeButton.vue';
import ProfileComponent from './ProfileComponent.vue';
import CommentsField from './CommentsField.vue';

let feedData = ref([])
defineExpose({ getFeeds })
const selectedPost = ref(null)

async function getFeeds(){
    try {
        const response = await axios.get('/api/v1/posts');
        feedData.value = response.data; // reactive update
        console.log('Feed loaded:', feedData.value);
        
        console.log(feedData.value[0])
    } catch (error) {
        console.error('Failed to fetch feeds:', error);
    }
}


onMounted(()=>{
    getFeeds()
})
</script>

<template>
  <div id="feed">
    <div v-for="feed in feedData" :key="feed.id" class="feedCard" >
      <div class="content" @click="selectedPost = feed">
        <h2>{{ feed.content }}</h2>
      </div>
      <div class="container">
        <ProfileComponent :user_id='feed.user_id'/>
        <LikeButton :post_id='feed.id' />
        
      </div>
      
    </div>
  </div>
  <div class="modalOverlay" v-if="selectedPost" @click.self="selectedPost = null">
    <div class="modal">
      <button class="closeBtn" @click="selectedPost = null">✕</button>
      <p class="postContent">{{ selectedPost.content }}</p>
      <CommentsField :post_id="selectedPost.id"/>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 600px) {
  

}
  .feedCard{
    background-color: var(--whiteColor);
    border-radius: 30px;
    margin: 15px;
  }

  .container {
  display: flex;
 
  align-items: flex-end;
  background-color: var(--blue);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  padding-bottom: 5px;
  padding-top: 5px;
}

.content{
  padding: 15px;
}

.comments{
  width: 100%;
}
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: var(--blue);
  border-radius: 15px;
  padding: 25px;
  width: 40%;
  min-width: 400px;
  position: relative;
}

.postContent {
  background: white;
  border-radius: 10px;
  padding: 15px;
  min-height: 80px;
  margin-bottom: 5px;
}

.closeBtn {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
