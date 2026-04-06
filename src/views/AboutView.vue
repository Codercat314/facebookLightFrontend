<script setup>
import CreatePost from '@/components/CreatePost.vue';

import FriendList from '@/components/FriendList.vue';
import FriendRequests from '@/components/FriendRequests.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import RecommendedFriends from '@/components/RecommendedFriends.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import UsersList from '@/components/UsersList.vue';
</script>
<template>
  <div class="about">
  
  <LoginComponent/>
  <RegisterComponent/>
  <CreatePost/>
  <FriendRequests/>
  <FriendList/>
  <UsersList/>
  <RecommendedFriends/>
  </div>
</template>

<style>

</style>
