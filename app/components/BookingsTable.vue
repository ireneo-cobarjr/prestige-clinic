<script setup>
import DeleteBookingsModal from './DeleteBookingsModal.vue'

const emit = defineEmits(['booking-selected', 'bookings-loading']);

const tableRef = useTemplateRef('bookings-table');

// Reactive state
const rows = ref([])
const totalRows = ref(0)
const page = ref(1)
const pageSize = ref(50)
const pending = ref(false)
const pageSizeOptions = [10, 20, 30, 50, 100];

const filters = ref({});
const deleteModal = useTemplateRef('deleteModal');

/**
 * Returns today's date as YYYY-MM-DD based on Philippine Time (Asia/Manila)
 */
function getCurrentDatePHT() {
  const nowPHT = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
  )

  const year = nowPHT.getFullYear()
  const month = String(nowPHT.getMonth() + 1).padStart(2, '0')
  const day = String(nowPHT.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const showAll = async () => {
  filters.value = {};
  await fetchBookings();
};

const showToday = async () => {
  const date = getCurrentDatePHT();
  filters.value = { date };
  await fetchBookings();
};

const showThisWeek = async () => {
  const thisWeek = getCurrentWeekRangePHT();
  filters.value = {
    startDate: thisWeek.startOfWeek,
    endDate: thisWeek.endOfWeek,
  };
  await fetchBookings();
};

// Track checkboxes per row
const selectedRows = ref([]);

const showDeleteModal = () => {
  deleteModal.value.open(selectedRows.value.length);
};

const deleteBookings = async () => {
  pending.value = true;
  try {
    await $fetch('/api/admin/bookings', {
      method: 'DELETE',
      body: { ids: selectedRows.value },
      credentials: 'include',
    });
    selectedRows.value = [];
    await fetchBookings();
  }
  catch (err) {
    console.error('Failed to delete bookings:', err);
  }
  finally {
    pending.value = false;
  }
};

// Computed total pages
const totalPages = computed(() => Math.max(1, Math.ceil(totalRows.value / pageSize.value)))

// Fetch bookings from API
const fetchBookings = async () => {
  pending.value = true
  emit('bookings-loading', true);
  selectedRows.value = [];
  try {
    const params = new URLSearchParams({
      page: page.value.toString(),
      perPage: pageSize.value.toString(),
      ...filters.value,
    })
    const res = await $fetch(`/api/admin/bookings?${params.toString()}`, {
      credentials: 'include',
    })

    rows.value = res.data
    totalRows.value = res.totalRows
    page.value = res.page
    pageSize.value = res.perPage

    // Reset checkboxes for current page
    rows.value.forEach((row) => {
      if (!(row.id in selectedRows.value)) selectedRows[row.id] = false
    })
  }
  catch (err) {
    console.error('Failed to fetch bookings:', err)
    rows.value = []
    totalRows.value = 0
  }
  finally {
    pending.value = false
    emit('bookings-loading', false);
  }
}

// Event handlers
const goToPage = async (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return
  page.value = newPage
  await fetchBookings()
}

const onPageSizeChange = async () => {
  page.value = 1
  await fetchBookings()
}

const onRowClick = (row) => {
  emit('booking-selected', row)
}

const checkboxTicked = (rowId) => {
  const index = selectedRows.value.indexOf(rowId);
  if (index > -1) {
    selectedRows.value.splice(index, 1); // Uncheck
  }
  else {
    selectedRows.value.push(rowId); // Check
  }
}

const formatTime = (timeStr) => {
  return timePickerOptions.find(option => option.value === timeStr)?.label || timeStr;
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const downloadTable = async () => {
  try {
    pending.value = true;
    const png = await captureTable(tableRef.value)

    const a = document.createElement('a')
    a.href = png
    a.download = 'bookins.png'
    a.click()
  }
  catch (e) {
    console.error(e);
  }
  finally {
    pending.value = false;
  }
};

// Initial fetch
onMounted(() => {
  fetchBookings()
})
</script>

<template>
  <ClientOnly>
    <div class="bookings-table-wrapper">
      <div
        class="mb-2"
        style="display: flex; justify-content: space-between;"
      >
        <h4>Bookings</h4>
        <button
          class="bg-primary px-4 py-1 font-secondary"
          style="width: 100%; border-radius: 8px; width: 136px; display: flex; justify-content: center;"
          :disabled="pending"
          @click="downloadTable"
        >
          Download
        </button>
      </div>

      <!-- Table -->
      <div
        v-if="pending"
        class="loading-screen"
      >
        <Loader />
      </div>
      <DeleteBookingsModal
        ref="deleteModal"
        @confirm="deleteBookings"
      />
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div
          class="filters-section px-5 py-2 mb-2 font-secondary"
          style="font-size: 0.8em;"
        >
          <button
            :class="{ 'active-filter': Object.keys(filters).length === 0 }"
            @click="showAll"
          >
            All
          </button>
          <button
            :class="{ 'active-filter': 'date' in filters }"
            @click="showToday"
          >
            Today
          </button>
          <button
            :class="{ 'active-filter': 'startDate' in filters && 'endDate' in filters }"
            @click="showThisWeek"
          >
            This week
          </button>
        </div>
        <button
          class="negative-btn font-secondary px-4 py-1"
          style="width: 136px;"
          :disabled="selectedRows.length === 0"
          @click="showDeleteModal"
        >
          Delete
        </button>
      </div>
      <table
        ref="bookings-table"
        class="bookings-table mb-3"
      >
        <thead>
          <tr>
            <th
              class="pl-5 bg-primary"
              style="min-width: 221px;"
            >
              Service Date
            </th>
            <th
              class="bg-primary"
              style="min-width: 243px;"
            >
              Service
            </th>
            <th
              class="bg-primary"
              style="min-width: 240px;"
            >
              Patient
            </th>
            <th
              class="bg-primary"
              style="min-width: 252px;"
            >
              Contact info
            </th>
            <th
              class="bg-primary"
              style="min-width: 150px;"
            >
              Sched Status
            </th>
            <th class="pr-5 bg-primary">
              Delete
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="row in rows"
            :key="row.id"
            :class="['font-secondary', { 'expired-row': isBookingPastPH(row.date, row.time) }]"
            @click="onRowClick(row)"
          >
            <td class="pl-5">
              <div>
                <div>{{ formatDate(row.date) }}</div>
                <div>{{ formatTime(row.time) }}</div>
              </div>
            </td>
            <td>{{ row.service }}</td>
            <td>
              <div>
                <div>{{ `${row.firstName} ${row.lastName}` }}</div>
              </div>
            </td>
            <td>
              <div>
                <div>{{ `${row.email}` }}</div>
                <div>{{ `${row.phoneNumber}` }}</div>
              </div>
            </td>
            <td>
              {{ `${isBookingPastPH(row.date, row.time) ? 'Expired' : 'Upcoming'}` }}
            </td>
            <td class="text-center pl-5 pr-5">
              <input
                type="checkbox"
                :value="row.id"
                :checked="selectedRows.includes(row.id)"
                @click.stop="checkboxTicked(row.id)"
              >
            </td>
          </tr>
          <tr v-if="rows.length === 0">
            <td
              style="text-align: center;"
              colspan="6"
              class="no-data"
            >
              {{ 'No data' }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination controls -->
      <div class="pagination-container">
        <div class="pagination-info">
          <small class="font-secondary">
            Showing {{ (page - 1) * pageSize + 1 }}
            to {{ Math.min(page * pageSize, totalRows) }}
            of {{ totalRows }} Bookings
          </small>
        </div>

        <div class="pagination-buttons font-secondary">
          <button
            v-if="page > 1"
            @click="goToPage(page - 1)"
          >
            <Icon
              size="2em"
              name="heroicons:chevron-left-16-solid"
            />
          </button>

          <small><span>Page {{ page }} of {{ totalPages }}</span></small>

          <button
            v-if="page < totalPages"
            @click="goToPage(page + 1)"
          >
            <Icon
              size="2em"
              name="heroicons:chevron-right-16-solid"
            />
          </button>
        </div>

        <div class="page-size-selector">
          <label
            class="font-secondary"
            for="page-size"
          ><small>Rows per page: </small></label>
          <select
            id="page-size"
            v-model.number="pageSize"
            class="ml-3"
            @change="onPageSizeChange"
          >
            <option
              v-for="size in pageSizeOptions"
              :key="size"
              :value="size"
            >
              {{ size }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.filters-section  {
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;

  button {
    transition: 0.25s linear;
    color: #7c838a;
  }

  .active-filter {
    color: #1565C0;
    font-weight: bold;
  }
}

.negative-btn {
  background-color: #e07298;
  color: white;
  border-radius: 8px;
  transition: 0.25s linear;
}

button {
    &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

table {
  min-height: 600px;
  font-size: 0.8em;

  .expired-row {
    background-color: #e07298;
    color: white;

    &:hover {
      color: black;
    }
  }
}

.bookings-table-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 500px;
  overflow-x: auto;
  overflow-y: hidden;
}

.bookings-table {
  width: 100%;
  border-collapse: separate;
  border-radius: 8px; /* Rounded corners */
  overflow: hidden;
  border: 1px solid #ddd;
}

.bookings-table th,
.bookings-table td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.bookings-table tbody tr {
  cursor: pointer;
  transition: 0.25s linear;
}

.bookings-table tbody tr:hover {
  background-color: #cedceb;
}

.no-data {
  text-align: center;
  width: 100%;
  color: #666;
}

.pagination-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.pagination-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.pagination-buttons button {
  height: 2em;
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  select {
    padding: 0.25rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
}

td input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid #c94471;
  accent-color: #c94471;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .bookings-table th, .bookings-table td {
    font-size: 0.875rem;
    padding: 0.25rem;
  }

  .pagination-container {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
