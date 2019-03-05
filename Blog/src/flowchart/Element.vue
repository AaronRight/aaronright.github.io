<template>
    <svg @click="mouseclick($event)" 
        @mousedown="mousedown($event)" @mouseout="mouseup($event)"
        @mouseup="mouseup($event)" @mousemove="mousemove($event)">

        <template v-if="node.type == 'terminal'">
            <rect v-if="selected" class="selection"           
                :x=(node.x-node.width/2-3) :y=(node.y-node.height/2-3) 
                :width=(Number(node.width)+6) :height=(Number(node.height)+6) rx=5 ry=5
            />
            <rect  class="main"
                :x=(node.x-node.width/2) :y=(node.y-node.height/2) 
                :width=node.width :height=node.height rx=5 ry=5 
            />
        </template>
        <template v-else-if="node.type == 'process'">
            <rect v-if="selected" class="selection"             
                :x=(node.x-node.width/2-3) :y=(node.y-node.height/2-3) 
                :width=(Number(node.width)+6) :height=(Number(node.height)+6)
            />
            <rect class="main"  
                :x=(node.x-node.width/2) :y=(node.y-node.height/2) 
                :width=node.width :height=node.height
            />
        </template>
        <template v-else-if="node.type == 'io'">
            <polygon v-if="selected" class="selection"  
                :points="[  [Number(node.x)-Number(node.width)/2+15-3,Number(node.y)-Number(node.height)/2-3],
                    [Number(node.x)-Number(node.width)/2+15+Number(node.width)+3,Number(node.y)-Number(node.height)/2-3],
                    [Number(node.x)-Number(node.width)/2+Number(node.width)+3,Number(node.y)+Number(node.height)/2+3],
                    [Number(node.x)-Number(node.width)/2-3,Number(node.y)+Number(node.height)/2+3] ].join(' ')" 
            /> 
            <polygon class="main"
                :points="[  [Number(node.x)-Number(node.width)/2+15,Number(node.y)-Number(node.height)/2],
                    [Number(node.x)-Number(node.width)/2+15+Number(node.width),Number(node.y)-Number(node.height)/2],
                    [Number(node.x)-Number(node.width)/2+Number(node.width),Number(node.y)+Number(node.height)/2],
                    [Number(node.x)-Number(node.width)/2,Number(node.y)+Number(node.height)/2] ].join(' ')" 
            /> 
        </template> 
        <template v-else-if="node.type == 'decision'">
            <polygon v-if="selected" class="selection"  
                :points="[  [Number(node.x)-Number(node.width)/2-15-4,Number(node.y)], 
                    [Number(node.x),Number(node.y)-Number(node.height)/2-3], 
                    [Number(node.x)+Number(node.width)/2+15+4,Number(node.y)], 
                    [Number(node.x),Number(node.y)+Number(node.height)/2+3] ].join(' ')"
            />
            <polygon class="main"
                :points="[  [Number(node.x)-Number(node.width)/2-15,node.y], 
                    [Number(node.x),Number(node.y)-Number(node.height)/2], 
                    [Number(node.x)+Number(node.width)/2+15,node.y], 
                    [Number(node.x),Number(node.y)+Number(node.height)/2] ].join(' ')" 
            /> 
        </template>
        <template v-else>
            <rect v-if="selected" class="selection"         
                :x=(node.x-node.width/2-3) :y=(node.y-node.height/2-3) 
                :width=(Number(node.width)+6) :height=(Number(node.height)+6) rx=50 ry=50 
            />
            <rect class="main"
                :x=(node.x-node.width/2) :y=(node.y-node.height/2) 
                :width=node.width :height=node.height rx=50 ry=50 
            /> 
        </template>
    </svg>
</template>
<script>
export default {
    props: ['node', 'canvas', 'selected', 'params'],
    data() {
      return {
        
      };
    },
    methods:{
        mouseclick (e){ 
          this.params.choosen_coords = [0, 0];
          this.params.choosen_id = this.node.id;
          //this.updatePropertiesInfo(e);
          e.stopPropagation();
        },
        mousedown (e){ 
            this.params.grab = true;
        }, 
        mouseup (e) { 
            this.params.grab = false; 
        },
        mousemove (e) {
            if(this.params.grab){
                let pt = canvas.createSVGPoint();
                pt.x = e.pageX;  pt.y = e.pageY;
                pt = pt.matrixTransform(e.target.getScreenCTM().inverse());
                
                this.params.choosen_coords = [pt.x, pt.y];

                this.node.x = pt.x;
                this.node.y = pt.y;
            }
            e.stopPropagation();
        }
    }
}
</script>
<style>
.selection{
    fill:none;
    stroke:red;
    stroke-dasharray:5;
}
.main{
    fill:white;
    stroke:black;
}
</style>
