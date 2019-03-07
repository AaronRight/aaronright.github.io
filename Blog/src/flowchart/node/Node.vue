<template>
    <svg @click=" edit ? mouseclick($event) : ''" 
        @mousedown=" edit ? mousedown($event) : ''" @mouseout=" edit ? mouseup($event): ''"
        @mouseup=" edit ? mouseup($event): ''" @mousemove=" edit ? mousemove($event) : ''"
        :class="manual ? 'selection' : ''"
        >
        <template v-if="ntype() == 'terminal'">
            <rect v-if="selected" class="selection"  :x=(nx()-nw()/2-3) :y=(ny()-nh()/2-3)  :width=(nw()+6) :height=(nh()+6) rx=5 ry=5 />
            <rect  class="main" :x=(nx()-nw()/2) :y=(ny()-nh()/2)  :width=nw() :height=nh() rx=5 ry=5  />
        </template>
        <template v-else-if="ntype() == 'process'">
            <rect v-if="selected" class="selection"  :x=(nx()-nw()/2-3) :y=(ny()-nh()/2-3)  :width=(nw()+6) :height=(nh()+6) />
            <rect class="main" :x=(nx()-nw()/2) :y=(ny()-nh()/2) :width=nw() :height=nh() />
        </template>
        <template v-else-if="ntype() == 'io'">
            <polygon v-if="selected" class="selection"  
                :points="[  [nx()-nw()/2+15-3 , ny()-nh()/2-3],
                    [nx()-nw()/2+15+nw()+3 , ny()-nh()/2-3],
                    [nx()-nw()/2+nw()+3 , ny()+nh()/2+3],
                    [nx()-nw()/2-3 , ny()+nh()/2+3] ].join(' ')" 
            /> 
            <polygon class="main"
                :points="[  [nx()-nw()/2+15 , ny()-nh()/2],
                    [nx()-nw()/2+15+nw() , ny()-nh()/2],
                    [nx()-nw()/2+nw() , ny()+nh()/2],
                    [nx()-nw()/2 , ny()+nh()/2] ].join(' ')" 
            /> 
        </template> 
        <template v-else-if="ntype() == 'decision'">
            <polygon v-if="selected" class="selection"  
                :points="[  [nx()-nw()/2-15-4,ny()], 
                    [nx(),ny()-nh()/2-3], 
                    [nx()+nw()/2+15+4,ny()], 
                    [nx(),ny()+nh()/2+3] ].join(' ')"
            />
            <polygon class="main"
                :points="[  [nx()-nw()/2-15,ny()], 
                    [nx(),ny()-nh()/2], 
                    [nx()+nw()/2+15,ny()], 
                    [nx(),ny()+nh()/2] ].join(' ')" 
            /> 
        </template>
        <template v-else>
            <rect v-if="selected" class="selection" :x=(nx()-nw()/2-3) :y=(ny()-nh()/2-3)  :width=(nw()+6) :height=(nh()+6) rx=50 ry=50  />
            <rect class="main" :x=(nx()-nw()/2) :y=(ny()-nh()/2)  :width=nw() :height=nh() rx=50 ry=50  /> 
        </template>
    </svg>
</template>
<script>
export default {
    props: {
        node: { type: Object, default: null },
        canvas: { type: SVGSVGElement, default: null },
        selected: { type: Boolean, default: false },
        params: { type: Object, default: null },
        edit: { type: Boolean, default: false },
        /* manual params */
        manual: { type: Boolean, default: false },
        node_params: { type: Object, default: null }
    },
    methods:{
        nw(){ if(this.manual)  return Number(this.node_params.width); else return Number(this.node.width); },
        nh(){ if(this.manual) return Number(this.node_params.height); else return Number(this.node.height); },
        nx(){ if(this.manual) return Number(this.node_params.x); else return Number(this.node.x); },
        ny(){ if(this.manual) return Number(this.node_params.y); else return Number(this.node.y); },
        ntype(){ if(this.manual) return this.node_params.type; else return this.node.type; },

        mouseclick (e){ 
          this.params.choosen_coords = [0, 0];
          this.params.choosen_id = this.node.id;
          this.params.choosen = this.node;
          //this.updatePropertiesInfo(e);
          e.stopPropagation();
        },
        mousedown (e){ this.params.grab = true; }, 
        mouseup (e) {  this.params.grab = false; },
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
