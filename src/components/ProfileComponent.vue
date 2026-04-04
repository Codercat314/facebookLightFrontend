<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
const props = defineProps({
  user_id: {
    type: String,
    required: true,
  },
})
let userInfo = ref("default")

async function getUserInfo(){
    try {
        
        console.log(props.post_id)
        const response = await axios.get('/api/v1/you/' + props.user_id);
        userInfo.value = response.data; // reactive update
        console.log('likenumber loaded:', userInfo.value);
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
  <div>
    <p><img src="../assets/defaultProfile.png" alt="default profile pic"> {{ userInfo.displayname }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

p{
    text-align: right;
    background-color: rgb(252, 8, 8);
}

div{
    background-color: rgb(252, 8, 8);
    color:black;
}


</style>
