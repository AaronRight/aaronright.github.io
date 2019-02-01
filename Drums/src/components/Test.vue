<template>
    <div class="test">
        <button @click='play($event)'>Start sample</button>
    </div>
</template>

<script>
    module.exports = {
        methods: { 
         play:function(){
           this.rhythm_sample.play_experimental();
          }
        }
    };
</script>

<style>
    .test {
      border: 1px solid black;
      width : fit-content;
      margin: 3px;
      padding: 3px;
    }

    .test > button {
      width : 88px;
    }
</style>