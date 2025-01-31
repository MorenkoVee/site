let medications = [];

document.addEventListener('DOMContentLoaded', () => {
    loadMedications();
    displayHistory();
});

function displayHistory() {
    const container = document.getElementById('medicationList');
    container.innerHTML = '';

    medications.forEach(med => {
        const medElement = document.createElement('div');
        medElement.className = 'medication-item';
        
        const trackingGrid = generateTrackingGrid(med);

        medElement.innerHTML = `
            <h3>${med.name} ${med.dosage ? `- ${med.dosage}` : ''}</h3>
            ${trackingGrid}
        `;

        container.appendChild(medElement);
    });
}

function generateTrackingGrid(medication) {
    const days = 7;
    let grid = '<div class="tracking-grid">';
    const currentDate = new Date();
    
    for (let i = 0; i < days; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const taken = medication.tracking[dateStr];
        const className = taken ? 'taken' : 'not-taken';
        
        grid += `
            <div class="day-cell ${className}">
                ${date.getDate()}/${date.getMonth() + 1}
            </div>
        `;
    }
    
    grid += '</div>';
    return grid;
}

function loadMedications() {
    const saved = localStorage.getItem('medications');
    if (saved) {
        medications = JSON.parse(saved);
    }
} 
