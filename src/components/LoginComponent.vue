<script setup>
import axios from 'axios';

//let feedData = ref([])
let email;
let password;
async function login(){
    try {
        const response = await axios.post('/api/v1/login', {
        email: email,
        password: password
    });

    console.log('Server response:', response.data);
    alert("hejhej")

    localStorage.setItem("userId", response.data.$user.id)
    localStorage.setItem("userName", response.data.$user.name)
    localStorage.setItem("userEmail", response.data.$user.email)
    localStorage.setItem("accessToken", response.data.access_token)

    } catch (error) {
        console.error('Failed to fetch feeds:', error);
        alert("wrong password")
    }
}

</script>

<template>
  <div>
    
    <input type="email" name="email" id="emailId" v-model="email" placeholder="email">
    <br>
    <input type="password" name="password" id="pass" v-model="password" placeholder="password">
    <br>
    <button v-on:click="login">Log in</button>

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}


input, button{
  width: 96%;
  height: 30px;
  font-size: large;
  margin-right: 15px;
  margin: 5px;
  border: none;
  background-color: var(--purple);
  border-radius: 10px;
  padding:5px;  
}
</style>
