<template>
    <div>
        <div v-if="checked_state" class="uncheck_div" @click="uncheck()">
            <span>Uncheck</span>    
        </div>
       
        <table >
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
                        
                        <!--table v-if="index_t!=0 && index_b!=0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="wrapper" v-for='(note, index_n) of bar'>
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
                        </table-->

                        <!--div v-if="index_t!=0 && index_b!=0" cellspacing="0" cellpadding="0" class="bar">
                            <div v-for='(note, index_n) of bar' class="note" 
                                v-bind:style="{flex: '0 0 '+ calcNote( note.size, melody[0][index_b].size )+'%'}"
                            > 
                                <div class="content" @click="infoNote(index_t, index_b, index_n)"></div> 
                            </div>   
                        </div-->

                        <div v-if="index_t!=0 && index_b!=0" cellspacing="0" cellpadding="0" class="bar">
                            <div v-for='(note, index_n) of bar' class="note" 
                                v-bind:style="{flex: '0 0 '+ calcNote( note.size, melody[0][index_b].size )+'%'}"
                            > 
                                <label class="check_check">
                                    <input type="checkbox" @click="checkedGrid(index_t,index_b,index_n)" :checked="isInCheckedGrid(index_t,index_b,index_n) == true"/>
                                    <span class="check_span"></span>
                                </label>
                                <label class="check_value">
                                    <input type="checkbox" :checked='note.value' v-model="note.value"/>
                                    <span class="check_span" @click="infoNote(index_t, index_b, index_n)" 
                                        v-longpress='longPressAction'
                                        :v-track="index_t" :v-bar="index_b" :v-note="index_n"
                                        ></span>
                                </label>
                            </div>   
                        </div>

                        <div v-else-if="index_t==0 && index_b==0">
                            {{/*bar*/}}
                        </div>
                        <div v-else-if="index_t!=0 && index_b==0">
                            <router-link :to="'/track/' + index_t">
                                {{bar.name}}
                            </router-link>
                        </div>
                        <div v-else>
                            <router-link :to="'/bar/' + index_b">
                                {{bar.numerator}} / {{bar.denominator }}
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
                checked_state : false,
                checked_elements: {}
            }          
        },
        methods: {
            isInCheckedGrid(track,bar,note){
                return this.checked_elements[track+":"+bar+":"+note];
            },
            checkedGrid(track,bar,note){
                if(this.checked_elements[track+":"+bar+":"+note])
                    this.checked_elements[track+":"+bar+":"+note] = false;
                else
                    this.checked_elements[track+":"+bar+":"+note] = true;
            },
            switchZIndex(){
                var global = getCSSRule('.check_check');
                if (this.checked_state) global.style.zIndex = 10;
                else global.style.zIndex = 0;
            },
            uncheck(){
                this.checked_elements = {};
                this.checked_state = false;
                this.switchZIndex();
            },
            infoNote: function(track, bar, note) {
                /* 
                    with "function" works "this" in vue context 
                    https://vuejs.org/v2/api/#data
                */
                this.$router.push('/note/'+track+'/'+bar+'/'+note);
            },
            calcNote( note_size, bar_size ){
                return note_size / bar_size * 100;
            },
            longPressAction(event){
                // initialize choosing
                let target = event.target;
                this.checked_state = true;

                this.switchZIndex();
                this.checkedGrid(
                        target.getAttribute('v-track'),
                        target.getAttribute('v-bar'),
                        target.getAttribute('v-note')
                );
            }
        }  
    };
</script>

<style>
    label {
        position:relative; 
        width: calc(100% - 4px);
        cursor:pointer;
    }
    label [type="checkbox"] {
        display:none;
        width: 100%;
    }
    [type="checkbox"] + .check_span {
        display:inline-block;
        padding: 10px 0px;
        width: 100%;
    }
    .check_value :checked + .check_span {
        background:rgba(70,70,70);
        display:inline-block;
        width: 100%;
    }
    [type="checkbox"][disabled] + .check_span {
        background:#e8e8e8;
        width: 100%;
    }

    .check_check :checked + .check_span {
        background:rgba(255,0,0,0.7);
        display:inline-block;
        width: 100%;
    }

    .check_check{ 
        z-index: 0; 
        background:rgba(0,0,0,0);
    }

    .check_value {
        position: absolute;
        top: 0;
        left: 0;
        padding: 1px;
        z-index: 5;
    }

    .check_value .check_span {
        padding: 8px 0px;
        border: 1px gray solid;
    }

    .bar{
        background: lightgrey;
        border: 1px solid black;
        height: 20px;
        width: 300px;
        display: flex;
        flex-flow: nowrap;
    }

    .bar_16{ width: 450px; }
    .bar_32{ width: 600px; }

    .note{ height: 100%; position: relative; }

    .content{
        background: rgb(85, 85, 85);
        margin: 2px;
        width: calc(100% - 4px);
        height: calc(100% - 4px);

        /*
        box-sizing: border-box;
        padding: 2%;
        */
    }

    .uncheck_div{
        color: white;
        background: black;
        text-align: center;
        padding: 5px;
        position: fixed;
        top: 0px;
        width: 100%;
    }
</style>