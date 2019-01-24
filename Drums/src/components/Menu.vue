<template>
    <popup>
        <div class="v_menu" v-for="a in actions" v-bind:key="a.name" @click="a.action"> 
            {{ a.name }} 
        </div>    
    </popup>
</template>

<script>
    import popup from "./Popup.vue";
    export default {
      name: 'v-menu',
      props: ['actions'],
      components: {
          popup
      }
    };
</script>

<style>
    .v_menu{
        width: 50px;
    }
    .v_menu:hover{
        background: gray;
    }
</style>