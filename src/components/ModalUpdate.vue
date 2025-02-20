<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="relative p-4 w-full max-w-lg max-h-full">
      <div class="bg-white rounded-lg shadow-2xl p-5">

        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 class="text-lg font-bold text-gray-900">Update Student</h3>
          <button @click="closeModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 px-2">
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"/>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <form @submit.prevent="handleSubmit" class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <!-- Name -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" v-model="localUser.name" class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all" placeholder="Enter name" />
              <span v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</span>
            </div>

            <!-- Email -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" v-model="localUser.email" class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all" placeholder="Enter email" />
              <span v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</span>
            </div>

            <!-- Gender -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select v-model="localUser.gender" class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all bg-white">
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <span v-if="genderError" class="text-red-500 text-sm">{{ genderError }}</span>
            </div>

            <!-- Status -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select v-model="localUser.status" class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#17274b] focus:border-[#17274b] outline-none transition-all bg-white">
                <option value="" disabled>Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <span v-if="statusError" class="text-red-500 text-sm">{{ statusError }}</span>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="w-full bg-[#17274b] hover:bg-[#2b4070] text-white font-medium py-1.5 rounded-lg transition-colors">
            Update User
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Success Update -->
  <ModalSuccess msg="Student data successfully updated!" :show="isModalVisible" @close="isModalVisible = false" />
</template>

<script>
import { ref, watchEffect } from 'vue';
import { updateUser } from '@/services/api';
import { validateRequired, validateEmail, validateOnlyLetters, validateMaxLength, validateSelect, validateUniqueEmailUpdate } from '@/utils/validation';
import ModalSuccess from '@/components/ModalSuccess.vue';

export default {
  name: 'ModalUpdate',
  components: { ModalSuccess },
  props: {
    show: Boolean,
    student: Object
  },
  setup(props, { emit }) {
    const localUser = ref({
      id: null,
      name: '',
      email: '',
      gender: '',
      status: ''
    });

    watchEffect(() => {
      if (props.student) {
        localUser.value = { ...props.student };
      }
    });

    const nameError = ref("");
    const emailError = ref("");
    const genderError = ref("");
    const statusError = ref("");
    const isModalVisible = ref(false);

    const openSuccessModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      emit('close');
    };

    const handleSubmit = async () => {
      nameError.value = validateRequired(localUser.value.name) || validateOnlyLetters(localUser.value.name) || validateMaxLength(localUser.value.name, 30);
      emailError.value = validateRequired(localUser.value.email) || validateEmail(localUser.value.email) || await validateUniqueEmailUpdate(localUser.value.email, localUser.value.id);
      genderError.value = validateSelect(localUser.value.gender);
      statusError.value = validateSelect(localUser.value.status);

      if (nameError.value || emailError.value || genderError.value || statusError.value) {
        return;
      }

      try {
        await updateUser(
          localUser.value.id,
          localUser.value.email,
          localUser.value.name,
          localUser.value.gender,
          localUser.value.status
        );

        isModalVisible.value = true;
        closeModal();
        openSuccessModal();
      } catch (error) {
        alert("Error updating user.");
      }
    };

    return {
      localUser,
      nameError,
      emailError,
      genderError,
      statusError,
      isModalVisible,
      handleSubmit,
      closeModal
    };
  }
};
</script>