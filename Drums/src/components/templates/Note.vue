<template>
    <div>
        {{ 
            note(
                $route.params.track,
                $route.params.bar,
                $route.params.index
            ) 
        }} 
       <!--radio??-->
        <select ref="change_note">
                <option v-for="c in notes" v-bind:key="c.measure"
        >{{ c.measure }}</option>
        </select>
        <button @click='changeNote'>change Note</button>
        <!-- changing size generates following notes -->
        <button @click='changeNote'>delete</button>

        <br>

        <div>
            <ul v-for="c in notes" v-bind:key="c.name">
                <li> <label>
                        <input type="radio" name="c.name" value="c.measure" 
                            :checked="note( $route.params.track,$route.params.bar,$route.params.index).size == c.measure" />
                        <span><sup>1</sup>/<sub>{{c.name}}</sub></span>
                    </label>
                    <ul>
                        <li>
                            <label>
                                <input type="radio" name="c.name" value="c.dotted" 
                                    :checked="note( $route.params.track,$route.params.bar,$route.params.index).size == c.dotted"/>
                                <span>.</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="c.name" value="c.double_dotted" 
                                    :checked="note( $route.params.track,$route.params.bar,$route.params.index).size == c.double_dotted"/>
                                <span>..</span>
                            </label>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters(['note', 'notes']),
        methods: {
            changeNote: function() {
/*
                this.$store.getters.note(
                    this.$route.params.track, this.$route.params.bar, this.$route.params.index
                ).size = this.$refs.change_note.value;
*/
                this.$store.dispatch( 'changeNote', {
                    track: this.$route.params.track,
                    bar: this.$route.params.bar,
                    index: this.$route.params.index,
                    size: this.$refs.change_note.value,
                    numerator:4,
                    denominator:4
                });
            }
        }
    };
</script>

<style scoped>
            div ul {
                padding: 0;
                margin: 0;
                list-style-type: none;
            }

            div li {
                position: relative;
                float: left;
                width: 40px;
                margin: 1%;
            }

            div li ul {
                display: none;
                position: absolute;
                top: 1em;
                left: 0;
            }

            div li > ul {
                top: auto;
                left: auto;
            }

            li:hover ul {
                display: block;
                clear: left;
            }
</style>