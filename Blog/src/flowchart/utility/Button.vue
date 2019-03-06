<template>
    <button @click="action">
        <svg viewBox="0 0 16 16"> 
              <template v-if="checked">
                  <circle v-if="signal == 'point'" cx=0 cy=0 r=3 stroke="red" fill="red"></circle>  
                  <rect v-else x=0 y=0 width=16 height=16 rx=5 ry=5 stroke="red"></rect>
              </template>
              
              <template v-if="icon == 'terminal'">
                  <rect x=1 y=1 width=14 height=14 rx=3 ry=3 ></rect>
              </template>
              <template v-else-if="icon == 'process'">
                  <rect x=1 y=1 width=14 height=14 ></rect>
              </template>
              <template v-else-if="icon == 'io'">
                  <polygon points="5,3 15,3 11,13 1,13"/>
              </template>
              <template v-else-if="icon == 'decision'">
                  <polygon points="8,1 15,8 8,15 1,8"/>
              </template>
              <template v-else-if="icon == 'edge'">
                  <rect x=1 y=4.5 width=3 height=3 rx=5 ry=5></rect>
                  <rect x=12 y=9 width=3 height=3 rx=5 ry=5></rect>
                  <line x1=3.4 y1=6.5 x2=12 y2=9.5 ></line>
              </template>
              <template v-else>
                  <rect x=1 y=1 width=14 height=14 rx=7 ry=7 ></rect>
              </template>
        </svg>
    </button>
</template>
<script>
export default {
    props: {
        signal: { type: String, default: 'point' },
        checked: { type: Boolean, default: true },
        icon: { type: String, default: 'default' },
        action: { type: Function }
    }
}
</script>
<style scoped>
    svg{
        width: 100%;
        height: 100%;
        fill:none;
        stroke:black
    }
    button{
        width: 20px;
        height: 20px;
    }
</style>

