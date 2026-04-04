<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import LikeButton from './LikeButton.vue';
import ProfileComponent from './ProfileComponent.vue';

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
  <div>
    <h3>
      This is the feed
    </h3>
  </div>
  <div v-for="feed in feedData" :key="feed.id">
    <hr>
    <h2>{{ feed.content }}</h2>
    <p>{{ feed.created_at }}</p>
    <LikeButton :post_id='feed.id' />
    <ProfileComponent :user_id='feed.user_id'/>
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
    background-color: aquamarine;
    color: black;
}
</style>
