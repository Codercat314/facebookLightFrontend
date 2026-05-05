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
        <div v-if="create">
          <h1>Create account</h1>
          <RegisterComponent/>
        </div>
        <div v-else>
          <h1>Log in</h1>
          <LoginComponent/>
        </div>
        <div v-on:click="switchState">click here to Create/switch Accont</div>
      </div>
  </div>
</template>

<style>
#loginOrCreate{
  width: 80%;
  
  min-width: 600px;
  background-color: var(--blue);

  border-radius: 30px;
  margin: 15px;
  padding: 20px;
  
}

#createPost{
  width: 50%;
  min-width: 600px;
  background-color: var(--whiteColor);

  border-radius: 30px;
  margin: 15px;
  padding: 20px;
  
}

h1{
  text-align: center;
}

.about{
  display: flex;

  align-items: center;
  justify-content: center;
}
</style>
