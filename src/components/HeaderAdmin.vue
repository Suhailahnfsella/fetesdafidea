<template>
  <header class="text-[#17274b] lg:px-20 px-10 py-3 flex justify-between items-center font-poppins">
    <!-- Logo / Text -->
    <h1 class="text-3xl font-bold">SDIS</h1>

    <!-- Logout Button -->
    <button @click="handleLogout" class="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded">
      Sign Out
    </button>
  </header>
</template>
  
<script>
  import { useRouter } from 'vue-router';
  import { logout } from '@/services/auth';

  export default {
    name: 'HeaderAdmin',
    setup() {
      const router = useRouter();

      const handleLogout = () => {
        logout(router);
      };

      return { handleLogout };
    }
  };
</script>
  