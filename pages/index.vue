<template>
    <div class="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-center mb-8 text-pink-600">
          <span class="inline-block animate-bounce mr-2">✨</span>
          kel's to-do list
          <span class="inline-block animate-bounce ml-2">✨</span>
        </h1>
        
        <div class="flex flex-col md:flex-row gap-6">
          <!-- To-Do Column -->
          <div 
            class="flex-1 bg-pink-100 rounded-lg shadow-md p-4 min-h-[500px]"
            @dragover.prevent
            @drop="onDrop($event, 'todo')"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-pink-600 flex items-center">
                <clipboard-list-icon class="w-5 h-5 mr-2" />
                To-Do
              </h2>
              <span class="bg-pink-200 text-pink-700 px-2 py-1 rounded-full text-sm font-medium">
                {{ columns.todo.length }}
              </span>
            </div>
            
            <button 
              @click="openAddTaskModal('todo')" 
              class="w-full bg-white bg-opacity-60 rounded-md p-2 mb-4 text-pink-600 border border-pink-200 hover:bg-pink-200 transition-colors flex items-center justify-center"
            >
              <plus-icon class="w-4 h-4 mr-1" />
              Add Task
            </button>
            
            <div class="space-y-3">
              <div 
                v-for="task in columns.todo" 
                :key="task.id"
                class="bg-white rounded-md p-3 shadow-sm cursor-move border-l-4 border-pink-400 hover:shadow-md transition-shadow"
                draggable="true"
                @dragstart="onDragStart($event, task)"
              >
                <div class="flex justify-between items-start">
                  <h3 class="font-medium text-gray-800">{{ task.title }}</h3>
                  <div class="flex space-x-1">
                    <button @click="editTask(task)" class="text-gray-400 hover:text-blue-500">
                      <edit-icon class="w-4 h-4" />
                    </button>
                    <button @click="deleteTask(task.id)" class="text-gray-400 hover:text-red-500">
                      <trash-icon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ task.description }}</p>
                <div class="mt-2 space-y-1 text-xs">
                  <div class="flex items-center text-gray-500">
                    <calendar-plus-icon class="w-3 h-3 mr-1" />
                    <span>Created: {{ formatDateTime(task.createdAt) }}</span>
                  </div>
                  <div class="flex items-center text-gray-500">
                    <edit-icon class="w-3 h-3 mr-1" />
                    <span>Modified: {{ formatDateTime(task.modifiedAt) }}</span>
                  </div>
                  <div class="flex items-center text-amber-600">
                    <alarm-clock-icon class="w-3 h-3 mr-1" />
                    <span>Deadline: {{ formatDate(task.deadline) }}</span>
                  </div>
                  <div v-if="task.completedAt" class="flex items-center text-green-600">
                    <check-icon class="w-3 h-3 mr-1" />
                    <span>Completed: {{ formatDateTime(task.completedAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Doing Column -->
          <div 
            class="flex-1 bg-yellow-100 rounded-lg shadow-md p-4 min-h-[500px]"
            @dragover.prevent
            @drop="onDrop($event, 'doing')"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-yellow-600 flex items-center">
                <loader-icon class="w-5 h-5 mr-2" />
                Doing
              </h2>
              <span class="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full text-sm font-medium">
                {{ columns.doing.length }}
              </span>
            </div>
            
            <button 
              @click="openAddTaskModal('doing')" 
              class="w-full bg-white bg-opacity-60 rounded-md p-2 mb-4 text-yellow-600 border border-yellow-200 hover:bg-yellow-200 transition-colors flex items-center justify-center"
            >
              <plus-icon class="w-4 h-4 mr-1" />
              Add Task
            </button>
            
            <div class="space-y-3">
              <div 
                v-for="task in columns.doing" 
                :key="task.id"
                class="bg-white rounded-md p-3 shadow-sm cursor-move border-l-4 border-yellow-400 hover:shadow-md transition-shadow"
                draggable="true"
                @dragstart="onDragStart($event, task)"
              >
                <div class="flex justify-between items-start">
                  <h3 class="font-medium text-gray-800">{{ task.title }}</h3>
                  <div class="flex space-x-1">
                    <button @click="editTask(task)" class="text-gray-400 hover:text-blue-500">
                      <edit-icon class="w-4 h-4" />
                    </button>
                    <button @click="deleteTask(task.id)" class="text-gray-400 hover:text-red-500">
                      <trash-icon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ task.description }}</p>
                <div class="mt-2 space-y-1 text-xs">
                  <div class="flex items-center text-gray-500">
                    <calendar-plus-icon class="w-3 h-3 mr-1" />
                    <span>Created: {{ formatDateTime(task.createdAt) }}</span>
                  </div>
                  <div class="flex items-center text-gray-500">
                    <edit-icon class="w-3 h-3 mr-1" />
                    <span>Modified: {{ formatDateTime(task.modifiedAt) }}</span>
                  </div>
                  <div class="flex items-center text-amber-600">
                    <alarm-clock-icon class="w-3 h-3 mr-1" />
                    <span>Deadline: {{ formatDate(task.deadline) }}</span>
                  </div>
                  <div v-if="task.completedAt" class="flex items-center text-green-600">
                    <check-icon class="w-3 h-3 mr-1" />
                    <span>Completed: {{ formatDateTime(task.completedAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Done Column -->
          <div 
            class="flex-1 bg-green-100 rounded-lg shadow-md p-4 min-h-[500px]"
            @dragover.prevent
            @drop="onDrop($event, 'done')"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-green-600 flex items-center">
                <check-circle-icon class="w-5 h-5 mr-2" />
                Done
              </h2>
              <span class="bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                {{ columns.done.length }}
              </span>
            </div>
            
            <button 
              @click="openAddTaskModal('done')" 
              class="w-full bg-white bg-opacity-60 rounded-md p-2 mb-4 text-green-600 border border-green-200 hover:bg-green-200 transition-colors flex items-center justify-center"
            >
              <plus-icon class="w-4 h-4 mr-1" />
              Add Task
            </button>
            
  
            
            <div class="space-y-3">
              <div 
                v-for="task in columns.done" 
                :key="task.id"
                class="bg-white rounded-md p-3 shadow-sm cursor-move border-l-4 border-green-400 hover:shadow-md transition-shadow"
                draggable="true"
                @dragstart="onDragStart($event, task)"
              >
                <div class="flex justify-between items-start">
                  <h3 class="font-medium text-gray-800">{{ task.title }}</h3>
                  <div class="flex space-x-1">
                    <button @click="editTask(task)" class="text-gray-400 hover:text-blue-500">
                      <edit-icon class="w-4 h-4" />
                    </button>
                    <button @click="deleteTask(task.id)" class="text-gray-400 hover:text-red-500">
                      <trash-icon class="w-4 h-4" />
                    </button>
                    
  <button 
    @click.stop="archiveTask(task.id)" 
    class="text-gray-400 hover:text-purple-500"
    title="Archive task"
  >
    <archive-icon class="w-4 h-4" />
  </button>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ task.description }}</p>
                <div class="mt-2 space-y-1 text-xs">
                  <div class="flex items-center text-gray-500">
                    <calendar-plus-icon class="w-3 h-3 mr-1" />
                    <span>Created: {{ formatDateTime(task.createdAt) }}</span>
                  </div>
                  <div class="flex items-center text-gray-500">
                    <edit-icon class="w-3 h-3 mr-1" />
                    <span>Modified: {{ formatDateTime(task.modifiedAt) }}</span>
                  </div>
                  <div class="flex items-center text-amber-600">
                    <alarm-clock-icon class="w-3 h-3 mr-1" />
                    <span>Deadline: {{ formatDate(task.deadline) }}</span>
                  </div>
                  <div v-if="task.completedAt" class="flex items-center text-green-600">
                    <check-icon class="w-3 h-3 mr-1" />
                    <span>Completed: {{ formatDateTime(task.completedAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  
  <!-- Archived Column -->
  <div 
    class="flex-1 bg-gray-100 rounded-lg shadow-md p-4"
    :class="{'min-h-[500px]': showArchived}"
    @dragover.prevent
    @drop="onDrop($event, 'archived')"
    style="margin-top:1.5em"
  >
    <div 
      class="flex items-center justify-between mb-4 cursor-pointer" 
      @click="showArchived = !showArchived"
      
    >
      <h2 class="text-xl font-bold text-gray-600 flex items-center">
        <archive-icon class="w-5 h-5 mr-2" />
        Archived
        <chevron-down-icon 
          class="w-4 h-4 ml-2 transition-transform duration-200"
          :class="{'rotate-180': showArchived}"
        />
      </h2>
      <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
        {{ columns.archived.length }}
      </span>
    </div>
  
    <div v-if="showArchived" class="space-y-3">
      <div 
        v-for="task in columns.archived" 
        :key="task.id"
        class="bg-white rounded-md p-3 shadow-sm border-l-4 border-gray-400 opacity-90"
      >
        <div class="flex justify-between items-start">
          <h3 class="font-medium text-gray-700">{{ task.title }}</h3>
          <button 
            @click="deleteTask(task.id)"
            class="text-gray-400 hover:text-green-500"
            title="Restore task"
          >
          <trash-icon class="w-4 h-4" />
          </button>
        </div>
        <p class="text-sm text-gray-500 mt-1">{{ task.description }}</p>
        <div class="mt-2 space-y-1 text-xs">
          <div class="flex items-center text-gray-500">
            <calendar-icon class="w-3 h-3 mr-1" />
            <span>Created: {{ formatDateTime(task.createdAt) }}</span>
          </div>
          <div class="flex items-center text-gray-500">
            <archive-icon class="w-3 h-3 mr-1" />
            <span>Archived: {{ formatDateTime(task.archivedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
      
      <!-- Add/Edit Task Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
          <h2 class="text-xl font-bold mb-4 text-gray-800">
            {{ editingTask ? 'Edit Task' : 'Add New Task' }}
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                v-model="taskForm.title" 
                type="text" 
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                placeholder="Task title"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                v-model="taskForm.description" 
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                placeholder="Task description"
                rows="3"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input 
                v-model="taskForm.deadline" 
                type="date" 
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              />
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              @click="closeModal" 
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              @click="saveTask" 
              class="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
              {{ editingTask ? 'Update' : 'Add' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  
  import { 
    Archive as ArchiveIcon,
    ChevronDown as ChevronDownIcon,
    RotateCcw as RotateCcwIcon,
    // ... keep all your existing icon imports
  } from 'lucide-vue-next';
  
  import { 
    ClipboardList as ClipboardListIcon, 
    CheckCircle as CheckCircleIcon, 
    Loader as LoaderIcon,
    Calendar as CalendarIcon,
    CalendarPlus as CalendarPlusIcon,
    AlarmClock as AlarmClockIcon,
    Check as CheckIcon,
    Plus as PlusIcon,
    Edit as EditIcon,
    Trash as TrashIcon
  } from 'lucide-vue-next';
  
  // State
  const columns = reactive({
    todo: [],
    doing: [],
    done: [],
    archived: [] 
  });
  
  
  
  // Add these with your other refs
  const showArchived = ref(false); // Controls archived section visibility
  // const draggedTask = ref(null); // For drag-and-drop functionality
  
  const showModal = ref(false);
  const currentColumn = ref('todo');
  const editingTask = ref(null);
  const taskForm = reactive({
    title: '',
    description: '',
    deadline: new Date().toISOString().substr(0, 10)
  });
  const draggedTask = ref(null);
  
  // Load data from localStorage on mount
  onMounted(() => {
    const savedData = localStorage.getItem('kanban-data');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach(key => {
        columns[key] = parsedData[key];
      });
      if (!columns.archived) {
        columns.archived = [];
      }
    } else {
      // Add sample tasks if no data exists
      columns.archived = []; // Initialize empty archived array
      saveToLocalStorage();
      columns.todo.push(
        {
          id: 1,
          title: 'Research project ideas',
          description: 'Look for inspiration and gather resources',
          createdAt: '2025-05-15T10:30:00',
          modifiedAt: '2025-05-15T10:30:00',
          deadline: '2025-05-20',
          completedAt: null
        },
        {
          id: 2,
          title: 'Create project plan',
          description: 'Define scope, timeline, and deliverables',
          createdAt: '2025-05-16T14:20:00',
          modifiedAt: '2025-05-16T14:20:00',
          deadline: '2025-05-22',
          completedAt: null
        }
      );
      
      columns.doing.push(
        {
          id: 3,
          title: 'Design mockups',
          description: 'Create initial designs for the project',
          createdAt: '2025-05-17T09:15:00',
          modifiedAt: '2025-05-18T11:45:00',
          deadline: '2025-05-25',
          completedAt: null
        }
      );
      
      columns.done.push(
        {
          id: 4,
          title: 'Project kickoff',
          description: 'Initial meeting with stakeholders',
          createdAt: '2025-05-10T13:00:00',
          modifiedAt: '2025-05-10T13:00:00',
          deadline: '2025-05-15',
          completedAt: '2025-05-15T16:30:00'
        }
      );
      
      saveToLocalStorage();
    }
  });
  
  // Methods
  function openAddTaskModal(column) {
    currentColumn.value = column;
    editingTask.value = null;
    taskForm.title = '';
    taskForm.description = '';
    taskForm.deadline = new Date().toISOString().substr(0, 10);
    showModal.value = true;
  }
  
  function editTask(task) {
    editingTask.value = task;
    taskForm.title = task.title;
    taskForm.description = task.description;
    taskForm.deadline = task.deadline;
    showModal.value = true;
  }
  
  function closeModal() {
    showModal.value = false;
  }
  
  function saveTask() {
    if (!taskForm.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    const now = new Date().toISOString();
    
    if (editingTask.value) {
      // Update existing task
      const task = editingTask.value;
      task.title = taskForm.title;
      task.description = taskForm.description;
      task.deadline = taskForm.deadline;
      task.modifiedAt = now;
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        title: taskForm.title,
        description: taskForm.description,
        createdAt: now,
        modifiedAt: now,
        deadline: taskForm.deadline,
        completedAt: null
      };
      columns[currentColumn.value].push(newTask);
    }
    
    saveToLocalStorage();
    closeModal();
  }
  
  function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
      for (const column in columns) {
        const index = columns[column].findIndex(task => task.id === taskId);
        if (index !== -1) {
          columns[column].splice(index, 1);
          break;
        }
      }
      saveToLocalStorage();
    }
  }
  
  function onDragStart(event, task) {
    draggedTask.value = task;
    event.dataTransfer.effectAllowed = 'move';
  }
  
  function onDrop(event, columnName) {
    if (!draggedTask.value) return;
  
    if (draggedTask.value.archivedAt) return;
    
    // Find and remove the task from its original column
    for (const column in columns) {
      const index = columns[column].findIndex(task => task.id === draggedTask.value.id);
      if (index !== -1) {
        columns[column].splice(index, 1);
        break;
      }
    }
    
    // Update the task's modifiedAt date
    draggedTask.value.modifiedAt = new Date().toISOString();
    
    // If moving to "done" column, set the completedAt date
    if (columnName === 'archived') {
      draggedTask.value.archivedAt = new Date().toISOString();
      draggedTask.value.completedAt = draggedTask.value.completedAt || new Date().toISOString();
    } else if (columnName === 'done') {
      draggedTask.value.completedAt = new Date().toISOString();
      draggedTask.value.archivedAt = null;
    } else {
      draggedTask.value.completedAt = null;
      draggedTask.value.archivedAt = null;
    }
    
    // Add the task to the new column
    columns[columnName].push(draggedTask.value);
    draggedTask.value = null;
    
    saveToLocalStorage();
  }
  
  function saveToLocalStorage() {
    const dataToSave = {
      todo: columns.todo,
      doing: columns.doing,
      done: columns.done,
      archived: columns.archived
    };
    localStorage.setItem('kanban-data', JSON.stringify(columns));
  }
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  function formatDateTime(dateTimeString) {
    if (!dateTimeString) return 'N/A';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }
  
  // Add these methods to your script setup
  function archiveTask(taskId) {
    if (confirm('Archive this task?')) {
      let foundTask = null;
      
      // Search through all columns except archived
      ['todo', 'doing', 'done'].forEach(column => {
        const index = columns[column].findIndex(task => task.id === taskId);
        if (index !== -1) {
          foundTask = columns[column].splice(index, 1)[0];
        }
      });
      
      if (foundTask) {
        foundTask.archivedAt = new Date().toISOString();
        columns.archived.unshift(foundTask); // Add to top of archived
        saveToLocalStorage();
      }
    }
  }
  
  </script>
  
  <style scoped>
  
  /* Additional styles */
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  
  /* Add to your existing styles */
  .bg-gray-100 {
    background-color: #f3f4f6;
  }
  .border-gray-400 {
    border-color: #9ca3af;
  }
  .text-gray-600 {
    color: #4b5563;
  }
  .hover\:text-purple-500:hover {
    color: #a855f7;
  }
  
  .rotate-180 {
    transform: rotate(180deg);
  }
  .transition-transform {
    transition: transform 0.2s ease;
  }
  </style>