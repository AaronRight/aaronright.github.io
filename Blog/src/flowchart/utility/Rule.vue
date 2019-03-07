<template>
    <svg>
        <polyline :points="createRulePoints( width )" />
        <polyline :points="createRulePoints( height, false )" />

        <polyline v-if="grab" :points="createRayPoints()" style="stroke-dasharray:5" />
    </svg>
</template>
<script>
    export default {
        props: {
            width: { type: Number, default: 500 },
            height: { type: Number, default: 500 },
            grab: { type: Boolean, default: false },
            mouse: { type: Object }
        },
        methods:{
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
            },createRayPoints(){
                let result = [];
                result.push([0,this.mouse.y])
                result.push([this.mouse.x,this.mouse.y])
                result.push([this.mouse.x,0])
                return result.join(' ')
            }
        }
    }
</script>
<style scoped>
    svg{
        fill:none;
        stroke:black;
        stroke-width:0.5;
    }
</style>