// Import router creation functions from Vue Router library
import { createRouter, createWebHistory } from 'vue-router'

// Import the TodoApp component that will be rendered for the root route
import TodoApp from '../views/TodoApp.vue'

// Create and configure the router instance with history mode and route definitions
const router = createRouter({
  // Use HTML5 history mode for clean URLs without hash (#), with base URL from Vite config
  history: createWebHistory(import.meta.env.BASE_URL),
  
  // Define array of route objects mapping URL paths to components
  routes: [
    {
      path: '/',              // URL path that matches the root/home page
      name: 'todo',           // Unique name for this route (used for programmatic navigation)
      component: TodoApp      // Component to render when this route is active
    }
  ]
})

// Export router instance to be imported and used in main.js
export default router

