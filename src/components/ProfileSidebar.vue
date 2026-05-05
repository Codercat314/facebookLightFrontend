<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useAppStore } from '@/stores/vars'
import ProfileComponent from '@/components/ProfileComponent.vue';
import { watch } from 'vue';

let userInfo = ref(null)
let user_id = ref()
let friends = ref([])
const store = useAppStore()
//only for default
//store.setUser(localStorage.getItem('userId'))
user_id.value = store.chosenUser
const activeTab = ref('friends')
let requests = ref([])
let recommended = ref([])
watch(() => store.chosenUser, (newId) => {
  user_id.value = newId
  getUserInfo()
  getFriends()
})
async function getRecommended(){
    try {
        const token = localStorage.getItem("accessToken")
        const response = await axios.get('/api/v1/friend/recommended/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        recommended.value = response.data;
        console.log(recommended.value)
    } catch (error) {
        console.error('Failed to fetch recommended:', error);
    }
}

async function getFriendRequests(){
    try {
        const token = localStorage.getItem("accessToken")
        const response = await axios.get('/api/v1/friend/requests/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        requests.value = response.data;
    } catch (error) {
        console.error('Failed to fetch friend requests:', error);
    }
}
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


async function getFriends(){
    try {
        const response = await axios.get('/api/v1/friend/list/' + user_id.value);
        friends.value = response.data;
    } catch (error) {
        console.error('Failed to fetch friends:', error);
    }
}

onMounted(()=>{
  getUserInfo()
  getFriends()
  getFriendRequests()
  getRecommended()
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
  <div v-if="activeTab === 'requests'">
    <div v-for="friend in requests" :key="friend.id" class="friendCard">
      <ProfileComponent :user_id="friend.sender_id" :connection_id="friend.id"/>
    </div>
  </div>

  <div v-if="activeTab === 'friends'">
    <div v-for="friend in friends" :key="friend.id" class="friendCard">
      <ProfileComponent :user_id="friend.recipient_id"/>
    </div>
  </div>

  <div v-if="activeTab === 'recommend'">
    <div v-if="activeTab === 'recommend'">
        <div v-for="person in recommended" :key="person.recipient_id" class="friendCard">
            <ProfileComponent :user_id="person.recipient_id"/>
        </div>
    </div>
  </div>
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
.friendCard {
  padding: 8px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
</style>