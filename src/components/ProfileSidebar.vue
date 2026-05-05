<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useAppStore } from '@/stores/vars'

let userInfo = ref(null)
let user_id = ref()
const store = useAppStore()
//only for default
store.setUser(localStorage.getItem('userId'))
user_id.value = store.chosenUser
const activeTab = ref('friends')

async function getUserInfo(){
    try {
        const response = await axios.get('/api/v1/you/' + user_id.value);
        userInfo.value = response.data; // reactive update
        console.log('usernumber loaded:', userInfo.value);
        console.log(response.data)

        
    
    } catch (error) {
        console.error('Failed to fetch feeds:', error);
    }
}

onMounted(()=>{
  getUserInfo()
  console.log(userInfo.value)
})

</script>

<template>
  <div class="sidebarWrapper">
    <template v-if="userInfo">
      <div class="nameRow">
        <div>
          <h1>{{ userInfo.user.name }}</h1>
          <h2>{{ userInfo.user.displayname }}</h2>
        </div>
        <button class="postsBtn">posts</button>
      </div>
      <img class="profilePic" src="@/assets/defaultProfile.png" alt="profile picture"/>
      <div class="tabs">
        <span :class="{ activeTab: activeTab === 'requests' }" @click="activeTab = 'requests'">requests</span>
        <span :class="{ activeTab: activeTab === 'friends' }" @click="activeTab = 'friends'">friends</span>
        <span :class="{ activeTab: activeTab === 'recommend' }" @click="activeTab = 'recommend'">recommend</span>
      </div>

      <div class="tabContent">
        <div v-if="activeTab === 'requests'">requests go here</div>
        <div v-if="activeTab === 'friends'">friends go here</div>
        <div v-if="activeTab === 'recommend'">recommend go here</div>
      </div>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>
<style scoped>


.sidebarWrapper {
  color: black;
  width: 100%;
  height: 100%;
  text-align: right;
  background-color: var(--blue);
}


.profilePic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}
.nameRow {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.postsBtn {
  padding: 5px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.tabs {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  cursor: pointer;
}

.tabs span {
  font-size: 0.85rem;
}

.activeTab {
  font-weight: bold;
  border-bottom: 2px solid black;
}
</style>