let medications = [];

document.addEventListener('DOMContentLoaded', () => {
    loadMedications();
    displayMedications();
});

function addMedication() {
    const nameInput = document.getElementById('medName');
    const dosageInput = document.getElementById('dosage');
    
    if (!nameInput.value.trim()) {
        alert('Введіть назву препарату');
        return;
    }

    const medication = {
        id: Date.now(),
        name: nameInput.value,
        dosage: dosageInput.value,
        tracking: {}
    };

    medications.push(medication);
    saveMedications();
    displayMedications();
    
    nameInput.value = '';
    dosageInput.value = '';
}

function displayMedications() {
    const container = document.getElementById('medicationList');
    container.innerHTML = '';

    medications.forEach(med => {
        const medElement = document.createElement('div');
        medElement.className = 'medication-item';
        
        medElement.innerHTML = `
            <div>
                <h3 class="mdc-typography--headline6">${med.name} ${med.dosage ? `- ${med.dosage}` : ''}</h3>
            </div>
            <button class="mdc-button mdc-button--outlined" onclick="deleteMedication(${med.id})">
                <span class="mdc-button__ripple"></span>
                <span class="material-icons">delete</span>
                <span class="mdc-button__label">Видалити</span>
            </button>
        `;

        container.appendChild(medElement);
        
        // Ініціалізація кнопки після додавання в DOM
        const button = medElement.querySelector('.mdc-button');
        new mdc.ripple.MDCRipple(button);
    });
}

function deleteMedication(medId) {
    if (confirm('Ви впевнені, що хочете видалити цей препарат?')) {
        medications = medications.filter(m => m.id !== medId);
        saveMedications();
        displayMedications();
    }
}

function saveMedications() {
    localStorage.setItem('medications', JSON.stringify(medications));
}

function loadMedications() {
    const saved = localStorage.getItem('medications');
    if (saved) {
        medications = JSON.parse(saved);
    }
} 
