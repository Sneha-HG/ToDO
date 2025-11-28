<template>
  <div class="todo-container">
    <div class="todo-header">
      <h1 class="app-title">
        <span class="icon">✓</span>
        My Todo List
      </h1>
      <p class="subtitle">Organize your tasks efficiently</p>
    </div>

    <!-- Add Todo Form -->
    <div class="add-todo-section">
      <div class="input-wrapper">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          type="text"
          class="todo-input"
          placeholder="What needs to be done?"
          maxlength="100"
        />
        <button @click="addTodo" class="add-btn" :disabled="!newTodo.trim()">
          <span>+</span> Add Task
        </button>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="filter-tabs">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="currentFilter = filter"
        :class="['filter-btn', { active: currentFilter === filter }]"
      >
        {{ filter }}
      </button>
      <div class="task-counter">
        {{ pendingCount }} {{ pendingCount === 1 ? 'task' : 'tasks' }} pending
      </div>
    </div>

    <!-- Todo List -->
    <div class="todo-list">
      <transition-group name="list" tag="div">
        <div
          v-for="todo in filteredTodos" 
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <div class="todo-content">
            <input
              type="checkbox"
              v-model="todo.completed"
              @change="saveTodos"
              class="todo-checkbox"
              :id="`todo-${todo.id}`"
            />
            <label :for="`todo-${todo.id}`" class="todo-text">
              {{ todo.text }}
            </label>
          </div>
          <div class="todo-actions">
            <span class="todo-time">{{ formatDate(todo.createdAt) }}</span>
            <button @click="deleteTodo(todo.id)" class="delete-btn" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
          </div>
        </div>
      </transition-group>

      <!-- Empty State -->
      <div v-if="filteredTodos.length === 0" class="empty-state">
        <div class="empty-icon">{{ emptyStateIcon }}</div>
        <p class="empty-text">{{ emptyStateText }}</p>
      </div>
    </div>

    <!-- Footer Stats -->
    <div class="footer-stats" v-if="todos.length > 0">
      <div class="stat-item">
        <span class="stat-number">{{ todos.length }}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ completedCount }}</span>
        <span class="stat-label">Completed</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ pendingCount }}</span>
        <span class="stat-label">Pending</span>
      </div>
      <button @click="clearCompleted" class="clear-btn" v-if="completedCount > 0">
        Clear Completed
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

//  STATE MANAGEMENT 
const todos = ref([])
const newTodo = ref('')
const currentFilter = ref('All')
const filters = ref(['All', 'Active', 'Completed'])

// COMPUTED PROPERTIES 
// Filtered todos based on current filter
const filteredTodos = computed(() => {
  if (currentFilter.value === 'Active') {
    return todos.value.filter(todo => !todo.completed)//contains todo's that are'nt completed
  } else if (currentFilter.value === 'Completed') {
    return todos.value.filter(todo => todo.completed)
  }
  return todos.value
})
// to calculate the number of completed, pending and active tasks//
// Count of completed tasks
const completedCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})

// Count of pending tasks
const pendingCount = computed(() => {
  return todos.value.filter(todo => !todo.completed).length
})

// Empty state messages
//this property determines what msg to show when there are no todo's to display//
const emptyStateText = computed(() => {
  if (currentFilter.value === 'Active') return 'No active tasks! Take a break! 🎉'
  if (currentFilter.value === 'Completed') return 'No completed tasks yet. Get started!'
  return 'No tasks yet. Add one above!'
})

const emptyStateIcon = computed(() => {
  if (currentFilter.value === 'Active') return '🎉'
  if (currentFilter.value === 'Completed') return '📋'
  return '📝'
})

// listens to changes in todos array when change happens this function triggers //
watch(todos, (newTodos) => {
  console.log('Todos changed:', newTodos.length)
}, { deep: true }) // changes are also updated //

onMounted(() => {
  loadTodos()
  console.log('Todo App mounted!')
})

// Add new todo
function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return

  const todo = {
    id: Date.now(),//timestamp
    text: text,
    completed: false,//initially set to false 
    createdAt: new Date().toISOString()
  }

  todos.value.unshift(todo) 
  //adds new todo to beginning of todo array
  newTodo.value = ''
  //clears after adding input field
  saveTodos()
}

function deleteTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id)
  //filters out todo with specific id creating new array without that todo
  saveTodos()
}

function clearCompleted() {
  todos.value = todos.value.filter(todo => !todo.completed)
  saveTodos()
}
  //keeps only those todos whose completed value is false.


function saveTodos() {
  localStorage.setItem('vue-todos', JSON.stringify(todos.value))
}

function loadTodos() {
  const stored = localStorage.getItem('vue-todos')
  if (stored) {
    todos.value = JSON.parse(stored)
  }
}
// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000) 
  //rounda a number down to the nearest int//
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
  return date.toLocaleDateString()
}
</script>

<style scoped>
@import '../assets/todo.css';
</style>
