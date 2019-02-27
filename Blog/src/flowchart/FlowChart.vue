<template>
    <div>
        <svg :style="{height:'800px'}">
          <g>
            <element_ v-for="c in getElements()" :key="c.id" :type="c.type" 
          :x="c.x" :y="c.y" :width="c.width" :height="c.height" :text="c.text" ></element_>
            
            <edge_ v-for="c in getEdges()" :key="c.id" :type="c.type" :text="c.text" 
              :xy="getEdge(c)"></edge_>
          </g>
        </svg>
    </div>
</template>

<script>
  import data from '../store.json'
  import Element from './Element.vue'
  import Edge from './Edge.vue'

  export default {
    methods: {
      getElements: function(){
        return this.$store.getters.reference(1)['elements'];
      },
      getEdges: function(){
        return this.$store.getters.reference(1)['edges'];
      },
      getEdge: function(edge){
        let result = [];
        for( let element of edge['elements'] ){
          let current = this.$store.getters.flowchartElement(1,element['element'])
          if( element['side'] == 'top' ){
            result.push( current['x'] + current['width'] / 2 );
            result.push( current['y'] );
          }
          if( element['side'] == 'left' ){
            result.push( current['x']);
            result.push( current['y'] + current['height'] / 2 );
          }
          if( element['side'] == 'right' ){
            result.push( current['x'] + current['width'] );
            result.push( current['y'] + current['height'] / 2  );
          }
          if( element['side'] == 'bottom' ){
            result.push( current['x'] + current['width'] / 2 );
            result.push( current['y'] + current['height'] );
          }
        }
        return result;
      }
      
    },
    components: {
      'element_' : Element,
      'edge_': Edge
    }
  };
</script>

<style>
</style>