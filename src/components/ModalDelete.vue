<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="relative p-4 w-full max-w-lg max-h-full">
      <div class="bg-white rounded-lg shadow-2xl p-5">
    
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 class="text-lg font-bold text-gray-900">Confirm Delete</h3>
          <button @click="closeModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 px-2">
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"/>
            </svg>
          </button>
        </div>
    
        <!-- Modal body -->
        <div class="p-4 md:p-5 text-center">
          <p class="text-center text-lg text-gray-800 mb-4">Are you sure you want to delete this item?</p>
          
          <!-- Buttons: Cancel and Sure -->
          <div class="flex justify-between gap-4">
            <button @click="closeModal" class="w-1/2 bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 rounded-lg transition-colors">
              Cancel
            </button>
            <button @click="handleSubmit" class="w-1/2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors">
              Sure
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import { ref, watchEffect } from 'vue';
  import { deleteUser } from '@/services/api';

  export default {
    name: 'ModalDelete',
    props: {
      show: Boolean,
      student: Object
    },
    setup(props, { emit }) {
      const localUser = ref({
        id: null
      });

      const closeModal = () => {
        emit('close');
        };

      watchEffect(() => {
        if (props.student) {
          localUser.value = { ...props.student };
        }
      });

      const handleSubmit = async () => {
        try {
          await deleteUser(localUser.value.id);
          closeModal();
          window.location.reload();
        } catch (error) {
          alert("Error deleting user.");
        }
      };

      return {
        localUser,
        handleSubmit,
        closeModal
      };
    }
  };
</script>
  