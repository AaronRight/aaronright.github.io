<template>
    <div id="app">
        <metronome></metronome>

        <test></test>

        <br>

        <popup id="popup">
            <add_track></add_track>
        </popup>

        <br>

        <button @click='play'>play</button>
        <button @click='addNewTact'>addNewTact</button>
        <table border="1">
            <tr v-for="(track, index_tr) in melody">
                <td v-for="(tact, index_ta) in track">
                    <table v-if="Array.isArray(tact)" >
                        <tr>
                            <td v-for="(note, index_n) in tact">
                                <input type='checkbox'
                                       :checked='note.value'
                                        v-model="note.value"
                                />
                            </td>
                        </tr>
                    </table>
                    <div v-else>
                        {{tact}}
                    </div>
                </td>
            </tr>

        </table>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import metronome from './components/Metronome.vue';
    import add_track from './components/AddTrack.vue';
    import popup from './components/Popup.vue';
    import test from './Test.vue';

    export default {
      computed: mapState([
        'melody'
      ]),
      methods: {
        addNewTact() {
            this.$store.dispatch( 'addTact', '4/4' );
        },
        play(){
            //console.log(this.melody);

            document.getElementById('popup').focus();
            // create instruments
            // create timers
            // start playing
        }
      },
      components: {
        metronome, test, add_track, popup
      }
    };
</script>

<style>
    #app {
      color: black;
    }
</style>