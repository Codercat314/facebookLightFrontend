<script setup>

import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import { ref } from 'vue';



//userIdCheck.value = false
let create = ref()

function switchState(){
  if (create.value == true){
    create.value = false
  } else {
    create.value = true
  }
}

//get userId
</script>
<template>
  <div class="about">
    <div id="loginOrCreate">
      <div v-on:click="switchState">Create/switch Accont</div>
        <div v-if="create">
          <RegisterComponent/>
        </div>
        <div v-else>
          <LoginComponent/>
        </div>
      </div>
  </div>
</template>

<style>
#loginOrCreate{
  width: 50%;
  min-width: 600px;
  background-color: var(--whiteColor);
  background-color: var(--whiteColor);
  border-radius: 30px;
  margin: 15px;
  padding: 20px;
  
}

#createPost{
  width: 50%;
  min-width: 600px;
  background-color: var(--whiteColor);
  background-color: var(--whiteColor);
  border-radius: 30px;
  margin: 15px;
  padding: 20px;
  
}

.about{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
