<template>
    <div id="app">
        {{ sounds }}
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'sounds'
  ])
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>