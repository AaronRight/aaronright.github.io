<template>
      <polyline :points="xy"></polyline>
</template>

<script>    
  export default {
    props: [ 'xy' ]
  };
</script>

<style>
  svg{
    fill:none;
    stroke:black;
  }
</style>