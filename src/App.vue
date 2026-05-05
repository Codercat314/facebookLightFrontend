<script setup>
import {  RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav>
      <h1>Catblogg</h1>
    </nav> 
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 40vh;
  background-color: var(--purple);
  margin: none;
}
header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    max-height: 20vh;
  }

h1{
    text-align: center;
    color: var(--color-text);
    font-size: 5em;
    font-family: 'Courier New', Courier, monospace;
    
  }



nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
 
  
}









@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    max-height: 20vh;
  }



  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    
    
  }

  h1{
    text-align: center;
    color: var(--color-text);
    font-size: 5em;
    font-family: 'Courier New', Courier, monospace;
    
  }
}
</style>
