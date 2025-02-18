<template>
    <div class="relative flex w-full lg:w-1/2 font-poppins">
        <!-- Title Side -->
        <div class="absolute top-0 w-full flex justify-center lg:pt-24 pt-10">
            <div class="w-3/4 lg:w-3/4 text-center">
                <h1 class="text-xl lg:text-2xl xl:text-3xl text-[#233d75] font-extrabold">{{ title }}</h1>
                <p class="text-sm lg:text-lg xl:text-xl text-[#8494b8] font-semibold mt-1">{{ desc }}</p>
            </div>
        </div>

        <!-- Image Side -->
        <div class="flex w-full lg:h-screen">
            <!-- Desktop -->
            <div class="lg:flex lg:justify-center hidden items-center bg-cover lg:w-full" :style="{ backgroundImage: `url(${bgImage})` }">
                <div class="w-3/4 pt-20">
                    <img :src="dataImg" alt="Image Illustration">
                </div>
            </div>

            <!-- Mobile -->
            <div class="flex justify-center lg:hidden">
                <div class="w-2/3 pt-28">
                    <img :src="dataImg" alt="Image Illustration">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SideFormSign',
        props: {
            title: String,
            desc: String,
            img: String
        },
        computed: {
            dataImg() {
                return require(`@/assets/${this.img}`);
            }
        },
        data() {
            return {
                bgImage: require('@/assets/bgsideform.png')
            };
        }
    };
</script>
