<template>
  <g>
   <template v-if="type == 'terminal'">
      <rect  :x=x :y=y :width=width :height=height rx=5 ry=5 />
   </template> 
   <template v-else-if="type == 'process'">
      <rect :x=x :y=y :width=width :height=height />
   </template> 
   <template v-else-if="type == 'io'">
      <polygon :points="points(x+15,y, x+15+width,y, x+width,y+height, x,y+height)"/> 
   </template> 
   <template v-else-if="type == 'decision'">
      <polygon :points="points(x-15,y+height/2, x+width/2,y, x+width+15,y+height/2, x+width/2,y+height)"/> 
   </template> 
   <template v-else>
      <rect :x=x :y=y :width=width :height=height rx=50 ry=50 /> 
   </template> 
   
   <foreignObject :x=x+10 :y=y+10 :width=width :height=height> 
      <div>{{ text }}</div> 
   </foreignObject> 
  </g> 

</template>

<script>
export default {
  props:[ 'type', 'text', 'x', 'y', 'width', 'height' ],
  methods:{
      points(...args){
          return args.reduce(function(result, value, index, array) {
            if (index % 2 === 0)
              result.push(array.slice(index, index + 2));
            return result;
          }, []).join(' ')
      }
  }
};
</script>

<style scoped> 
</style>