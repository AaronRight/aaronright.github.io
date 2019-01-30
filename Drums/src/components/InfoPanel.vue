<template>
    <keep-alive >
          <div class="v-info-panel">
              <component  v-bind:is="current_component"></component>
          </div>
    </keep-alive>
</template>

<script>
    import { mapState } from 'vuex'
    
    export default {
      name: 'v-info-panel',
      computed: mapState([
        'current_component'
      ])
    };
</script>

<style>
    .v-info-panel{
        background: rgb(220, 220, 220);
        width: 300px;
        height: 150px;
    }
</style>