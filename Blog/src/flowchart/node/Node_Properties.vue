<template>
    <div>
        <select v-model="node.type">
            <option v-for="type of types" :key="'t_'+type"> {{ type }}</option>
        </select>
        <input type="text" placeholder="text" v-model="node.text">
        <br>
        <input type="number" placeholder="x" v-model="node.x">
        <input type="number" placeholder="y" v-model="node.y">
        <input type="number" placeholder="width" v-model="node.width">
        <input type="number" placeholder="height" v-model="node.height">
         <button>delete</button>
    </div>
</template>
<script>
export default {
    props: ['node', 'types'],
}
</script>
<style scoped>
    div{    
        width: 100%;
        height: 100%;
        margin: 5px;
    }
</style>

