<template>
  <v-app>
    <v-content>
        <div class="resultContainer">
          <v-layout>
            <v-flex grow pa-1 ><Editor  class="item elevation-5"/> </v-flex>
            <v-flex grow pa-2 ><Editor  class="item elevation-5"/> </v-flex>
            <v-flex grow pa-3 ><Editor  class="item elevation-5"/> </v-flex>
          </v-layout>
        </div>
   
    </v-content>
  </v-app>
</template>

<script>
import Editor from './components/Editor'

export default {
  name: 'App',
  components: {
    Editor
  },
  data () {
    return {
      //
    }
  }
}
</script>
