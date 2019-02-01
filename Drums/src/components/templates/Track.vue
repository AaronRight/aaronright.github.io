<template>
    <div>{{ track( $route.params.index ) }}</div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters(['track'])
    };
</script>