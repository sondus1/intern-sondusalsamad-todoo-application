import { useEffect, useMemo, useState } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'

const STORAGE_KEY = 'todo-app:tasks'

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return seedTasks()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : seedTasks()
  } catch {
    return seedTasks()
  }
}

function seedTasks() {
  const now = Date.now()
  return [
    {
      id: generateId(),
      title: 'Complete Project 3 documentation',
      priority: 'high',
      completed: false,
      createdAt: now,
    },
    {
      id: generateId(),
      title: 'Review React state management principles',
      priority: 'medium',
      completed: true,
      createdAt: now - 1000 * 60 * 60,
    },
    {
      id: generateId(),
      title: 'Set up Git upstream branches for review',
      priority: 'low',
      completed: false,
      createdAt: now - 1000 * 60 * 60 * 3,
    },
  ]
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [editingTask, setEditingTask] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (activeFilter === 'active') return !task.completed
      if (activeFilter === 'completed') return task.completed
      return true
    })
  }, [tasks, activeFilter])

  function handleSaveTask(formData) {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...t, ...formData } : t
        )
      )
      setEditingTask(null)
    } else {
      setTasks((prev) => [
        {
          id: generateId(),
          title: formData.title,
          priority: formData.priority,
          completed: false,
          createdAt: Date.now(),
        },
        ...prev,
      ])
    }
  }

  function handleToggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function handleDelete(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks((prev) => prev.filter((t) => t.id !== id))
      if (editingTask?.id === id) {
        setEditingTask(null)
      }
    }
  }

  return (
    <div>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Task Catalog</h1>
        <p style={subtitleStyle}>Project 2 — Index Card Todo Matrix</p>
      </header>

      <TaskForm
        editingTask={editingTask}
        onSave={handleSaveTask}
        onCancel={() => setEditingTask(null)}
      />

      <div style={tabsStyle}>
        {['all', 'active', 'completed'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              ...tabButtonStyle,
              borderBottom:
                activeFilter === filter
                  ? '2px solid var(--rust)'
                  : '2px solid transparent',
              color: activeFilter === filter ? 'var(--rust)' : 'var(--ink-soft)',
              fontWeight: activeFilter === filter ? '500' : '400',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggleComplete={handleToggleComplete}
        onStartEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  )
}

const headerStyle = {
  marginBottom: '32px',
}
const titleStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: '36px',
  margin: '0 0 4px',
  fontWeight: '600',
}
const subtitleStyle = {
  margin: 0,
  fontSize: '13px',
  color: 'var(--ink-soft)',
}
const tabsStyle = {
  display: 'flex',
  gap: '16px',
  borderBottom: '1px solid var(--rule)',
  marginBottom: '28px',
}
const tabButtonStyle = {
  background: 'none',
  border: 'none',
  padding: '6px 4px 10px',
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  cursor: 'pointer',
  textTransform: 'lowercase',
}