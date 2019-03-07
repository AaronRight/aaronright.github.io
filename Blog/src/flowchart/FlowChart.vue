<template>
    <div>
        <div v-if="edit" id="edit_panel">
          <div> 
            <u-button class="main_button" icon="edge" size='big' :action="function(){ return edgeMode(); }" signal="square" :checked="edge_params.mode"></u-button>
            <u-button v-for="type of types" :key="type+'_button'" :icon="type" :action="function(){ return setType(type); }" :checked="edge_params.type == type"></u-button>
          </div>

          <button @click="print()">print</button>

          <template v-if="params.choosen!=null">
            <node-properties v-if="params.choosen.type!='edge'" :node="params.choosen" :types="types"></node-properties>
            <edge-properties v-else :edge="params.choosen" :flowchart="flowchart"></edge-properties>
          </template>
        </div>
        
        <svg id="canvas" ref="canvas"
          @click="edit ? canvasmouseclick($event) : ''" 
          @contextmenu="edit ? canvasmouseclick($event) : ''"
          @mousemove="edit ? canvasmousemove($event) : ''"
          @mouseup="edit ? canvasmouseup($event) : ''"
        >
          <g>
            <rule v-if="edit" :grab="params.grab" :mouse="params.mouse" />

            <edge v-for="edge of flowchart.edges" :key="edge.id" :edge="edge" :flowchart="flowchart" :params="params" :edit="edit"></edge>

            <node v-for="node of flowchart.elements" :key="node.id" :node="node" :canvas="$refs.canvas" 
              :selected="params.choosen == null ? false : params.choosen.id==node.id" :params="params" :edge_params="edge_params" :edit="edit"></node>

            <!-- Pointer -->
            <template v-if="edge_params.mode">
              <node :manual="true" :node_params="{  x : params.mouse.x, y: params.mouse.y, width: 25, height: 25, type: edge_params.type }"></node>
              <line v-if="edge_params.current_element!= null" :x1=edge_params.current_element.x :y1=edge_params.current_element.y 
                :x2="Number(params.mouse.x)" :y2="Number(params.mouse.y)" stroke="black" stroke-dasharray="3"></line>
            </template>
          </g>
        </svg>
    </div>
</template>

<script>
import uButton from './utility/Button.vue';
import Rule from './utility/Rule.vue';
import Node from './node/Node.vue';
import Edge from './edge/Edge.vue';
import NodeProperties from './node/Node_Properties.vue';
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
          choosen: null,
          mouse: { x : 0, y : 0 }
        },
        edge_params:{
          type: 'default',
          mode: false,
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
       edgeMode(){
          if(this.edge_params.mode) {
              this.edge_params.mode = false;
              this.edge_params.current_element = null;
          }
          else this.edge_params.mode = true;
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
        createEdge(){
            let result = {}
            result.id = "e" + Math.floor(Math.random() * 10000);
            result.text = "default";
            result.type = 'edge';
            result.elements = [];
            result.elements.push( this.edge_params.current_element.id );
            this.edge_params.current_element = this.createElement(this.edge_params.type, this.params.mouse.x, this.params.mouse.y);
            result.elements.push( this.edge_params.current_element.id );
            this.flowchart.edges.push(result);
        },
        print(){
          console.log(this.flowchart);
        },
        canvasmouseclick(e){ 
          e.preventDefault();
          if(e.button == 0 && this.edge_params.mode) /* left click to create new line or its first point */
            if(this.edge_params.current_element == null){
              this.edge_params.current_element = this.createElement(this.edge_params.type, this.params.mouse.x, this.params.mouse.y);
            } else {
              this.createEdge();
            }
          else /* right click to prevent creation of new line*/
            this.edge_params.current_element = null;
        },
        canvasmousemove (e) {
          let pt =  this.$refs.canvas.createSVGPoint();
          pt.x = e.pageX;  pt.y = e.pageY;
          pt = pt.matrixTransform(e.target.getScreenCTM().inverse());
          
          this.params.mouse = { x: pt.x, y: pt.y }
          if(this.params.grab){
                this.params.choosen.x = this.params.mouse.x;
                this.params.choosen.y = this.params.mouse.y;
          }
        },
        canvasmouseup (e) {
          this.params.grab = false;
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