function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.toUpperCase();

    if (task === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Prevent duplicates
    if (tasks.includes(task)) {
        alert("Task already exists!");
        return;
    }

    let li = createTaskElement(task);

    document.getElementById("taskList").appendChild(li);

    saveTask(task);

    input.value = "";
}

// Create task element
function createTaskElement(task) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let span = document.createElement("span");
    span.innerText = task;

    checkbox.onchange = function () {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }
    };

    let btn = document.createElement("button");
    btn.innerText = "Delete";

    btn.onclick = function () {
        li.remove();
        removeTask(task);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);

    return li;
}

// Save task
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on start
window.onload = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        let li = createTaskElement(task);
        document.getElementById("taskList").appendChild(li);
    });
};

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Clear all tasks
function clearAll() {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
}