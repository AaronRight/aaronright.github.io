<template>
    <button :class="size=='normal' ? '' : 'big'"  @click="action">
        <svg viewBox="0 0 16 16"> 
              <template v-if="icon == 'terminal'">
                  <rect x=2 y=2 width=12 height=12 rx=2.5 ry=2.5 ></rect>
              </template>
              <template v-else-if="icon == 'process'">
                  <rect x=2 y=2 width=12 height=12 ></rect>
              </template>
              <template v-else-if="icon == 'io'">
                  <polygon points="5,3 15,3 11,13 1,13"/>
              </template>
              <template v-else-if="icon == 'decision'">
                  <polygon points="8,1 15,8 8,15 1,8"/>
              </template>
              <template v-else-if="icon == 'edge'">
                  <circle cx=4 cy=6 r=1.5 stroke-width="0.5"></circle>
                  <circle cx=12 cy=10 r=1.5 stroke-width="0.5"></circle>
                  <line x1=5.5 y1=6.7 x2=10.5 y2=9.3 stroke-width="0.5"></line>
              </template>
              <template v-else>
                  <rect x=1 y=1 width=14 height=14 rx=7 ry=7 ></rect>
              </template>

              <template v-if="checked">
                  <circle v-if="signal == 'point'" cx=3 cy=3 r=2 stroke="red" fill="red"></circle>  
                  <rect v-else x=1 y=1 width=14 height=14 rx=3 ry=3 stroke="red" stroke-width="0.5"></rect>
              </template>
        </svg>
    </button>
</template>
<script>
export default {
    props: {
        signal: { type: String, default: 'point' },
        checked: { type: Boolean, default: false },
        icon: { type: String, default: 'default' },
        action: { type: Function },
        size: { type: String, default: 'normal' }
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
        width: 30px;
        height: 30px;
        padding: 2px;
        float: left;
    }
    .big{
        width: 60px;
        height: 60px;
    }
</style>

