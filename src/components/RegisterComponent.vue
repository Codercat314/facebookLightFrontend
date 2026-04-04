<script setup>
import axios from 'axios';

//let feedData = ref([])
let email;
let password;
let name;
let displayname;

async function register(){
    try {
        const response = await axios.post('/api/v1/register', {
        email: email,
        password: password,
        name: name,
        displayname: displayname
    });

    console.log('Server response:', response.data);
    alert("hejhej")
    
    localStorage.setItem("userId", response.data.user.id)
    localStorage.setItem("userName", response.data.user.name)
    localStorage.setItem("userEmail", response.data.user.email)
    
    } catch (error) {
        console.error('Failed to fetch feeds:', error);
        alert("fel lösen")
    }
}

</script>

<template>
  <div>
    <h3>
      This is the registering
    </h3>
  </div>
  <div>
    <input type="text" name="name" id="name" v-model="name" placeholder="name">
    <br>
    <input type="text" name="displayname" id="displayname" v-model="displayname" placeholder="display name">
    <br>
    <input type="email" name="email" id="emailId" v-model="email" placeholder="email">
    <br>
    <input type="password" name="password" id="pass" v-model="password" placeholder="password">
    <br>
    <button v-on:click="register">Registrer</button>

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
    background-color: rgb(223, 226, 27);
    color:black;
}
</style>
