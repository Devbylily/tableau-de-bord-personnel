document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('welcomeOverlay');
    const nameInput = document.getElementById('nameInput');
    const closeBtn = document.getElementById('closeNotif');
    const welcomeTitle = document.getElementById('userWelcome');

    // 1. BULLE DE BIENVENUE
    // On l'affiche avec un petit délai pour l'effet "Wow"
    setTimeout(() => { 
        overlay.style.display = 'flex'; 
        if(nameInput) nameInput.focus(); 
    }, 500);

    function start() {
        const name = nameInput.value.trim() || "Lilyane";
        welcomeTitle.textContent = "Tableau de bord de " + name;
        overlay.style.opacity = "0"; // Transition douce
        setTimeout(() => { overlay.style.display = "none"; }, 500);
    }

    closeBtn.addEventListener('click', start);
    nameInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') start(); });

    // 2. HORLOGE (Ton code est parfait ici)
    setInterval(() => { 
        const clockEl = document.getElementById('clock');
        if(clockEl) clockEl.textContent = new Date().toLocaleTimeString('fr-FR'); 
    }, 1000);

    // 3. TO-DO & PROGRESSION
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addTodo');
    const list = document.getElementById('todoList');
    const progText = document.getElementById('progression');
    const progFill = document.getElementById('progress-fill');
    const statMsg = document.getElementById('stat-message');

    function updateStats() {
        const items = list.querySelectorAll('li');
        const done = list.querySelectorAll('.completed').length;
        const pc = items.length === 0 ? 0 : Math.round((done / items.length) * 100);
        
        if(progText) progText.textContent = pc + "%";
        if(progFill) progFill.style.width = pc + "%";
        if(statMsg) statMsg.textContent = `${done} / ${items.length} tâche(s) faite(s)`;
    }

    addBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if(taskText) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="del-btn">×</button>`;
            
            // Clic sur toute la ligne pour barrer
            li.addEventListener('click', (e) => {
                if(e.target.className !== 'del-btn') {
                    li.classList.toggle('completed');
                    updateStats();
                }
            });

            // Bouton supprimer
            li.querySelector('.del-btn').addEventListener('click', () => { 
                li.remove(); 
                updateStats(); 
            });
            
            list.appendChild(li);
            todoInput.value = "";
            updateStats();
        }
    });

    // 4. NOTES (On garde ta logique de prepend, c'est top)
    const saveBtn = document.getElementById('saveNote');
    const nTitle = document.getElementById('nTitle');
    const nBody = document.getElementById('nBody');
    const savedBox = document.getElementById('savedNotes');

    if(saveBtn) {
        saveBtn.addEventListener('click', () => {
            if(nTitle.value || nBody.value) {
                const div = document.createElement('div');
                div.className = 'saved-note-item';
                div.style.marginBottom = "10px"; // Petit espace
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
