document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('welcomeOverlay');
    const nameInput = document.getElementById('nameInput');
    const closeBtn = document.getElementById('closeNotif');
    const welcomeTitle = document.getElementById('userWelcome');

    // 1. BULLE DE BIENVENUE
    setTimeout(() => { 
        overlay.style.display = 'flex'; 
        nameInput.focus(); 
    }, 500);

    function start() {
        const name = nameInput.value.trim() || "Lilyane";
        welcomeTitle.textContent = "Dashboard de " + name;
        overlay.style.display = "none";
    }
    closeBtn.addEventListener('click', start);
    nameInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') start(); });

    // 2. HORLOGE
    setInterval(() => { 
        document.getElementById('clock').textContent = new Date().toLocaleTimeString('fr-FR'); 
    }, 1000);

    // 3. TO-DO & PROGRESSION
    const todoInput = document.getElementById('todoInput'), addBtn = document.getElementById('addTodo'), list = document.getElementById('todoList');
    const progText = document.getElementById('progression'), progFill = document.getElementById('progress-fill'), statMsg = document.getElementById('stat-message');

    function updateStats() {
        const items = list.querySelectorAll('li'), done = list.querySelectorAll('.completed').length;
        const pc = items.length === 0 ? 0 : Math.round((done / items.length) * 100);
        progText.textContent = pc + "%";
        progFill.style.width = pc + "%";
        statMsg.textContent = `${done} / ${items.length} tâche(s) faite(s)`;
    }

    addBtn.addEventListener('click', () => {
        if(todoInput.value.trim()) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="todo-left">
                    <input type="checkbox" class="task-check">
                    <div class="custom-checkbox"></div>
                    <span>${todoInput.value}</span>
                </div>
                <button class="del-btn">×</button>`;
            
            const cb = li.querySelector('.task-check');
            li.querySelector('.todo-left').addEventListener('click', () => {
                cb.checked = !cb.checked;
                li.classList.toggle('completed', cb.checked);
                updateStats();
            });
            li.querySelector('.del-btn').addEventListener('click', () => { li.remove(); updateStats(); });
            
            list.appendChild(li);
            todoInput.value = "";
            updateStats();
        }
    });

    // 4. NOTES
    const saveBtn = document.getElementById('saveNote'), nTitle = document.getElementById('nTitle'), nBody = document.getElementById('nBody'), savedBox = document.getElementById('savedNotes');
    saveBtn.addEventListener('click', () => {
        if(nTitle.value || nBody.value) {
            const div = document.createElement('div');
            div.className = 'saved-note-item';
            div.innerHTML = `<strong>${nTitle.value || "Note"}</strong><button class="del-btn">×</button>`;
            div.querySelector('.del-btn').addEventListener('click', () => div.remove());
            savedBox.prepend(div);
            nTitle.value = ""; nBody.value = "";
        }
    });
});