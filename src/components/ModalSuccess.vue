<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="relative p-4 w-1/2 max-w-md max-h-full">
      <div class="bg-white rounded-lg shadow-2xl">
        
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Success</h3>
          <button @click="closeModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 px-2">
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"/>
            </svg>
          </button>
        </div>
    
        <!-- Modal body -->
        <div class="p-4 md:p-5 text-center">
          <p class="text-center text-lg text-gray-800 mb-4">{{ msg }}</p>
          <button @click="reloadPage" class="w-1/2 bg-[#17274b] hover:bg-[#2b4070] text-white font-medium py-2 rounded-lg transition-colors">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalSuccess',
  props: {
    show: Boolean,
    msg: { 
      type: String, 
      default: 'Operation completed successfully!' 
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    reloadPage() {
      this.closeModal(); 
      window.location.reload();
    }
  }
};
</script>
