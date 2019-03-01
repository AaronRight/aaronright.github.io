<template>
  <g>
   <template v-if="type == 'terminal'">
      <rect  :x=x :y=y :width=width :height=height rx=5 ry=5 />
   </template> 
   <template v-else-if="type == 'process'">
      <rect :x=x :y=y :width=width :height=height />
   </template> 
   <template v-else-if="type == 'io'">
      <polygon :points="[  [x+15,y],
                           [x+15+width,y],
                           [x+width,y+height],
                           [x,y+height]  ].join(' ')"/> 
   </template> 
   <template v-else-if="type == 'decision'">
      <polygon :points="[  [x-15,y+height/2], 
                           [x+width/2,y], 
                           [x+width+15,y+height/2], 
                           [x+width/2,y+height]  ].join(' ')"/> 
   </template> 
   <template v-else>
      <rect :x=x :y=y :width=width :height=height rx=50 ry=50 /> 
   </template> 
   
   <foreignObject :x=x :y=y :width=width :height=height> 
      <div class="foreignObject_content">
         <slot></slot>
      </div> 
   </foreignObject> 
  </g> 

</template>

<script>
export default {
  props:[ 'type', 'x', 'y', 'width', 'height' ]
};
</script>

<style scoped>
.foreignObject_content{
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
} 
</style>