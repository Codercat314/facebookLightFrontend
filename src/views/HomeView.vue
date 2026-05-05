<script setup>
import FeedComponent from '@/components/FeedComponent.vue';
import ProfileSidebar from '@/components/ProfileSidebar.vue';
import CreatePost from '@/components/CreatePost.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import { ref } from 'vue';
import axios from 'axios';
const showAddPost = ref(false)
const feedRef = ref(null)
const searchQuery = ref('')
const searchResults = ref(null)
function onPostCreated() {
  showAddPost.value = false
  feedRef.value.getFeeds()
}

async function search() {
  if (!searchQuery.value) return
  try {
    const token = localStorage.getItem("accessToken")
    const response = await axios.post('/api/v1/search', 
      { content: searchQuery.value },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    searchResults.value = response.data
  } catch (error) {
    console.error('Search failed:', error)
  }
}

</script>

<template>
  <main>
    <div class="sidebar">
      <ProfileSidebar />
    </div>

    <div class="content">
      <div class="topBar">
        <input class="search" type="text" placeholder="search" v-model="searchQuery" @keyup.enter="search"/>
        <button class="addPost" @click="showAddPost = !showAddPost">add post</button>
        <button class="friendsBtn">Friends</button>
      </div>
      <div class="searchResults" v-if="searchResults">
        <button class="closeBtn" @click="searchResults = null">✕</button>
          <div v-for="user in searchResults.users" :key="user.id" class="friendCard">
            <ProfileComponent :user_id="user.id"/>
          </div>
          <div v-for="post in searchResults.posts" :key="post.id" class="searchPost">
            {{ post.content }}
          </div>
      </div>
      <div class="postForm" v-if="showAddPost">
        <button class="closeBtn" @click="showAddPost = false">✕</button>
        <CreatePost @postCreated="onPostCreated" />
      </div>
        <FeedComponent ref="feedRef" />
      </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 33.33%;
  height: 100%;
}

.content {
  width: 66.66%;
  height: 100%;
  overflow-y: scroll;
}
.topBar {
  display: flex;
  gap: 10px;
  padding: 10px;
  align-items: center;
}

.search {
  padding: 8px;
  border-radius: 8px;
  border: none;
  flex: 1;
}

.addPost, .friendsBtn {
  padding: 8px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.postForm {
  position: absolute;
  background: white;
  border-radius: 15px;
  padding: 20px;
  width: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.closeBtn {
  float: right;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
}
.searchResults {
  background: white;
  border-radius: 15px;
  padding: 15px;
  margin: 10px;
}

.searchPost {
  padding: 8px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

</style>