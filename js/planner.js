'use strict';
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskStatus = document.getElementById('task-status');
const storageNotice = document.getElementById('storage-notice');
let storage;
try {
  storage = window.localStorage;
} catch {
  storage = null;
}
const initial = PortfolioCore.loadTasks(storage);
let tasks = initial.tasks;
let persistent = initial.persistent;

function updateStorageNotice() {
  storageNotice.textContent = persistent
    ? 'Saved in this browser only. Your planner stays here after a refresh; it does not sync between devices.'
    : 'Browser storage is unavailable or saved data could not be read. You can use this planner now, but changes will not survive a refresh. Existing saved data has not been overwritten.';
  storageNotice.classList.toggle('notice-warning', !persistent);
}
function persist() {
  if (persistent) persistent = PortfolioCore.saveTasks(storage, tasks);
  updateStorageNotice();
}
function renderTasks() {
  taskList.replaceChildren();
  const completed = tasks.filter((task) => task.completed).length;
  document.getElementById('total-count').textContent = tasks.length;
  document.getElementById('open-count').textContent = tasks.length - completed;
  document.getElementById('done-count').textContent = completed;
  document.getElementById('empty-tasks').hidden = tasks.length !== 0;
  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `planner-task${task.completed ? ' completed' : ''}`;
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.completed;
    check.setAttribute(
      'aria-label',
      `Mark ${task.title} ${task.completed ? 'incomplete' : 'complete'}`,
    );
    check.addEventListener('change', () => {
      task.completed = check.checked;
      persist();
      renderTasks();
      taskStatus.textContent = `${task.title} marked ${task.completed ? 'complete' : 'incomplete'}.`;
      taskList.querySelectorAll('input')[tasks.indexOf(task)]?.focus();
    });
    const content = document.createElement('div');
    content.className = 'task-content';
    const course = document.createElement('span');
    course.className = 'task-course';
    course.textContent = task.course;
    const title = document.createElement('strong');
    title.className = 'task-title';
    title.textContent = task.title;
    const meta = document.createElement('div');
    meta.className = 'task-meta';
    const time = document.createElement('time');
    time.dateTime = task.due;
    time.textContent = `Due ${new Date(task.due + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    meta.append(time);
    if (task.sample) {
      const badge = document.createElement('span');
      badge.className = 'sample-tag';
      badge.textContent = 'Sample';
      meta.append(badge);
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!task.completed && new Date(task.due + 'T00:00:00') < today) {
      const overdue = document.createElement('span');
      overdue.className = 'overdue';
      overdue.textContent = 'Overdue';
      meta.append(overdue);
    }
    content.append(course, title, meta);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete-task';
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete ${task.title}`);
    remove.addEventListener('click', () => {
      const index = tasks.indexOf(task);
      tasks = tasks.filter((entry) => entry.id !== task.id);
      persist();
      renderTasks();
      taskStatus.textContent = `${task.title} deleted.`;
      const buttons = taskList.querySelectorAll('.delete-task');
      (
        buttons[Math.min(index, buttons.length - 1)] ||
        document.getElementById('task-title')
      ).focus();
    });
    item.append(check, content, remove);
    taskList.append(item);
  });
}
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const error = document.getElementById('task-error');
  error.textContent = '';
  try {
    const task = PortfolioCore.createTask(
      taskForm.elements.course.value,
      taskForm.elements.title.value,
      taskForm.elements.due.value,
    );
    tasks.unshift(task);
    persist();
    renderTasks();
    taskForm.reset();
    taskStatus.textContent = `Added ${task.title}.`;
    document.getElementById('task-title').focus();
  } catch (failure) {
    error.textContent = failure.message;
  }
});
updateStorageNotice();
renderTasks();
