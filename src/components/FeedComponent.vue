<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import LikeButton from './LikeButton.vue';
import ProfileComponent from './ProfileComponent.vue';
import CommentsField from './CommentsField.vue';

let feedData = ref([])

async function getFeeds(){
    try {
        const response = await axios.get('/api/v1/posts');
        feedData.value = response.data; // reactive update
        console.log('Feed loaded:', feedData.value);
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
    <div v-for="feed in feedData" :key="feed.id" class="feedCard">
      <div class="content">
        <h2>{{ feed.content }}</h2>
        <p>{{ feed.created_at }}</p>

      </div>
      <div class="container">
        <ProfileComponent :user_id='feed.user_id'/>
        <LikeButton :post_id='feed.id' />
        
      </div>
      <div class="comments">
        <CommentsField :post_id="feed.id"/>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
@media (min-width: 600px) {
  #feed{
    width: 50%;
    min-width: 600px;
    
  }

}
  .feedCard{
    background-color: var(--whiteColor);
    border-radius: 30px;
    margin: 15px;
  }

  .container {
  display: flex;
 
  align-items: flex-end;
  background-color: var(--mediumColor);
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
</style>
