import React, { useState, useEffect } from 'react';
import './App.css';

// IMPORTANTE: En producción con nginx proxy, usar ruta relativa
const API_URL = process.env.REACT_APP_API_URL || '';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...task,
          completed: !task.completed,
        }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 Task Manager</h1>
          <p>Organiza tu día de manera eficiente</p>
        </header>

        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
            rows="3"
          />
          <button type="submit" className="btn-primary">
            Agregar Tarea
          </button>
        </form>

        <div className="tasks-container">
          {loading ? (
            <div className="loading">Cargando tareas...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <p>¡No hay tareas pendientes!🎉</p>
              <p>Agrega una nueva tarea para comenzar</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                    className="checkbox"
                  />
                  <div className="task-text">
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="btn-delete"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-value">{tasks.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {tasks.filter((t) => !t.completed).length}
            </span>
            <span className="stat-label">Pendientes</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {tasks.filter((t) => t.completed).length}
            </span>
            <span className="stat-label">Completadas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;