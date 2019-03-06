<template>
    <div>
        <select>
            <option v-for="type of types" > {{ type }}</option>
        </select>
        <input type="text" placeholder="text">
        <br>
        <input type="number" placeholder="x">
        <input type="number" placeholder="y">
        <input type="number" placeholder="width">
        <input type="number" placeholder="height">
    </div>
</template>
<script>
export default {
    
}
</script>
<style>

</style>

