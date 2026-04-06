<script setup>
import FeedComponent from '@/components/FeedComponent.vue';
import FriendList from '@/components/FriendList.vue';
import FriendRequests from '@/components/FriendRequests.vue';
import RecommendedFriends from '@/components/RecommendedFriends.vue';


</script>

<template>
  <main>
    <div class="container2">
      <div class="recommendedAndRequests">
        <FriendRequests/>
        <RecommendedFriends/>
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

</style>