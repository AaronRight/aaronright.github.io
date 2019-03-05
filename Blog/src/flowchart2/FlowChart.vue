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
              <rect v-if="edge_mode" x=0 y=0 width=16 height=16 rx=5 ry=5 fill="none" stroke="red"/>  
              <rect x=1 y=4.5 width=3 height=3 rx=5 ry=5 fill="none" stroke="black"/>
              <rect x=12 y=9 width=3 height=3 rx=5 ry=5 fill="none" stroke="black"/>
              <line x1=3.4 y1=6.5 x2=12 y2=9.5 stroke="black"></line>
            </svg>
          </button>

          <button @click="click()">Click</button>
        </div>

        <div v-if="edit" id="property_panel">
          
        </div>

        <svg id="canvas" 
          @click="edit ? canvasmouseclick($event) : ''" 
          @contextmenu="edit ? canvasmouseclick($event) : ''"
          @mousemove="edit ? canvasmousemove($event) : ''" >
          <g>
            <template v-if="edit">
              <polyline :points="createRulePoints( 2000 )"
                style="fill:none;stroke:black;stroke-width:0.5" />
              <polyline :points="createRulePoints( 2000, false )"
                style="fill:none;stroke:black;stroke-width:0.5" />
            </template>

            <template v-if="grab">
              <polyline :points="createRayPoints()" style="fill:none; stroke:black; stroke-width:0.5; stroke-dasharray:5;" />
            </template>
<!-- Edges -->
            <template v-for="edge of flowchart.edges">
              <polyline points="1,1"></polyline>
            </template>

<!-- Elements -->
            <template v-for="element of flowchart.elements">
                <template v-if="element.type == 'terminal'">
                    <rect v-if="element.id == choosen_id" :key="element.id+'cho'"            
                      :x=(element.x-element.width/2-3) :y=(element.y-element.height/2-3) 
                      :width=(Number(element.width)+6) :height=(Number(element.height)+6) rx=5 ry=5 fill="none" stroke="red"  stroke-dasharray="5"
                    />
                    <rect  :id="element.id" :key="element.id"
                      @mousedown="edit ? mousedown($event) : ''" @mouseout="edit ? mouseup($event): ''"
                      @mouseup="edit ? mouseup($event) : ''" @mousemove="edit ? mousemove($event) : ''"
                      @click="edit ? mouseclick($event) : ''"
                      :x=(element.x-element.width/2) :y=(element.y-element.height/2) 
                      :width=element.width :height=element.height rx=5 ry=5 fill="white" stroke="black"
                    />
                </template>
                <template v-else-if="element.type == 'process'">
                  <rect v-if="element.id == choosen_id"  :key="element.id+'cho'"           
                      :x=(element.x-element.width/2-3) :y=(element.y-element.height/2-3) 
                      :width=(Number(element.width)+6) :height=(Number(element.height)+6) fill="none" stroke="red"  stroke-dasharray="5"
                    />
                    <rect  :id="element.id" :key="element.id"
                      @mousedown="mousedown($event)" @mouseout="mouseup($event)"
                      @mouseup="mouseup($event)" @mousemove="mousemove($event)"
                      @click="mouseclick($event)"
                      :x=(element.x-element.width/2) :y=(element.y-element.height/2) 
                      :width=element.width :height=element.height fill="white" stroke="black"
                    />
                </template>
                <template v-else-if="element.type == 'io'">
                  <polygon v-if="element.id == choosen_id" :key="element.id+'cho'"
                    :points="[  [Number(element.x)-Number(element.width)/2+15-3,Number(element.y)-Number(element.height)/2-3],
                      [Number(element.x)-Number(element.width)/2+15+Number(element.width)+3,Number(element.y)-Number(element.height)/2-3],
                      [Number(element.x)-Number(element.width)/2+Number(element.width)+3,Number(element.y)+Number(element.height)/2+3],
                      [Number(element.x)-Number(element.width)/2-3,Number(element.y)+Number(element.height)/2+3] ].join(' ')" fill="none" stroke="red"  stroke-dasharray="5"
                  /> 
                  <polygon 
                    :id="element.id" @click="mouseclick($event)" :key="element.id"
                      @mousedown="mousedown($event)" @mouseout="mouseup($event)"
                      @mouseup="mouseup($event)" @mousemove="mousemove($event)"
                    :points="[  [Number(element.x)-Number(element.width)/2+15,Number(element.y)-Number(element.height)/2],
                      [Number(element.x)-Number(element.width)/2+15+Number(element.width),Number(element.y)-Number(element.height)/2],
                      [Number(element.x)-Number(element.width)/2+Number(element.width),Number(element.y)+Number(element.height)/2],
                      [Number(element.x)-Number(element.width)/2,Number(element.y)+Number(element.height)/2] ].join(' ')" fill="white" stroke="black"
                  /> 
                </template> 
                <template v-else-if="element.type == 'decision'">
                  <polygon v-if="element.id == choosen_id" :key="element.id+'cho'"
                    :points="[  [Number(element.x)-Number(element.width)/2-15-4,Number(element.y)], 
                                        [Number(element.x),Number(element.y)-Number(element.height)/2-3], 
                                        [Number(element.x)+Number(element.width)/2+15+4,Number(element.y)], 
                                        [Number(element.x),Number(element.y)+Number(element.height)/2+3]  ].join(' ')"  fill="none" stroke="red"  stroke-dasharray="5"
                  />
                  <polygon 
                    :id="element.id" @click="mouseclick($event)" :key="element.id"
                      @mousedown="mousedown($event)" @mouseout="mouseup($event)"
                      @mouseup="mouseup($event)" @mousemove="mousemove($event)"
                    :points="[  [Number(element.x)-Number(element.width)/2-15,element.y], 
                                        [Number(element.x),Number(element.y)-Number(element.height)/2], 
                                        [Number(element.x)+Number(element.width)/2+15,element.y], 
                                        [Number(element.x),Number(element.y)+Number(element.height)/2]  ].join(' ')" fill="white" stroke="black"
                  /> 
                </template>
                <template v-else>
                  <rect v-if="element.id == choosen_id"   :key="element.id+'cho'"           
                      :x=(element.x-element.width/2-3) :y=(element.y-element.height/2-3) 
                      :width=(Number(element.width)+6) :height=(Number(element.height)+6) rx=50 ry=50 fill="none" stroke="red"  stroke-dasharray="5"
                    />
                    <rect  :id="element.id" :key="element.id"
                      @mousedown="mousedown($event)" @mouseout="mouseup($event)"
                      @mouseup="mouseup($event)" @mousemove="mousemove($event)"
                      @click="mouseclick($event)"
                      :x=(element.x-element.width/2) :y=(element.y-element.height/2) 
                      :width=element.width :height=element.height rx=50 ry=50 fill="white" stroke="black"
                    /> 
                </template>
            </template>
          </g>
        </svg>
    </div>
