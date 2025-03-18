const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    const tasks = getTasks();

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks(tasks);
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", () => {
            const updatedTasks = tasks.filter((t) => t !== task);
            saveTasks(updatedTasks);
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text !== "") {
        const tasks = getTasks();
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        taskInput.value = "";
        renderTasks();
    }
});

renderTasks();