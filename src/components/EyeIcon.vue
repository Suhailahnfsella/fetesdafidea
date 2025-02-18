<template>
    <button type="button" @click="$emit('toggle')" class="absolute right-3 pt-10 transform -translate-y-1/2 text-gray-500">
        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6zM10 14a4 4 0 110-8 4 4 0 010 8z"/>
            <path d="M10 8a2 2 0 100 4 2 2 0 000-4z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
    </button>
  </template>
  
<script>
    export default {
        name: "EyeIcon",
        props: {
            showPassword: Boolean
        }
    };
</script>