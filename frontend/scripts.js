const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const notes = document.getElementById("notes");
const reminderTime = document.getElementById("reminderTime");
const progress = document.getElementById("progress");
const taskList = document.getElementById("taskList");
const todoContainer = document.getElementById("todoContainer");
const authOverlay = document.getElementById("authOverlay");
const reminderNotification = document.getElementById("reminderNotification");

let tasks = [];
let audioContext = null;

// Your actual API Gateway URL:
const API_URL = "https://h8fkk4wix1.execute-api.us-east-1.amazonaws.com/dev/tasks";

// Simulate login then load tasks
setTimeout(() => {
  authOverlay.style.display = "none";
  todoContainer.classList.add("active");
  fetchTasks();
}, 1000);

function initializeAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTone(freq = 440, duration = 200) {
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  oscillator.start();
  gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
}

function showReminder(taskText, dueDateStr) {
  const now = new Date();
  const due = new Date(dueDateStr);
  if (due > now && due - now <= 86400000) { // Due within 24 hours
    reminderNotification.textContent = `Reminder: "${taskText}" is due on ${dueDateStr}!`;
    reminderNotification.style.display = "block";
    setTimeout(() => reminderNotification.style.display = "none", 5000);
    initializeAudio();
    playTone(300);
  }
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const progVal = progress.value === "" ? 0 : parseInt(progress.value);
  const task = {
    text,
    date: dueDate.value || "No due date",
    prio: priority.value,
    note: notes.value.trim() || "No notes",
    remindTime: reminderTime.value || null,
    prog: progVal
  };

  task.id = Date.now().toString();
  tasks.push(task);
  addTaskToDOM(task);
  initializeAudio();
  playTone(900);

  // Save to backend
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  })
  .then(response => response.json())
  .then(data => {
    if (data.id) {
      const index = tasks.findIndex(t => t.id === task.id);
      if (index !== -1) tasks[index].id = data.id;
    }
  })
  .catch(error => console.error("Error adding task:", error));

  // Clear inputs
  taskInput.value = "";
  dueDate.value = "";
  notes.value = "";
  reminderTime.value = "";
  progress.value = "";
}

function fetchTasks() {
  fetch(API_URL, { method: "GET" })
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data)) {
      tasks = data.map(task => ({ ...task, id: task.id || Date.now().toString() }));
    } else if (data.Items) {
      tasks = data.Items.map(item => ({ ...item, id: item.id || Date.now().toString() }));
    }
    taskList.innerHTML = "";
    tasks.forEach(task => addTaskToDOM(task));
  })
  .catch(error => console.error("Error fetching tasks:", error));
}

function updateTask(taskId, updatedTask) {
  fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask)
  })
  .then(response => response.json())
  .then(() => {
    fetchTasks();
    initializeAudio();
    playTone(660);
  })
  .catch(error => console.error("Error updating task:", error));
}

function deleteTask(taskId) {
  fetch(`${API_URL}/${taskId}`, { method: "DELETE" })
  .then(() => {
    tasks = tasks.filter(task => task.id !== taskId);
    taskList.innerHTML = "";
    tasks.forEach(task => addTaskToDOM(task));
    initializeAudio();
    playTone(200);
  })
  .catch(error => console.error("Error deleting task:", error));
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  const details = document.createElement("div");
  details.className = "task-details";

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = task.text;

  const dueDateSpan = document.createElement("span");
  dueDateSpan.className = "due-date";
  dueDateSpan.textContent = `Due: ${task.date}`;
  if (task.date !== "No due date") showReminder(task.text, task.date);

  const prioritySpan = document.createElement("span");
  prioritySpan.className = "priority";
  prioritySpan.textContent = `Priority: ${task.prio}`;

  const notesSpan = document.createElement("span");
  notesSpan.className = "notes";
  notesSpan.textContent = `Notes: ${task.note}`;

  const progressSpan = document.createElement("span");
  progressSpan.className = "progress";
  progressSpan.textContent = `Progress: ${task.prog}%`;

  details.append(taskText, dueDateSpan, prioritySpan, notesSpan, progressSpan);

  if (task.remindTime) {
    const reminderSpan = document.createElement("span");
    reminderSpan.className = "reminder";
    reminderSpan.textContent = `Reminder: ${task.remindTime}`;
    details.appendChild(reminderSpan);
  }

  const icons = document.createElement("div");
  icons.className = "icons";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✏️";
  editBtn.title = "Edit Task";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", task.text);
    const newDate = prompt("Edit due date (YYYY-MM-DD):", task.date);
    const newPrio = prompt("Edit priority (Low/Medium/High):", task.prio);
    const newNote = prompt("Edit notes:", task.note);
    const newRemind = prompt("Edit reminder time (HH:MM):", task.remindTime);
    const newProg = prompt("Edit progress (0-100):", task.prog);

    if (newText) {
      const updatedTask = {
        ...task,
        text: newText,
        date: newDate || "No due date",
        prio: newPrio || "Low",
        note: newNote || "No notes",
        remindTime: newRemind || null,
        prog: newProg === null || newProg === "" ? 0 : parseInt(newProg)
      };
      updateTask(task.id, updatedTask);
    }
  };

  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = "✅";
  doneBtn.title = "Mark Done";
  doneBtn.onclick = () => {
    li.classList.toggle("done");
    initializeAudio();
    playTone(li.classList.contains("done") ? 350 : 500);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Delete Task";
  deleteBtn.onclick = () => {
    if (task.id) deleteTask(task.id);
    li.remove();
    tasks = tasks.filter(t => t.id !== task.id);
    initializeAudio();
    playTone(200);
  };

  icons.append(editBtn, doneBtn, deleteBtn);
  li.append(details, icons);
  taskList.appendChild(li);
}

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Initialize audio context on first user interaction
document.addEventListener("click", initializeAudio, { once: true });
