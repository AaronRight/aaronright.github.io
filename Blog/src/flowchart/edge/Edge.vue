<template>
    <svg @click=" edit ? mouseclick($event) : ''">
        <polyline :points="createEdgePoints(edge)" stroke="black" stroke-width="3"></polyline>
    </svg>
</template>
<script>
export default {
    props: ['edge', 'flowchart', 'edit', 'params'],
    data() {
      return {
        
      };
    },
    methods:{
        createEdgePoints: function(edge){
          let result = [];
          let currentElements = [ {}, {} ];

          for ( let element of this.flowchart.elements ){
            if (  element.id == edge['elements'][0] )
              currentElements[0] = element;
            if (  element.id == edge['elements'][1] )
              currentElements[1] = element;
          }
          
          result.push( [ currentElements[0]['x'], currentElements[0]['y'] ]);
          result = result.concat(edge.points);
          result.push( [ currentElements[1]['x'],  currentElements[1]['y'] ]);
          
          return result.join(' ');
        },
        mouseclick (e){ 
          this.params.choosen = this.edge;
          e.stopPropagation();
        },
    }
}
</script>
<style>

</style>
