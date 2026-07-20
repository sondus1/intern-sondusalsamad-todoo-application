import { useState, useEffect } from 'react'

const DEFAULT_PRIORITY = 'medium'

export default function TaskForm({ editingTask, onSave, onCancel }) {
  const [taskInput, setTaskInput] = useState('')
  const [priorityInput, setPriorityInput] = useState(DEFAULT_PRIORITY)

  useEffect(() => {
    if (editingTask) {
      setTaskInput(editingTask.title)
      setPriorityInput(editingTask.priority)
    } else {
      setTaskInput('')
      setPriorityInput(DEFAULT_PRIORITY)
    }
  }, [editingTask])

  function handleSubmit(e) {
    e.preventDefault()
    if (!taskInput.trim()) return

    onSave({
      title: taskInput.trim(),
      priority: priorityInput,
    })

    setTaskInput('')
    setPriorityInput(DEFAULT_PRIORITY)
  }

  return (
    <div style={editorContainerStyle}>
      <h2 style={formTitleStyle}>
        {editingTask ? 'Edit Staged Task' : 'File New Task'}
      </h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="What needs to be archived or completed?..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={searchStyle}
          required
        />
        <select
          value={priorityInput}
          onChange={(e) => setPriorityInput(e.target.value)}
          style={dropdownStyle}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <div style={formActionsStyle}>
          <button type="submit" style={buttonStyle}>
            {editingTask ? 'Save' : '+ Add'}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={onCancel}
              style={{ ...buttonStyle, background: 'var(--ink-soft)' }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const editorContainerStyle = {
  background: 'var(--paper-2)',
  border: '1px solid var(--rule)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '32px',
}
const formTitleStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: '18px',
  fontWeight: '500',
  margin: '0 0 12px 0',
}
const formStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
}
const searchStyle = {
  flex: '2 1 300px',
  padding: '10px 14px',
  fontSize: '14px',
  background: 'var(--paper)',
  border: '1px solid var(--rule)',
  borderRadius: '2px',
  color: 'var(--ink)',
  fontFamily: 'var(--font-mono)',
  outline: 'none',
}
const dropdownStyle = {
  flex: '1 1 120px',
  padding: '10px 12px',
  fontSize: '14px',
  background: 'var(--paper)',
  border: '1px solid var(--rule)',
  borderRadius: '2px',
  color: 'var(--ink)',
  fontFamily: 'var(--font-mono)',
  outline: 'none',
}
const formActionsStyle = {
  display: 'flex',
  gap: '8px',
}
const buttonStyle = {
  padding: '10px 20px',
  background: 'var(--sage)',
  color: '#F6F1E4',
  border: 'none',
  borderRadius: '2px',
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
  cursor: 'pointer',
}