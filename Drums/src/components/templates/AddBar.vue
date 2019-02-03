<template>
    <v-popup >
        <div class="add_bar" >
            <select ref="add_bar_n_select">
                <option v-for="c in 1,17" v-bind:key="c" 
                :selected="c == info.default_numerator">{{ c }}</option>
            </select>
            <button @click='setDefaultNumerator'>set numerator default</button>
            <br>
            <select ref="add_bar_d_select">
                <option v-for="c in [2,4,8,16]" v-bind:key="c"
                :selected="c == info.default_denominator">{{ c }}</option>
            </select>
            <button @click='setDefaultDenominator'>set denominator default</button>
            <br>
            <button @click='addNewTact'>Create</button>
            <input type="checkbox" v-model="info.create_bar_silently"/><label></label>
        </div>
    </v-popup>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Popup from '../Popup.vue';

    export default {
      components: {
          'v-popup': Popup
      },

      computed: mapGetters([
        'info'
      ]),
      data: function(){
        return {}
      },
      methods: {
        addNewTact() {
            this.$store.dispatch( 'addTact', { 
              numerator: this.$refs.add_bar_n_select.value, 
              denominator: this.$refs.add_bar_d_select.value 
            } );
        },
        setDefaultNumerator(){
          this.info.default_numerator = this.$refs.add_bar_n_select.value;
        },
        setDefaultDenominator(){
          this.info.default_denominator = this.$refs.add_bar_d_select.value;
        }
      }
    };
</script>

<style>
    .add_bar {
      border: 1px solid black;
      width : fit-content;
      margin: 3px;
      padding: 3px;
    }

    .add_bar > select {
      width : 100px;
    }

    .add_bar > button {
      width : 60px;
    }

    .add_bar > input[type="checkbox"] ~ label::after{
      content: " - as default";
    }
</style>