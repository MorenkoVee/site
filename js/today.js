// Структура для зберігання даних
let medications = [];

// Завантаження даних при запуску
document.addEventListener('DOMContentLoaded', () => {
    loadMedications();
    displayTodayMedications();
});

// Функція відображення ліків на сьогодні
function displayTodayMedications() {
    const container = document.getElementById('medicationList');
    container.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];

    medications.forEach(med => {
        const medElement = document.createElement('div');
        medElement.className = 'medication-item';
        const taken = med.tracking[today];
        if (taken) {
            medElement.classList.add('taken');
        } else {
            medElement.classList.add('not-taken');
        }

        // Додаємо cursor: pointer та обробник кліку на весь блок
        medElement.style.cursor = 'pointer';
        medElement.onclick = () => toggleTodayMedication(med.id);

        medElement.innerHTML = `
            <div>
                <h3 class="mdc-typography--headline6">${med.name} ${med.dosage ? `- ${med.dosage}` : ''}</h3>
            </div>
            <div class="status-indicator">
                <span class="material-icons">${taken ? 'check' : 'close'}</span>
                <span>${taken ? 'Прийнято' : 'Не прийнято'}</span>
            </div>
        `;

        container.appendChild(medElement);
    });
}

// Функція перемикання статусу прийому ліків на сьогодні
function toggleTodayMedication(medId) {
    const today = new Date().toISOString().split('T')[0];
    const medication = medications.find(m => m.id === medId);
    if (medication) {
        medication.tracking[today] = !medication.tracking[today];
        saveMedications();
        displayTodayMedications();
    }
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
