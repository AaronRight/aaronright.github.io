<template>
    <div>
        <div v-if="edit" id="edit_panel">
          <div> 
            <u-button class="main_button" icon="edge" size='big' :action="function(){ return createEdge('edge'); }" signal="square" :checked="edge_params.mode"></u-button>
            <u-button v-for="type of types" :key="type+'_button'" :icon="type" :action="function(){ return setType(type); }" :checked="edge_params.type == type"></u-button>
          </div>

          <button @click="click()">Click</button>

          <template v-if="params.choosen!=null">
            <node-properties v-if="params.choosen_type=='node'" :node="params.choosen" :types="types"></node-properties>
            <edge-properties v-else :edge="params.choosen"></edge-properties>
          </template>
        </div>
        
        <svg id="canvas" ref="canvas"
          @click="edit ? canvasmouseclick($event) : ''" 
          @contextmenu="edit ? canvasmouseclick($event) : ''"
          @mousemove="edit ? canvasmousemove($event) : ''"
        >
          <g>
            <rule v-if="edit" :grab="params.grab" :choosen_coords="params.choosen_coords" />

            <edge v-for="edge of flowchart.edges" :key="edge.id" :edge="edge" :flowchart="flowchart" :params="params" :edit="edit"></edge>

            <node v-for="node of flowchart.elements" :key="node.id" :node="node" :canvas="$refs.canvas" 
              :selected="params.choosen == null ? false : params.choosen.id==node.id" :params="params" :edit="edit"></node>

            <!-- Pointer -->
            <node :manual="true" :node_params="{  x : edge_params.pointer_x, y: edge_params.pointer_y, width: 25, height: 25, type: edge_params.type }"></node>
            <line v-if="edge_params.current_element!= null" :x1=edge_params.current_element.x :y1=edge_params.current_element.y 
              :x2="Number(edge_params.pointer_x)" :y2="Number(edge_params.pointer_y)" stroke="black" stroke-dasharray="3"></line>
          </g>
        </svg>
    </div>
</template>

<script>
import uButton from './utility/Button.vue';
import Rule from './utility/Rule.vue';
import Node from './node/Node.vue';
import NodeProperties from './node/Node_Properties.vue';
import Edge from './edge/Edge.vue';
import EdgeProperties from './edge/Edge_Properties.vue';

  export default {
    props: {
      width: { type: Number, default: 480 },
      height: { type: Number, default: 480 },
      edit: { type: Boolean, default: true },
    },
    data() {
      return {
        types: ['terminal', 'process','io', 'decision', 'default'],
        flowchart: { elements:[], edges:[] },
        params: {
          grab: false,
          choosen_coords:[0,0],
          choosen: null,
          choosen_type: 'node'
        },
        edge_params:{
          type: 'default',
          mode: false,
          pointer_x : -100,
          pointer_y : -100,
          current_element: null
        }
         
      };
    },
    components:{
      'node' : Node,
      'edge' : Edge,
      'node-properties' : NodeProperties,
      'edge-properties' : EdgeProperties,
      'u-button' : uButton,
      'rule' : Rule
    },
    methods: {
       setType(type){
            this.edge_params.type = type;
       },
        createElement(type, x=50, y=50){
            let result = {};
            result.id = "n" + Math.floor(Math.random() * 10000);
            result.type = type;
            result.text = "default";
            result.x = x;
            result.y = y;
            result.width = result.height = "25";
            this.flowchart.elements.push(result);
            return result;
        },
        createEdge(type){
            if(this.edge_params.mode) {
              this.edge_params.mode = false;
              /* hide pointer */
              this.edge_params.pointer_x = -100;
              this.edge_params.pointer_y = -100;
              this.edge_params.current_element = null;
            }
            else this.edge_params.mode = true;
        },
        click(){
          console.log(this.flowchart);
        },
        canvasmouseclick(e){ 
          e.preventDefault();
          if(e.button == 0) /* left click to create new line or its first point */
            if(this.edge_params.current_element == null){
              this.edge_params.current_element = this.createElement(this.edge_params.type, this.edge_params.pointer_x, this.edge_params.pointer_y);
            } else {
              let result = {}
              result.id = "e" + Math.floor(Math.random() * 10000);
              result.text = "default";
              result.elements = [];
              result.elements.push( this.edge_params.current_element.id );
              this.edge_params.current_element = this.createElement(this.edge_params.type, this.edge_params.pointer_x, this.edge_params.pointer_y);
              result.elements.push( this.edge_params.current_element.id );
              this.flowchart.edges.push(result);
            }
          else /* right click to prevent creation of new line*/
            this.edge_params.current_element = null;
        },
        canvasmousemove (e) {
          if(!this.edge_params.mode) return;

          let pt =  $refs.canvas.createSVGPoint();
          pt.x = e.pageX;  pt.y = e.pageY;
          pt = pt.matrixTransform(e.target.getScreenCTM().inverse());
          
          this.edge_params.pointer_x = pt.x
          this.edge_params.pointer_y = pt.y
        }
    }
}
</script>

<style>
#edit_panel{
  width: 150px;
  border:1px solid white;
  float: left;
}

#canvas{
  border: 1px solid black;
  width: 640px;
  height: 480px;
}

</style>