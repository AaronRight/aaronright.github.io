<template>
      <polyline :points="points()"></polyline>
</template>

<script>
  /* xy = [ x1, y1, x2, y2 ] */    
  export default {
    props: [ 'xy' ],
    methods: {
      points(){
        return this.xy[0] + ',' + this.xy[1] + ' ' + this.xy[2] + ',' + this.xy[3]
      }
    }
  };
</script>

<style>
  svg{
    fill:none;
    stroke:black;
  }
</style>