<template>
  <div class="relative flex w-md lg:w-2/3 font-poppins justify-center">
    <div class="py-5 lg:p-6 overflow-x-auto ml-5 mr-5 lg:m-0">
      <!-- Top Pagination & Search -->
      <div class="flex justify-between mb-3 lg:mb-4">
        <div class="flex items-center text-xs lg:text-xs">
          <label class="text-gray-700">Show</label>
          <select v-model="perPage" class="ml-1 lg:ml-2 p-0.5 lg:p-1 border rounded">
            <option v-for="option in [5, 10, 20]" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <span class="ml-1 lg:ml-2">entries</span>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Search..." class="p-1 lg:p-2 border rounded text-xs lg:text-xs" />
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full table-auto border-collapse border border-gray-300 text-xs lg:text-xs">
          <thead>
            <tr class="bg-gray-100">
              <th v-for="(header, index) in headers" :key="index" @click="sortBy(header.key)" class="p-2 lg:p-3 border cursor-pointer w-sm">
                {{ header.label }}
                <span v-if="sortColumn === header.key">
                  {{ sortDirection === 'asc' ? '▲' : '▼' }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedData" :key="index" class="hover:bg-gray-50">
              <td class="p-2 lg:p-3 border w-sm">{{ item.id }}</td>
              <td class="p-2 lg:p-3 border w-sm">{{ item.name }}</td>
              <td class="p-2 lg:p-3 border w-sm">{{ item.email }}</td>
              <td class="p-2 lg:p-3 border w-sm">{{ item.gender }}</td>
              <td class="p-2 lg:p-3 border w-sm">{{ item.status }}</td>
              <td class="p-4 lg:p-5 border w-sm flex space-x-3">
                <button class="text-yellow-500 hover:text-yellow-400" @click="openUpdateModal(item)">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="text-red-500 hover:text-red-400" @click="openDeleteModal(item)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Bottom Pagination -->
      <div class="flex justify-end mt-3 lg:mt-4 items-center space-x-1 lg:space-x-2">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-2 lg:px-3 py-0.5 lg:py-1 border rounded disabled:opacity-50 text-xs lg:text-sm">
          Prev
        </button>

        <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-2 lg:px-3 py-0.5 lg:py-1 border rounded text-xs lg:text-sm" :class="{ 'bg-gray-300': currentPage === page }">
          {{ page }}
        </button>

        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-2 lg:px-3 py-0.5 lg:py-1 border rounded disabled:opacity-50 text-xs lg:text-sm">
          Next
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Update -->
  <ModalUpdate :show="isUpdateModalVisible" :student="selectedStudent" @close="isUpdateModalVisible = false" @update="handleUpdate" />
  
  <!-- Modal Delete -->
  <ModalDelete :show="isDeleteModalVisible" :student="selectedStudent" @close="isDeleteModalVisible = false" @delete="handleDelete" />
</template>

<script>
  import { getUsers } from '@/services/api';
  import $ from 'jquery';
  import 'datatables.net';
  import 'datatables.net-responsive';
  import ModalUpdate from '@/components/ModalUpdate.vue';
  import ModalDelete from '@/components/ModalDelete.vue';

  export default {
    components: { ModalUpdate, ModalDelete },
    data() {
      return {
        isUpdateModalVisible: false,
        isDeleteModalVisible: false,
        selectedStudent: null,
        searchQuery: "",
        perPage: 5,
        currentPage: 1,
        sortColumn: null,
        sortDirection: "asc",
        headers: [
          { label: "ID", key: "id" },
          { label: "Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Gender", key: "gender" },
          { label: "Status", key: "status" },
          { label: "Action", key: "action" }
        ],
        data: [],
      };
    },
    computed: {
      filteredData() {
        return this.data.filter((item) =>
          Object.values(item).some((val) =>
            String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      },
      sortedData() {
        if (!this.sortColumn) return this.filteredData;
        return [...this.filteredData].sort((a, b) => {
          const valA = a[this.sortColumn];
          const valB = b[this.sortColumn];

          if (typeof valA === "number") {
            return this.sortDirection === "asc" ? valA - valB : valB - valA;
          } else {
            return this.sortDirection === "asc"
              ? String(valA).localeCompare(String(valB))
              : String(valB).localeCompare(String(valA));
          }
        });
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.perPage;
        const end = start + this.perPage;
        return this.sortedData.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.sortedData.length / this.perPage);
      },
    },
    methods: {
      async fetchUsers() {
        try {
          const users = await getUsers();
          this.data = users;
          this.initializeDataTable();
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },

      initializeDataTable() {
        $('#example').DataTable({
          responsive: true,
          pageLength: this.perPage, 
          search: {
            search: this.searchQuery, 
          },
        }).columns.adjust().responsive.recalc();
      },

      sortBy(column) {
        if (this.sortColumn === column) {
          this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        } else {
          this.sortColumn = column;
          this.sortDirection = "asc";
        }
      },

      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
      },

      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
      },

      setupDataTable() {
        $(this.$refs.dataTable).DataTable({
          bAutoWidth: false,
          aoColumns: [
            { sWidth: '15%' },
            { sWidth: '20%' },
            { sWidth: '25%' },
            { sWidth: '15%' },
            { sWidth: '15%' },
            { sWidth: '10%' }
          ]
        });
      },

      openUpdateModal(item) {
        this.selectedStudent = { ...item };
        this.isUpdateModalVisible = true;
        this.isDeleteModalVisible = false;
      },

      handleUpdate(updateStudent) {
        const index = this.students.findIndex((p) => p.id === updateStudent.id);
        if (index !== -1) {
          this.students[index] = { ...updateStudent };
        } else {
          console.error("User not found!");
        }
        this.isUpdateModalVisible  = false;
      },

      openDeleteModal(item) {
        this.selectedStudent = { ...item };
        this.isDeleteModalVisible = true;
        this.isUpdateModalVisible = false;
      },

      handleDelete(deleteStudent) {
        const index = this.students.findIndex((p) => p.id === deleteStudent.id);
        if (index !== -1) {
          this.students[index] = { ...deleteStudent };
        } else {
          console.error("Failed delete user!");
        }
        this.isDeleteModalVisible  = false;
      },

    },
    mounted() {
      this.fetchUsers();
      this.setupDataTable();
    },
  };
</script>