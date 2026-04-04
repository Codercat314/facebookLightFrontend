<script setup>
import CreatePost from '@/components/CreatePost.vue';
import FeedComponent from '@/components/FeedComponent.vue';
import FriendList from '@/components/FriendList.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
</script>
<template>
  <div class="about">
  <FeedComponent/>
  <LoginComponent/>
  <RegisterComponent/>
  <CreatePost/>
  <FriendList/>
  </div>
</template>

<style>

</style>
