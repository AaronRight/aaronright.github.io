<template>
    <div id="app">
        <button @click='addNewTrack'>addNewTrack</button>
        <button @click='addNewTact'>addNewTact</button>
        <table border="1">
            <tr v-for="track in melody">
                <td v-for="tact in track">
                    <table v-if="Array.isArray(tact)" >
                        <tr>
                            <td v-for="note in tact">
                                <input type='checkbox' :checked='note.value'/>
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

    export default {
      computed: mapState([
        'melody'
      ]),
      methods: {
        addNewTrack() {
            this.$store.dispatch( 'addTrack', 'Instr 1' );
        },
        addNewTact() {
            this.$store.dispatch( 'addTact', '4/4' );
        }
      }
    };
</script>

<style>
    #app {
      color: black;
    }
</style>