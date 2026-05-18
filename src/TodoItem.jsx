import { useState } from "react"

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(title)

  function handleEditSubmit(e) {
    e.preventDefault()
    if (editValue.trim() === "") return
    editTodo(id, editValue.trim())
    setIsEditing(false)
  }

  function handleCancel() {
    setEditValue(title)
    setIsEditing(false)
  }

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            className="edit-input"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn">Save</button>
          <button type="button" className="btn" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={e => toggleTodo(id, e.target.checked)}
            />
            {title}
          </label>
          <button onClick={() => setIsEditing(true)} className="btn">Edit</button>
          <button onClick={() => deleteTodo(id)} className="btn btn-danger">Delete</button>
        </>
      )}
    </li>
  )
}