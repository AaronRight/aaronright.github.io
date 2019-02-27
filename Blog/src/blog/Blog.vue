<template>
    <div>
        <nav>
            <ol>
                <li v-for="c in this.$store.getters.chapters()" v-bind:key="c.id" >
                    <router-link :to="'/chapter/' + c.id"> {{c.name}} </router-link>
                </li>
            </ol>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
    
    };
</script>

<style scoped>
    div{
        border: 1px solid black;
        width: 100%;
        height: 100%;
    }
    nav{
        float: left;
        height: 100%;
        border: 1px solid black;
    }
</style>