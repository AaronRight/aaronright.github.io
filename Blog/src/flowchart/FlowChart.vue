<template>
    <div>
        <svg :style="{height:'800px'}">
          <g>
            <edge_ v-for="c in getEdges()" :key="c.id" :type="c.type" :text="c.text" 
              :xy="getEdge(c)"></edge_>

            <element_ v-for="c in getElements()" :key="c.id" :type="c.type" 
          :x="c.x" :y="c.y" :width="c.width" :height="c.height">
              {{c.text}}
            </element_>
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
        
        let current = this.$store.getters.flowchartElement(1,edge['elements'][0])
        result.push( [ current['x'],  current['y'] ]);

        result = result.concat(edge.points);

        current = this.$store.getters.flowchartElement(1,edge['elements'][1])
        result.push( [ current['x'],  current['y'] ]);

        return result.join(' ');
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