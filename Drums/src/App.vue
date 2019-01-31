<template>
    <div id="app">
        <button @click='show_menu'>show_menu</button> <v-menu :actions='actions' id='show_menu'></v-menu>
        <metronome></metronome>
        
        <test></test>

        <br>

        <button @click='show_popup'>show_popup</button>
        <v-popup id="show_popup">
            <add-track></add-track>
        </v-popup>

        <br>

        <button @click='addNewTact'>addNewTact</button>
        <track-list></track-list>
        
        <router-link to="/track">Track</router-link>
        <router-link to="/bar">Bar</router-link>
        <router-link to="/note">Note</router-link>

        <v-info-panel></v-info-panel>
        <v-track/>
	</div>
</template>
<script>
    import Vue from 'vue';
    import { mapState } from 'vuex'
    import Metronome from './components/templates/Metronome.vue';
    import AddTrack from './components/templates/AddTrack.vue';
    import TrackList from './components/templates/TrackList.vue';
    import Popup from './components/Popup.vue';
    import Menu from './components/Menu.vue';
    import InfoPanel from './components/InfoPanel.vue';
    import Test from './components/Test.vue';
    import Track from './components/templates/Track.vue';

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
          'v-info-panel': InfoPanel,
          'test': Test,
          'v-track' : Track
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
            // create instruments
            // create timers
            // start playing
        },
        show_menu(){
            document.getElementById('show_menu').focus();
        }
      }
      
    };
</script>

<style>
</style>