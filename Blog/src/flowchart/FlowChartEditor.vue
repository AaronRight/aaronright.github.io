<template>
    <div class="flowchart_editor">
        <div class="button_panel"> 
          <button v-for="type of types" v-bind:key="type" @click="createElement(type)">{{type}}</button>
          <div class="property_panel">
              
          </div>
        </div>
        <svg>
          <g>
            <polyline :points="createRulePoints( 1000 )"
                style="fill:none;stroke:black;stroke-width:0.5" />
            <polyline :points="createRulePoints( 1000, false )"
                style="fill:none;stroke:black;stroke-width:0.5" />

            <element_ v-for="element in flowchart.elements" 
              v-bind:key="element.id" :id="element.id" v-draggable
              :type="element.type" :x="50" :y="50" :width="50" :height="50">
              {{element.text}}
            </element_>
          </g>
        </svg>
    </div>
</template>

<script>
  import Element from './Element.vue'
  import Edge from './Edge.vue'

  export default {
    data() {
      return {
        types: ['terminal', 'process','io', 'decision', 'default'],
        flowchart: { elements:[], edges:[] }
      };
    },
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
        },
        createElement(type){
            let result = {};
            result.id = "n" + Math.floor(Math.random() * 1000);
            result.type = type;
            result.text = "default";
            result.x = result.y = result.width = result.height = "50";
            this.flowchart.elements.push(result);
        }
    },
    components: {
      'element_' : Element,
      'edge_': Edge
    }
  };
</script>

<style scoped>
  .flowchart_editor{
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: row;
  }
  .button_panel{
    border: 1px solid black;
    width: 190px;
    display: flex;
    justify-content: space-around;
    align-content:flex-start;
    flex-wrap: wrap;
  }
  .property_panel{
    border: 1px solid black;
    width: 100%;
    flex-grow: 2;
  }
  svg{
    border: 1px solid black;
    flex-grow: 1;
    margin: 1px;
  }
  button{
    width: 50px;
    height: 50px;
    margin: 5px;;
  }
  
</style>