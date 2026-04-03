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

    } catch (error) {
        console.error('Failed to fetch feeds:', error);
        alert("fel lösen")
    }
}

</script>

<template>
  <div>
    <h3>
      This is the login
    </h3>
  </div>
  <div>
    <input type="email" name="email" id="emailId" v-model="email">
    <br>
    <input type="password" name="password" id="pass" v-model="password">
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

h3 {
  font-size: 1.2rem;
}

div{
    background-color: violet;
    color:black;
}
</style>
