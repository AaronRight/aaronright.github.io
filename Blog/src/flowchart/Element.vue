<template>
  <g>
   
      <template v-if="type == 'terminal'">
         <rect  :x=(x-width/2) :y=(y-height/2) :width=width :height=height rx=5 ry=5 fill="white"/>
      </template> 
      <template v-else-if="type == 'process'">
         <rect :x=(x-width/2) :y=(y-height/2) :width=width :height=height fill="white"/>
      </template> 
      <template v-else-if="type == 'io'">
         <polygon :points="[  [x-width/2+15,y-height/2],
                              [x-width/2+15+width,y-height/2],
                              [x-width/2+width,y+height/2],
                              [x-width/2,y+height/2]  ].join(' ')" fill="white"/> 
      </template> 
      <template v-else-if="type == 'decision'">
         <polygon :points="[  [x-width/2-15,y], 
                              [x,y-height/2], 
                              [x+width/2+15,y], 
                              [x,y+height/2]  ].join(' ')" fill="white"/> 
      </template> 
      <template v-else>
         <rect :x=(x-width/2) :y=(y-height/2) :width=width :height=height rx=50 ry=50 fill="white" /> 
      </template>

      <foreignObject :x=(x-width/2) :y=(y-height/2) :width=width :height=height> 
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
   user-select: none;
} 

</style>