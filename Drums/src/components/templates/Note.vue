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
            
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters(['note', 'notes']),
        methods: {
            changeNote: function() {
                this.$store.getters.note(
                    this.$route.params.track, this.$route.params.bar, this.$route.params.index
                ).size = this.$refs.change_note.value;
            }
        }
    };
</script>