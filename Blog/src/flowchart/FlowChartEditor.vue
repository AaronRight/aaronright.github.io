<template>
    <div>
        <svg :style="{ height:'800px' }">
          <g>
            <polyline :points="createRulePoints( 400 )"
                style="fill:none;stroke:black;stroke-width:0.5" />
            <polyline :points="createRulePoints( 400, false )"
                style="fill:none;stroke:black;stroke-width:0.5" />

            <element_ v-draggable :type="50" :x="50" :y="50" :width="50" :height="50">
              {{50}}
            </element_>
            <element_ v-draggable :type="50" :x="100" :y="100" :width="50" :height="50">
              {{100}}
            </element_>
          </g>
        </svg>
    </div>
</template>

<script>
  import Element from './Element.vue'
  import Edge from './Edge.vue'

  export default {
    methods: {
        createRulePoints(length, is_horizontal = true, step = 5, size_small = 2, size_big = 4){
            let result = [];
            for( let i = 0; i < length; i+= step){
                if(is_horizontal){
                    result.push( [ i, 0 ] );
                    result.push( [ i, ( i % (step * 2) == 0 ) ? size_big : size_small ] );
                    result.push( [ i, 0 ] );
                }else{
                    result.push( [ 0, i ] );
                    result.push( [  ( i % (step * 2) == 0 ) ?  size_big : size_small , i ] );
                    result.push( [ 0, i ] );
                }
            }
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