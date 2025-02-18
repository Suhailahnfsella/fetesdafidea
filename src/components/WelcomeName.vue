<template>
    <div class="w-1/4 lg:px-20 px-10 py-3 flex items-center font-poppins">
        <h5 class="bg-[#17274b] text-white px-5 lg:px-7 py-2 rounded-3xl inline-flex whitespace-nowrap">
            ✨Hello, {{ msg }}!
        </h5>
    </div>
</template>

<script>
    export default {
        name: 'WelcomeName',
        props: {
            msg: String
        }
    }
</script>