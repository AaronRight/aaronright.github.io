<template>
    <div id="app">
        <button @click='show_menu'>show_menu</button> <v-menu :actions='actions' id='show_menu'></v-menu>
        <metronome></metronome>
        
        <test></test>

        <br>

        <button @click='show_popup("show_popup_add_track")'>Add Track</button>
        <add-track id="show_popup_add_track"></add-track>
        
        <button @click='show_popup("show_popup_add_bar")'>Add Bar</button>
        <add-bar id="show_popup_add_bar"></add-bar>
        
        <button @click='play'>play</button>

        <track-list></track-list>
        <info-panel></info-panel>
	</div>
</template>
<script>
    import Vue from 'vue';
    import { mapState } from 'vuex'
    import { Metronome,AddTrack,AddBar,TrackList,Popup,Menu,InfoPanel,Test } from './components';

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
          'add-bar': AddBar,
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
            this.$store.dispatch( 'addTact', {numerator:4,denominator:4});
        },
        show_popup(popup_id){
            document.getElementById(popup_id).focus();
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