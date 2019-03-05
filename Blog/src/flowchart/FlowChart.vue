<template>
    <div>
        <div v-if="edit" class="button_panel"> 
          <button @click="createElement('terminal')">
            <svg> <rect x=1 y=1 width=14 height=14 rx=3 ry=3 fill="none" stroke="black"/> </svg>
          </button>
          <button @click="createElement('process')">
            <svg> <rect x=1 y=1 width=14 height=14 fill="none" stroke="black"/> </svg>
          </button>
          <button @click="createElement('io')">
            <svg> <polygon points="5,3 15,3 11,13 1,13" fill="none" stroke="black"/> </svg>
          </button>
          <button @click="createElement('decision')">
            <svg> <polygon points="8,1 15,8 8,15 1,8" fill="none" stroke="black"/> </svg>
          </button>
          <button @click="createElement('default')">
            <svg> <rect x=1 y=1 width=14 height=14 rx=7 ry=7 fill="none" stroke="black"/> </svg>
          </button>
          <button @click="createEdge('edge')">
            <svg> 
              <rect v-if="edge_params.mode" x=0 y=0 width=16 height=16 rx=5 ry=5 fill="none" stroke="red"/>  
              <rect x=1 y=4.5 width=3 height=3 rx=5 ry=5 fill="none" stroke="black"/>
              <rect x=12 y=9 width=3 height=3 rx=5 ry=5 fill="none" stroke="black"/>
              <line x1=3.4 y1=6.5 x2=12 y2=9.5 stroke="black"></line>
            </svg>
          </button>
          <button @click="click()">Click</button>
        </div>

        <div v-if="edit" id="property_panel"></div>
        <svg id="canvas" ref="canvas"
          @click="edit ? canvasmouseclick($event) : ''" 
          @contextmenu="edit ? canvasmouseclick($event) : ''"
          @mousemove="edit ? canvasmousemove($event) : ''"
        >
          <g>
            <template v-if="edit">  
              <polyline :points="createRulePoints( 2000 )"
                style="fill:none;stroke:black;stroke-width:0.5" />
              <polyline :points="createRulePoints( 2000, false )"
                style="fill:none;stroke:black;stroke-width:0.5" />
            </template>

            <template v-if="params.grab">
              <polyline :points="createRayPoints()" style="fill:none; stroke:black; stroke-width:0.5; stroke-dasharray:5;" />
            </template>

            <edge v-for="edge of flowchart.edges" :key="edge.id" :edge="edge" :flowchart="flowchart"></edge>

            <node v-for="node of flowchart.elements" :key="node.id" :node="node" :canvas="$refs.canvas" 
              :selected="params.choosen_id==node.id" :params="params"></node>

              <!-- Pointer -->
            <rect :x="Number(edge_params.pointer_x)-5" :y="Number(edge_params.pointer_y)-5" width=10 height=10 rx=5 ry=5 fill="white" stroke="black" stroke-dasharray="3" />
            <line v-if="edge_params.current_element!= null" :x1=edge_params.current_element.x :y1=edge_params.current_element.y 
              :x2="Number(edge_params.pointer_x)" :y2="Number(edge_params.pointer_y)" stroke="black" stroke-dasharray="3"></line>
          </g>
        </svg>
    </div>
</template>

<script>
import Node from './Element.vue';
import Edge from './Edge.vue';
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
          choosen_id: 0
        },
        edge_params:{
          mode: false,
          pointer_x : -100,
          pointer_y : -100,
          current_element: null
        }
         
      };
    },
    components:{
      'node' : Node,
      'edge' : Edge
    },
    methods: {
        createElement(type, x=50, y=50){
            let result = {};
            result.id = "n" + Math.floor(Math.random() * 1000);
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
        createRayPoints(){
          let result = [];
          result.push([0,this.params.choosen_coords[1]])
          result.push([this.params.choosen_coords[0],this.params.choosen_coords[1]])
          result.push([this.params.choosen_coords[0],0])
          return result.join(' ')
        },
        click(){
          console.log(this.flowchart);
        },
        canvasmouseclick(e){ 
          e.preventDefault();
          if(e.button == 0) /* left click to create new line or its first point */
            if(this.edge_params.current_element == null){
              this.edge_params.current_element = this.createElement('default', this.edge_params.pointer_x, this.edge_params.pointer_y);
            } else {
              let result = {}
              result.id = "e" + Math.floor(Math.random() * 1000);
              result.text = "default";
              result.elements = [];
              result.elements.push( this.edge_params.current_element.id );
              this.edge_params.current_element = this.createElement('default', this.edge_params.pointer_x, this.edge_params.pointer_y);
              result.elements.push( this.edge_params.current_element.id );
              this.flowchart.edges.push(result);
            }
          else /* right click to prevent creation of new line*/
            this.edge_params.current_element = null;
        },
        canvasmousemove (e) {
          if(!this.edge_params.mode) return;

          let pt =  document.getElementById('canvas').createSVGPoint();
          pt.x = e.pageX;  pt.y = e.pageY;
          pt = pt.matrixTransform(e.target.getScreenCTM().inverse());
          
          this.edge_params.pointer_x = pt.x
          this.edge_params.pointer_y = pt.y
        }
    }
}
</script>

<style>
button svg {
  width: 16px;
  height: 16px;
}
#property_panel{
  width: 150px;
  float: left;
  border:1px solid white;
}
#canvas{
  border: 1px solid black;
  width: 640px;
  height: 480px;
}
</style>