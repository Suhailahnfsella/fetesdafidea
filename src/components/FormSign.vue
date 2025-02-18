<template>
    <div class="flex w-full lg:w-1/2 lg:bg-[#8494b8] justify-center items-center font-poppins">
        <div class="max-w-sm w-full h-2/3 bg-white rounded-xl shadow-lg p-12 mb-10 items-center">
            <h2 class="text-2xl font-bold text-[#17274b] mb-6 text-center">Sign In</h2>

            <form class="space-y-4" @submit.prevent="handleSubmit">
                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="text" v-model="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all" placeholder="your@email.com" />
                    <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
                </div>

                <!-- Password -->
                <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input :type="showPassword ? 'text' : 'password'" v-model="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all" :placeholder="'Enter your password'" />
                    <EyeIcon :showPassword="showPassword" @toggle="togglePassword" />
                    <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
                </div>

                <!-- Error Message -->
                <p v-if="errors.login" class="text-red-500 text-xs mt-2">{{ errors.login }}</p>

                <!-- Submit Button -->
                <button class="w-full bg-[#17274b] hover:bg-[#2b4070] text-white font-medium py-2.5 rounded-lg transition-colors" type="submit">
                    Sign In
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { submitLogin } from '@/services/auth';
    import { validateRequired, validateEmail } from '@/utils/validation';
    import EyeIcon from "@/components/EyeIcon.vue";

    export default {
        name: 'FormSign',
        components: {
            EyeIcon
        },
        setup() {
            const email = ref('');
            const password = ref('');
            const showPassword = ref(false);
            const errors = ref({});
            const router = useRouter();

            const togglePassword = () => {
                showPassword.value = !showPassword.value;
            };

            const handleSubmit = async () => {
                errors.value = {};

                const emailError = validateRequired(email.value) || validateEmail(email.value);
                if (emailError) {
                    errors.value.email = emailError;
                }

                const passwordError = validateRequired(password.value);
                if (passwordError) {
                    errors.value.password = passwordError;
                }

                if (Object.keys(errors.value).length > 0) return;

                try {
                    await submitLogin(email.value, password.value);
                    router.push('/dashboard');
                } catch (error) {
                    errors.value.login = error;
                }
            };

            return { email, password, showPassword, errors, togglePassword, handleSubmit };
        }
    };
</script>