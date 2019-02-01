<template>
    <div>
        {{ 
            note(
                $route.params.track,
                $route.params.bar,
                $route.params.index
            ) 
        }} 
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters(['note'])
    };
</script>