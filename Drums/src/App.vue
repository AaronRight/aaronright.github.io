<template>
    <div id="app">
        <button @click='show_menu'>show_menu</button> <v_menu :actions='actions' id='show_menu'></v_menu>
        <metronome></metronome>

        <test></test>

        <br>

        <button @click='show_popup'>show_popup</button>
        <popup id="show_popup">
            <add_track></add_track>
        </popup>

        <br>

        <button @click='addNewTact'>addNewTact</button>
        <track_list></track_list>
        <v_info_panel></v_info_panel>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import { metronome, add_track, track_list, popup, v_menu, v_info_panel ,test } from './components';
    
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
      },
      components: {
        metronome, test, add_track, popup, v_menu, track_list, v_info_panel
      }
    };
</script>

<style>
</style>