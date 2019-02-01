<template>
    <div>
    <input type="button" @click="switchZIndex()" value="Checked"/> 
        <table>
            <thead>
                <tr>
                    <td v-for='tact in melody[0]'>
                        <label class="check_tact">
                            <input type="checkbox" :disabled="checked_state"/>
                            <span></span>
                        </label>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for='(track, index_t) in melody'>
                    <td v-for='(bar, index_b) in track'>
                        <table v-if="Array.isArray(bar)" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="wrapper" v-for='(note, index_n) in bar'>
                                    <label class="check_check">
                                        <input type="checkbox"/>
                                        <span></span>
                                    </label>
                                    <label class="check_value">
                                        <input type="checkbox" :checked='note.value' v-model="note.value"/>
                                        <span @click="infoNote(index_t, index_b, index_n)"></span>
                                    </label>
                                </td>
                            </tr>
                        </table>
                        <div v-else>
                            <router-link 
                                :to="index_t == 0 ? (index_b == 0 ? bar : '/bar/' + index_b) : '/track/' + index_t"
                            >
                                {{bar}}
                            </router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot></tfoot>
        </table>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        computed: mapState([
            'melody'
        ]),
        data:  function() {
            return  {
                checked_state : false
            }          
        },
        methods: {
            switchZIndex(){
                var global = getCSSRule('.check_check');
                if (global.style.zIndex < 5) global.style.zIndex = 10;
                else global.style.zIndex = 0;
            },
            infoNote: function(track, bar, note) {
                /* 
                    with "function" works "this" in vue context 
                    https://vuejs.org/v2/api/#data
                */
                this.$router.push('/note/'+track+'/'+bar+'/'+note);
            }
        }  
    };
</script>

<style>
    label {
        position:relative;
        cursor:pointer;
    }
    label [type="checkbox"] {
        display:none;
    }
    [type="checkbox"] + span {
        display:inline-block;
        padding: 15px;
    }
    :checked + span {
        background:rgba(70,70,70,0.5);
        display:inline-block;
    }
    [type="checkbox"][disabled] + span {
        background:#e8e8e8;
    }
    
    .wrapper { position: relative; }

    .check_check{ 
        z-index: 10; 
        background:rgba(0,0,0,0);
    }

    .check_value {
        position: absolute;
        top: 0;
        left: 0;
        padding: 3px;
        z-index: 5;
    }

    .check_value  span {
        padding: 11px;
        border: 1px gray solid;
    }
</style>