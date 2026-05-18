import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"
import toast, { Toaster } from 'react-hot-toast'  // Toast Notifications

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ])
    toast.success(`✅ "${title}" added!`)  
  }

  function editTodo(id, newTitle) {
    setTodos(currentTodos => currentTodos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ))
    toast.success(`📝 Task updated to "${newTitle}"`)  
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => currentTodos.map(todo =>
      todo.id === id ? { ...todo, completed } : todo
    ))
    
    const task = todos.find(todo => todo.id === id)
    if (completed) {
      toast.success(`🎉 "${task?.title}" completed!`)
    } else {
      toast.success(`🔄 "${task?.title}" marked as incomplete`)
    }
  }

  function deleteTodo(id) {
    const task = todos.find(todo => todo.id === id)
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id))
    toast.error(`🗑️ "${task?.title}" deleted`)  // Add notification
  }

  return (
    <>
      <Toaster 
        position="bottom-center"  
        toastOptions={{
          duration: 3000,  // Show for 3 seconds
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </>
  )
}