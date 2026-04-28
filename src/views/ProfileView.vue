<script setup>
import FeedComponent from '@/components/FeedComponent.vue';
import FriendList from '@/components/FriendList.vue';

import axios from 'axios';
import { ref, onMounted } from 'vue';

let user_id = "c1122fb4-867d-4543-887f-b07b5b485388"
let userInfo = ref()
async function getUserInfo(){
    try {
        
        console.log(user_id)
        const response = await axios.get('/api/v1/you/' + user_id);
        userInfo.value = response.data; // reactive update
        console.log('usernumber loaded:', userInfo.value);
        console.log(response.data)

        
    } catch (error) {
        console.error('Failed to fetch feeds:', error);
    }
}

onMounted(()=>{
  getUserInfo()
})
</script>

<template>
  <main>
    <div class="container2">
      <div class="info">
        <div>
      <img src="../assets/defaultProfile.png" alt="default profile pic" id="profilePic"> 
            <h2>{{ userInfo.displayname }}</h2>
            <p>{{ userInfo.name }}</p>
        </div>
      </div>
      <FeedComponent/>
      <div class="friendList">
        <FriendList/>

      </div>
    </div>
    
  </main>
</template>

<style scoped>
  .container2 {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.recommendedAndRequests{
  width:25%;
}

.friendList{
  width:20%;
}

#profilePic{
    width: 200px;
    border-radius: 75px;
}

</style>