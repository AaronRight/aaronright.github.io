<template>
    <div>{{ bar($route.params.index) }}</div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters(['bar'])
    };
</script>