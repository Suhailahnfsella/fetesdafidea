<template>
  <HeaderAdmin />
  <WelcomeName :msg="userName" />
  <div class="lg:flex lg:px-20 mb-10">
    <FormAdd />
    <DataTable />
  </div>
</template>
  
<script>
  import DataTable from "@/components/DataTable.vue"
  import FormAdd from "@/components/FormAdd.vue"
  import HeaderAdmin from "@/components/HeaderAdmin.vue"
  import WelcomeName from "@/components/WelcomeName.vue"
  import { useRouter } from 'vue-router';
  import { logout } from '@/services/auth';

  export default {
    name: 'DashBoard',
    components: { 
      DataTable, 
      FormAdd,
      HeaderAdmin,
      WelcomeName
    },
    setup() {
      const router = useRouter();

      const userData = JSON.parse(localStorage.getItem("user"));
      const userName = userData ? userData.name : "User";
      
      const handleLogout = () => {
        logout(router);
      };

      return { handleLogout , userName };
    }
  };
</script>