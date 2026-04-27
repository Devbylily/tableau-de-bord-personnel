document.addEventListener('DOMContentLoaded', () => {
    // 1. HORLOGE (Elle va remarcher car on a enlevé les erreurs avant)
    setInterval(() => { 
        const clockEl = document.getElementById('clock');
        if(clockEl) clockEl.textContent = new Date().toLocaleTimeString('fr-FR'); 
    }, 1000);

    // 2. TO-DO & PROGRESSION
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addTodo');
    const list = document.getElementById('todoList');
    const progText = document.getElementById('progression');
    const progFill = document.getElementById('progress-fill');
    const statMsg = document.getElementById('stat-message');

    function updateStats() {
        if(!list) return; // Sécurité
        const items = list.querySelectorAll('li');
        const done = list.querySelectorAll('.completed').length;
        const pc = items.length === 0 ? 0 : Math.round((done / items.length) * 100);
        
        if(progText) progText.textContent = pc + "%";
        if(progFill) progFill.style.width = pc + "%";
        if(statMsg) statMsg.textContent = `${done} / ${items.length} tâche(s) faite(s)`;
    }

    if(addBtn) {
        addBtn.addEventListener('click', () => {
            const taskText = todoInput.value.trim();
            if(taskText) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${taskText}</span>
                    <button class="del-btn">×</button>`;
                
                li.addEventListener('click', (e) => {
                    if(e.target.className !== 'del-btn') {
                        li.classList.toggle('completed');
                        updateStats();
                    }
                });

                li.querySelector('.del-btn').addEventListener('click', () => { 
                    li.remove(); 
                    updateStats(); 
                });
                
                list.appendChild(li);
                todoInput.value = "";
                updateStats();
            }
        });
    }

    // 3. NOTES
    const saveBtn = document.getElementById('saveNote');
    const nTitle = document.getElementById('nTitle');
    const nBody = document.getElementById('nBody');
    const savedBox = document.getElementById('savedNotes');

    if(saveBtn) {
        saveBtn.addEventListener('click', () => {
            if(nTitle.value || nBody.value) {
                const div = document.createElement('div');
                div.className = 'saved-note-item';
                div.style.marginBottom = "10px";
                div.innerHTML = `
                    <div style="display:flex; justify-content:space-between; width:100%;">
                        <strong>${nTitle.value || "Note"}</strong>
                        <button class="del-btn" style="background:none; border:none; color:#555; cursor:pointer;">×</button>
                    </div>`;
                
                div.querySelector('.del-btn').addEventListener('click', () => div.remove());
                savedBox.prepend(div);
                nTitle.value = ""; 
                nBody.value = "";
            }
        });
    }
});
