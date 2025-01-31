// Структура для зберігання даних
let medications = [];

// Завантаження даних при запуску
document.addEventListener('DOMContentLoaded', () => {
    loadMedications();
    displayMedications();
});

// Функція додавання нового препарату
function addMedication() {
    const nameInput = document.getElementById('medName');
    const dosageInput = document.getElementById('dosage');
    
    const medication = {
        id: Date.now(),
        name: nameInput.value,
        dosage: dosageInput.value,
        tracking: {}
    };

    medications.push(medication);
    saveMedications();
    displayMedications();
    
    // Очищення полів введення
    nameInput.value = '';
    dosageInput.value = '';
}

// Функція відображення ліків
function displayMedications() {
    const container = document.getElementById('medicationList');
    container.innerHTML = '';

    medications.forEach(med => {
        const medElement = document.createElement('div');
        medElement.className = 'medication-item';
        
        const currentDate = new Date();
        const trackingGrid = generateTrackingGrid(med, currentDate);

        medElement.innerHTML = `
            <h3>${med.name} ${med.dosage ? `- ${med.dosage}` : ''}</h3>
            <button onclick="deleteMedication(${med.id})">Видалити</button>
            ${trackingGrid}
        `;

        container.appendChild(medElement);
    });
}

// Генерація сітки для відстеження
function generateTrackingGrid(medication, currentDate) {
    const days = 7;
    let grid = '<div class="tracking-grid">';
    
    for (let i = 0; i < days; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const taken = medication.tracking[dateStr];
        const className = taken ? 'taken' : 'not-taken';
        
        grid += `
            <div class="day-cell ${className}" 
                 onclick="toggleMedication(${medication.id}, '${dateStr}')">
                ${date.getDate()}/${date.getMonth() + 1}
            </div>
        `;
    }
    
    grid += '</div>';
    return grid;
}

// Функція перемикання статусу прийому ліків
function toggleMedication(medId, date) {
    const medication = medications.find(m => m.id === medId);
    if (medication) {
        medication.tracking[date] = !medication.tracking[date];
        saveMedications();
        displayMedications();
    }
}

// Функція видалення препарату
function deleteMedication(medId) {
    medications = medications.filter(m => m.id !== medId);
    saveMedications();
    displayMedications();
}

// Функції для роботи з localStorage
function saveMedications() {
    localStorage.setItem('medications', JSON.stringify(medications));
}

function loadMedications() {
    const saved = localStorage.getItem('medications');
    if (saved) {
        medications = JSON.parse(saved);
    }
} 
