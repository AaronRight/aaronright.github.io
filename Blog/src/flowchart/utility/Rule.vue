<template>
    <svg>
        <polyline :points="createRulePoints( width )" style="fill:none;stroke:black;stroke-width:0.5" />
        <polyline :points="createRulePoints( height, false )" style="fill:none;stroke:black;stroke-width:0.5" />

        <polyline v-if="grab" :points="createRayPoints()" style="fill:none; stroke:black; stroke-width:0.5; stroke-dasharray:5;" />
    </svg>
</template>
<script>
    export default {
        props: {
            width: { type: Number, default: 500 },
            height: { type: Number, default: 500 },
            grab: { type: Boolean, default: false },
            choosen_coords: { type: Array }
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
                result.push([0,this.choosen_coords[1]])
                result.push([this.choosen_coords[0],this.choosen_coords[1]])
                result.push([this.choosen_coords[0],0])
                return result.join(' ')
            }
        }
    }
</script>
<style>

</style>