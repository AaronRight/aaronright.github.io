<template>
    <div class="add_track" >
        <select ref="add_track_select">
            <option v-for="(notes, instrument) in instruments">{{ instrument }}</option>
        </select>
        <button @click='addNewTrack'>Create</button>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
      name: 'add_track',
      computed: mapState([
        'instruments'
      ]),
      data: function(){
        return {}
      },
      methods: {
        addNewTrack() {
            this.$store.dispatch( 'addTrack', this.$refs.add_track_select.value );
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