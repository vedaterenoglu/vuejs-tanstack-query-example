<template>
  <div>
    <h2>Click Test Component</h2>
    <button @click="handleClick" style="padding: 10px; background: red; color: white;">
      CLICK ME TO TEST
    </button>
    <div @click="handleDivClick" style="padding: 20px; background: blue; color: white; margin-top: 10px; cursor: pointer;">
      CLICK THIS DIV
    </div>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('BUTTON CLICKED!')
  alert('Button was clicked!')
}

const handleDivClick = () => {
  console.log('DIV CLICKED!')
  alert('Div was clicked!')
}
</script>