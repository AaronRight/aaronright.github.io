<template>
    <div>
        <div v-for="c in this.$store.getters.chapters($route.params.id)" v-bind:key="c.id">
          <router-link :to="'/chapter/' + c.id"> {{c.name}} </router-link>
        </div>
        <hr>
        <div v-for="c in this.$store.getters.topics($route.params.id)" v-bind:key="c.id">
          <router-link :to="'/topic/' + c.id"> {{c.name}} </router-link>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'chapter',
    };
  },
};
</script>

<style>
</style>