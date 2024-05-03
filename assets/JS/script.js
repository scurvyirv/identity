// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const saveTask = document.querySelector('#saveTaskButton');


// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomId = Math.floor(Math.random() * 1000); // Generate a random number

    return `${timestamp}-${randomId}`;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.date);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    // ? Sets the card background color based on due date. 
    const today = dayjs();
    let jsDueDate = dayjs(task.date, 'DD/MM/YYYY');

    if (today.isSame(jsDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');
    } else if (today.isAfter(jsDueDate)) {
        taskCard.addClass('bg-danger text-white');
        cardDeleteBtn.addClass('border-light');
    }

    // ? Gather all the elements created above and append them to the correct elements.
    taskCard.append(cardHeader);
    taskCard.append(cardBody);
    cardBody.append(cardDescription);
    cardBody.append(cardDueDate);
    cardBody.append(cardDeleteBtn);

    // ? Return the card so it can be appended to the correct lane.
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // ? Empty existing project cards out of the lanes
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    // Retrieve the entire task object from local storage
    taskList = JSON.parse(localStorage.getItem('tasks'));
    
    // For of loop changes the task card's status when changing lanes
    for (let task of taskList) {
        if (task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    };

    //this makes card draggable
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This 
        helper: function (e) {
            // ? Check if the target of the drag event is the card itself or a child element.
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            // ? Return the clone with the width set to the width of the original card. This 
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    //define variables within form to be targeted in HTML
    const taskTitle = document.querySelector('#task-title').value;
    const taskDueDate = document.querySelector('#task-due-date').value;
    const taskDescription = document.querySelector('#task-description').value;

    //define object to be pushed into array 'taskList' 
    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        date: taskDueDate,
        description: taskDescription,
        status: "to-do"
    };
    // Push newTask object to taskList array
    taskList.push(newTask);

    // Place array into local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
    // Clear form
    document.getElementById("task-form").reset();

};

// Todo: create a function to handle deleting a task (USE JAVASCRIPT FILTER ARRAYS --EXPLAIN THIS)
function handleDeleteTask(event) {
    // Get the task ID from the button's data attribute
    const taskId = $(this).attr('data-task-id');
    taskList = JSON.parse(localStorage.getItem('tasks'));
    // ? Remove project from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity.For now, we will use a`forEach()` loop to remove the project.
    taskList.forEach((task) => {
        if (task.id === taskId) {
            taskList.splice(taskList.indexOf(task), 1);
        }
    });
    // ? We will use our helper function to save the projects to localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));
    // ? Here we use our other function to print projects back to the screen
    renderTaskList();
};

// ****Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    //pull from local storage (UNSURE)
    taskList = JSON.parse(localStorage.getItem('tasks'));

    // ? Get the project id from the event
    const taskId = ui.draggable[0].dataset.taskId;
    // ? Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;
    for (let task of taskList) {
        // ? Find the task card by the `id` and update the task status.
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }
    // ? Save the updated tasks array to localStorage (overwritting the previous one) and render the
    localStorage.setItem('tasks', JSON.stringify(taskList));
    // taskList = tasks;
    renderTaskList();
}


// ****Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Event listener for button click of SaveTask
    saveTask.addEventListener('click', handleAddTask);

    // ? Make lanes droppable
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

});
