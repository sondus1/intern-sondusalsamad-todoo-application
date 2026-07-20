export default function TaskList({ tasks, onToggleComplete, onStartEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div style={emptyStyle}>
        <p>No logged items matching this status column.</p>
      </div>
    )
  }

  return (
    <div style={gridStyle}>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            ...cardStyle,
            opacity: task.completed ? 0.65 : 1,
            borderLeft: `4px solid var(--${
              task.priority === 'high'
                ? 'rust'
                : task.priority === 'medium'
                  ? 'mustard'
                  : 'sage'
            })`,
          }}
        >
          <div style={cardHeaderStyle}>
            <span style={tagStyle}>
              {task.priority} priority
            </span>
            <span style={dateStyle}>
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h3
            style={{
              ...cardTitleStyle,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'var(--ink-soft)' : 'var(--ink)',
            }}
          >
            {task.title}
          </h3>
          <div style={cardActionsStyle}>
            <button
              onClick={() => onToggleComplete(task.id)}
              style={{
                ...cardButtonStyle,
                color: task.completed ? 'var(--ink-soft)' : 'var(--sage)',
              }}
            >
              {task.completed ? 'Mark Active' : 'Mark Done'}
            </button>
            {!task.completed && (
              <button
                onClick={() => onStartEdit(task)}
                style={cardButtonStyle}
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(task.id)}
              style={{ ...cardButtonStyle, color: 'var(--rust)' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px',
}
const cardStyle = {
  background: 'var(--paper-2)',
  border: '1px solid var(--rule)',
  borderRadius: '2px',
  padding: '18px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '140px',
  transition: 'opacity 0.2s ease',
}
const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '11px',
  color: 'var(--ink-soft)',
  marginBottom: '10px',
}
const tagStyle = {
  background: 'var(--paper)',
  padding: '2px 6px',
  borderRadius: '2px',
  textTransform: 'lowercase',
}
const dateStyle = {
  alignSelf: 'center',
}
const cardTitleStyle = {
  margin: '0 0 16px',
  fontFamily: 'var(--font-display)',
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '1.4',
  flex: 1,
}
const cardActionsStyle = {
  display: 'flex',
  gap: '12px',
  borderTop: '1px dashed var(--rule)',
  paddingTop: '12px',
}
const cardButtonStyle = {
  background: 'none',
  border: 'none',
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  cursor: 'pointer',
  padding: 0,
  color: 'var(--mustard-dark)',
}
const emptyStyle = {
  textAlign: 'center',
  padding: '40px 0',
  color: 'var(--ink-soft)',
  fontSize: '14px',
}