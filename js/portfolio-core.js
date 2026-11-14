/* Shared, independently testable task storage and contact validation. */
(function (root) {
  'use strict';
  const STORAGE_KEY = 'ibrahim-academic-planner-v1';
  const examples = [
    {
      id: 'sample-1',
      course: 'COS 106 · Web Technologies',
      title: 'Review responsive portfolio layouts',
      due: '2026-11-16',
      completed: false,
      sample: true,
    },
    {
      id: 'sample-2',
      course: 'Programming fundamentals · Example',
      title: 'Practise arrays and functions',
      due: '2026-11-18',
      completed: false,
      sample: true,
    },
    {
      id: 'sample-3',
      course: 'Study skills · Example',
      title: 'Prepare a weekly revision plan',
      due: '2026-11-20',
      completed: true,
      sample: true,
    },
  ];
  function validDate(value) {
    return (
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      !Number.isNaN(Date.parse(value)) &&
      new Date(value).toISOString().slice(0, 10) === value
    );
  }
  function createTask(course, title, due) {
    course = course.trim();
    title = title.trim();
    if (!course || !title || !validDate(due))
      throw new Error('Enter a course, a task, and a valid due date.');
    return {
      id:
        root.crypto?.randomUUID?.() ||
        `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      course,
      title,
      due,
      completed: false,
      sample: false,
    };
  }
  function saveTasks(storage, tasks) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      return true;
    } catch {
      return false;
    }
  }
  function loadTasks(storage) {
    const fallback = () => examples.map((task) => ({ ...task }));
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (raw === null) {
        const tasks = fallback();
        return { tasks, persistent: saveTasks(storage, tasks) };
      }
      const tasks = JSON.parse(raw);
      if (
        !Array.isArray(tasks) ||
        !tasks.every(
          (task) =>
            task &&
            typeof task.id === 'string' &&
            typeof task.course === 'string' &&
            task.course.trim() &&
            typeof task.title === 'string' &&
            task.title.trim() &&
            typeof task.due === 'string' &&
            validDate(task.due) &&
            typeof task.completed === 'boolean' &&
            typeof task.sample === 'boolean',
        ) ||
        new Set(tasks.map((task) => task.id)).size !== tasks.length
      )
        throw new Error('Invalid stored tasks');
      return { tasks, persistent: true };
    } catch {
      return { tasks: fallback(), persistent: false };
    }
  }
  function validateContact(values) {
    const errors = {};
    for (const key of ['name', 'email', 'phone', 'message']) {
      if (!String(values[key] || '').trim())
        errors[key] =
          `Please enter your ${key === 'name' ? 'name' : key === 'email' ? 'email address' : key === 'phone' ? 'phone number' : 'message'}.`;
    }
    if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      errors.email = 'Enter a valid email address, such as name@example.com.';
    if (!errors.phone && !/^\d+$/.test(values.phone.trim()))
      errors.phone = 'Enter digits only, without spaces, + signs, or hyphens.';
    return errors;
  }
  const api = { STORAGE_KEY, createTask, loadTasks, saveTasks, validateContact };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PortfolioCore = api;
})(globalThis);
