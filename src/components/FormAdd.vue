<template>
  <div class="relative flex w-full h-4/5 lg:w-1/3 font-poppins justify-center px-2">
    <div class="w-full bg-white lg:rounded-xl lg:shadow-lg lg:p-5 px-20 py-10">
      <h2 class="text-md lg:text-lg font-bold text-[#17274b] mb-4 text-center">Add New Student</h2>

      <form class="space-y-3" @submit.prevent="handleSubmit">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" v-model="name" class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all" placeholder="Enter name" />
          <span v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</span>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" v-model="email" class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all" placeholder="Enter email" />
          <span v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</span>
        </div>

        <!-- Gender -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select v-model="gender" class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all bg-white">
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <span v-if="genderError" class="text-red-500 text-sm">{{ genderError }}</span>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="status" class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all bg-white">
            <option value="" disabled>Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <span v-if="statusError" class="text-red-500 text-sm">{{ statusError }}</span>
        </div>

        <!-- Submit Button -->
        <button class="w-full bg-[#17274b] hover:bg-[#2b4070] text-white font-medium py-1.5 rounded-lg transition-colors" type="submit">
          Submit
        </button>
      </form>
    </div>
  </div>
  
  <!-- Modal Component -->
  <ModalSuccess msg="Student Data Successfully Added!" :show="isModalVisible" @close="isModalVisible = false" />
</template>
  
<script>
  import { ref } from 'vue';
  import { createUser } from '@/services/api';
  import { validateRequired, validateEmail, validateOnlyLetters, validateMaxLength, validateSelect, validateUniqueEmailCreate } from '@/utils/validation';
  import ModalSuccess from '@/components/ModalSuccess.vue';

  export default {
    name: 'FormAdd',
    components: { ModalSuccess },
    setup() {
      const name = ref("");
      const email = ref("");
      const gender = ref("");
      const status = ref("");
      const nameError = ref("");
      const emailError = ref("");
      const genderError = ref("");
      const statusError = ref("");
      const isModalVisible = ref(false);

      const openSuccessModal = () => {
        isModalVisible.value = true;
      };

      const handleSubmit = async () => {
        nameError.value = validateRequired(name.value) || validateOnlyLetters(name.value) || validateMaxLength(name.value, 30);
        emailError.value = validateRequired(email.value) || validateEmail(email.value) || await validateUniqueEmailCreate(email.value);
        genderError.value = validateSelect(gender.value);
        statusError.value = validateSelect(status.value);

        if (nameError.value || emailError.value || genderError.value || statusError.value) {
          return;
        }

        try {
          await createUser(email.value, name.value, gender.value, status.value);
          openSuccessModal();

          name.value = "";
          email.value = "";
          gender.value = "";
          status.value = "";
        } catch (error) {
          alert("Error adding user.");
        }
      };

      return {
        name,
        email,
        gender,
        status,
        nameError,
        emailError,
        genderError,
        statusError,
        isModalVisible,
        handleSubmit
      };
    }
  };
</script>