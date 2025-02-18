<template>
  <div class="lg:flex">
    <SideFormSign img="signillustration.png" title="Hello! Welcome to SDIS" desc="Students Data Information System"/>
    <FormSign title="Sign In"/>
  </div>
</template>
  
<script>
  import SideFormSign from '@/components/SideFormSign.vue'
  import FormSign from '@/components/FormSign.vue'

  export default {
    name: "SignIn",
    components: {
      SideFormSign,
      FormSign
    }
  };

</script>