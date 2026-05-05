<script setup>

import ProfileSidebar from '@/components/ProfileSidebar.vue';



</script>

<template>
  <main>
    <div class="sidebar">
      <ProfileSidebar />
    </div>

    <div class="content">
      <!-- feed goes here later -->
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
}
</style>