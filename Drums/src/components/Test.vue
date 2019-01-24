<template>
    <div class="test">
        <button @click='play($event)'>Start sample</button>
    </div>
</template>

<script>
    module.exports = {
      name: 'test',
      data: function(){
        return {
            timer1 : {},
            timer2 : {},
            timer3 : {},
            p : true
        }
      },
      methods: {
        play(event) {
           if( this.p ){
                this.p = false;
                event.target.innerText = 'Stop sample';
                this.timer1 = setInterval(
                    function(){ new Audio( require('../resources/sounds/hi-hat_1.mp3')).play() },
                    60 / 240 * 1000
                );
                this.timer2 = setInterval(
                    function(){ new Audio( require('../resources/sounds/snare_1.mp3')).play() },
                    60 / 60 * 1000
                );
                this.timer3 = setInterval(
                    function(){ new Audio( require('../resources/sounds/bass_1.mp3')).play() },
                    60 / 120 * 1000
                );
           } else {
                this.p = true;
                event.target.innerText = 'Start sample';
                clearInterval(this.timer1);
                clearInterval(this.timer2);
                clearInterval(this.timer3);
           }
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