</template>

<script>
  export default {
    props: {
      width: { type: Number, default: 480 },
      height: { type: Number, default: 480 },
      edit: { type: Boolean, default: true }
    },
    data() {
      return {
        flowchart: { elements:[], edges:[] },
        types: ['terminal', 'process','io', 'decision', 'default'],
        grab: false,
        choosen_coords: [0,0],
        choosen_id: 0,
        edge_mode: false
      };
    },methods: {
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
          result.push([0,this.choosen_coords[1]])
          result.push([this.choosen_coords[0],this.choosen_coords[1]])
          result.push([this.choosen_coords[0],0])
          return result.join(' ')
        },
        createElement(type){
            let result = {};
            result.id = "n" + Math.floor(Math.random() * 1000);
            result.type = type;
            result.text = "default";
            result.x = result.y = result.width = result.height = "50";
            this.flowchart.elements.push(result);
        },
        createEdge(type){
            if(this.edge_mode) this.edge_mode = false;
            else this.edge_mode = true;
        },
        click(){
          console.log(this.flowchart);
        },
        updatePropertiesInfo(e){
          let info_panel = document.getElementById('property_panel');
          info_panel.innerHTML = [e.screenX, e.screenY]

        },
        canvasmouseclick(e){ 
          e.preventDefault();
          console.log(e);
        },
        canvasmousemove (e) {
          //console.log(e);
        },
        mouseclick (e){ 
          this.choosen_coords = [0, 0];
          this.choosen_id = e.target.id;
          this.updatePropertiesInfo(e);
          e.stopPropagation();
        },
        mousedown (e){ 
          this.grab = true;
        }, 
        mouseup (e) { 
          this.grab = false; 
        },
        mousemove (e) {
          if(this.grab){
              let pt = e.target.parentElement.parentElement.createSVGPoint();
              pt.x = e.pageX;  pt.y = e.pageY;
              pt = pt.matrixTransform(e.target.getScreenCTM().inverse());
              
              this.choosen_coords = [pt.x, pt.y];

              for(let element of this.flowchart.elements){
                if( element.id == e.target.id ){
                    element.x = pt.x;
                    element.y = pt.y;
                }
              }
          }
          e.stopPropagation();
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
  width: 640px;
  height: 480px;
}
</style>