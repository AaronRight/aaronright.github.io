<template>
    <div id="app">
        <button @click='show_menu'>show_menu</button> <v-menu :actions='actions' id='show_menu'></v-menu>
        <metronome></metronome>
        
        <test></test>

        <br>

        <button @click='show_popup'>Add Track</button>
        <v-popup id="show_popup">
            <add-track></add-track>
        </v-popup>
        <button @click='addNewTact'>addNewTact</button>
        <button @click='play'>play</button>

        <track-list></track-list>
        <info-panel></info-panel>
	</div>
</template>
<script>
    import Vue from 'vue';
    import { mapState } from 'vuex'
    import { Metronome,AddTrack,TrackList,Popup,Menu,InfoPanel,Test } from './components';

    export default {
      data:  function() {
         return  {
            actions: [
                { name: 'a' , action: function(){ alert('a_a')} },
                { name: 'b' , action: function(){ alert('b_a')} },
                { name: 'c' , action: function(){ alert('c_a')} }
            ]
         }          
      },
      components: {
          'metronome': Metronome,
          'add-track': AddTrack,
          'track-list': TrackList,
          'v-popup': Popup,
          'v-menu': Menu,
          'info-panel': InfoPanel,
          'test': Test
      },
      
      computed: mapState([
        'melody'
      ]),
      methods: {
        addNewTact() {
            this.$store.dispatch( 'addTact', '4/4' );
        },
        show_popup(){
            document.getElementById('show_popup').focus();
        },
        show_menu(){
            document.getElementById('show_menu').focus();
        },
        play(){
            
        }
      }
      
    };
</script>

<style>
</style>