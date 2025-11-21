1. In this section, we have a simple input box and an Add button.

The input uses Vue's v-model directive, which binds it to the reactive variable newTodo. This two-way binding means whatever you type in the input is instantly stored in the newTodo variable. And if newTodo changes in the code, the input will update automatically as well.

We've also added an event listener for the Enter key using @keyup.enter. So whenever you press Enter inside the input, Vue triggers the addTodo method. This method takes the current input, creates a new todo item, and adds it to the list.

The Add button does the exact same thing when clicked; it calls the same addTodo method.

Additionally, the button is disabled if the input is empty or only spaces, controlled by :disabled="!newTodo.trim()". This prevents adding empty tasks to the list.

2. for filter tabs section we start with a container with class filter tabs which wraps this whole section . inside this we use a button element with v-for directive to loop over filters array (all,active ,completed) for each filter in this array a button i created dynamically so we don't have to manually create one button for each filter option . we set :key attribute to filter's name so that when the current filter's name gets tracked by this attribute .each button has a click event listener which updates the reactive currentfilter variable to selected filter when clicked , also use dynamic class binding for butons here button always has the static class filter-btn plus an active class (only when current btn's filter name is same as currentfilter)highlighting the active filter UI . below this buttons a div shows number of pending tasks using reactive computed property called as pendingCount & a ternary expression to pluralize task or tasks depending on number. 

3. here inside this section a container div having class todo-list which wraps entire list of tasks. inside a transition-group with named as list and tag div is used to wrap the todo items to enable smooth animations . for rendering each todo we use v-for directive on div to loop reactively over the computed array filterdedtodos.each todo item gets a unique identifier via :key="todo.id" attribute. we set a dynamic class binding 
In this section:

v-for="filter in filters": This loop iterates over the filters array (which contains 'All', 'Active', and 'Completed') and generates a button for each filter. This allows users to filter their to-dos based on the status of the tasks.

@click="currentFilter = filter": When a filter button is clicked, it updates the currentFilter variable with the corresponding filter (either 'All', 'Active', or 'Completed'). This variable controls what tasks are shown based on the filter selected.

:class="['filter-btn', { active: currentFilter === filter }]": This adds the class active to the button if it is the currently active filter. This way, the active filter button can be styled differently (e.g., highlighted).

Task Counter:

{{ pendingCount }}: Displays the number of pending tasks. This value is dynamically computed and updated based on the state of the to-do items.

The phrase changes to singular or plural based on the number of pending tasks: If there is one task, it will show "1 task", otherwise it will say "X tasks".

4. This section contains the list of to-do items:

v-for="todo in filteredTodos": Loops through the filteredTodos array (which only contains the to-dos matching the current filter) and creates a list item for each.

v-model="todo.completed": Each to-do item has a checkbox that is bound to its completed property. When checked, it updates the completed status for that to-do item, and vice versa.

@change="saveTodos": When the checkbox is toggled (checked or unchecked), the saveTodos method is triggered, saving the updated to-do list to localStorage.

Delete Button: The delete button calls deleteTodo(todo.id) when clicked, which removes that particular to-do from the list.

Empty State: If no to-dos are available based on the current filter, an empty state message is displayed.

5. In the footer stats section:

v-if="todos.length > 0": This makes the footer stats section visible only if there are any to-dos.

{{ todos.length }}: Displays the total number of to-dos.

{{ completedCount }} and {{ pendingCount }}: Display the count of completed and pending tasks, respectively.

Clear Completed Button: If there are completed tasks (completedCount > 0), the button to clear completed tasks is shown. When clicked, it calls the clearCompleted method.

6.