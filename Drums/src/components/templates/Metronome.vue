<template>
    <div class="metronome">
        <input type="number" v-model="tempo">
        <button @click='play($event)'>Start</button>
    </div>
</template>

<script>
    export default {
        data: function(){
        return {
            tempo : 60,
            timer : {}
        }
      },
      methods: {
        play(event) {
            if( event.target.innerText === 'Start' ){
                event.target.innerText = 'Stop';
                timer = setInterval(
                    function(){ new Audio( require('../../resources/sounds/cowbell.mp3')).play() },
                    60 / this.tempo * 1000
                );
            } else {
                event.target.innerText = 'Start';
                clearInterval(timer);
            }
        }
      }
    };
</script>

<style scoped>
    .metronome {
      border: 1px solid black;
      width : fit-content;
      margin: 3px;
      padding: 3px;
    }

    .metronome > input {
      width : 40px;
    }

    .metronome > button {
      width : 40px;
    }
</style>