<template>
    <div>
        <input type="text" v-model="edge.text">
        <table border=1>
            <tr v-for="el of edge.elements" :key="el"><td>{{el}}</td></tr>
        </table>
        <button @click="createJoin">createJoin</button>
        <button>delete</button>
        <input type="checkbox" placeholder="Show arrow">
    </div>
</template>
<script>
export default {
    props: ['edge', 'flowchart'],
    methods:{
        createJoin(){
          let currentElements = [ {}, {} ];

          for ( let element of this.flowchart.elements ){
            if (  element.id == this.edge['elements'][0] )
              currentElements[0] = element;
            if (  element.id == this.edge['elements'][1] )
              currentElements[1] = element;
          }

          let x = (currentElements[0].x + currentElements[1].x) / 2
          let y = (currentElements[0].y + currentElements[1].y) / 2
          
          console.log(currentElements)
          console.log(x +':'+ y)
        }
    }
}
</script>
<style>

</style>