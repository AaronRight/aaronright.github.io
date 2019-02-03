<template>
    <v-popup >
        <div class="add_track" >
            <select ref="add_track_select">
                <option v-for="(notes, instrument) in instruments" v-bind:key="instrument">{{ instrument }}</option>
            </select>
            <button @click='addNewTrack'>Create</button>
        </div>
    </v-popup>
</template>

<script>
    import { mapState } from 'vuex'
    import Popup from '../Popup.vue';

    export default {
      components:{
        'v-popup' : Popup
      },
      computed: mapState([
        'instruments'
      ]),
      data: function(){
        return {}
      },
      methods: {
        addNewTrack() {
            this.$store.dispatch( 'addTrack', 
              { 
                name: this.$refs.add_track_select.value, 
                notes: this.instruments[this.$refs.add_track_select.value]
              }
            );
        }
      }
    };
</script>

<style>
    .add_track {
      border: 1px solid black;
      width : fit-content;
      margin: 3px;
      padding: 3px;
    }

    .add_track > select {
      width : 100px;
    }

    .add_track > button {
      width : 60px;
    }
</style>