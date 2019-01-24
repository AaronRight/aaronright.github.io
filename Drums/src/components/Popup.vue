<template>
    <div class="popup" tabindex="-1">
        <slot></slot>
    </div>
</template>

<script>
    export default {
      name: 'popup'
    };
</script>

<style>
    .popup {
        position:fixed;
        border: 2px solid red;
        width : fit-content;
        margin: 3px;
        padding: 3px;
        left:-500px;
        top:-500px;
    }

    .popup:focus, .popup:focus-within{
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
    }
</style>