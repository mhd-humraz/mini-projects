// Planet data array
const planets = [
    {
        name: "Mercury",
        diameter: 4879,
        distance: 57.9,
        orbitalPeriod: 88,
        dayLength: 1407.6,
        moons: 0,
        temperature: "167",
        fact: "Smallest planet in our solar system",
        icon: "☿"
    },
    {
        name: "Venus",
        diameter: 12104,
        distance: 108.2,
        orbitalPeriod: 224.7,
        dayLength: 5832.5,
        moons: 0,
        temperature: "464",
        fact: "Hottest planet with a thick atmosphere",
        icon: "♀"
    },
    {
        name: "Earth",
        diameter: 12756,
        distance: 149.6,
        orbitalPeriod: 365.2,
        dayLength: 24,
        moons: 1,
        temperature: "15",
        fact: "Only known planet to support life",
        icon: "♁"
    },
    {
        name: "Mars",
        diameter: 6792,
        distance: 227.9,
        orbitalPeriod: 687,
        dayLength: 24.7,
        moons: 2,
        temperature: "-65",
        fact: "Known as the Red Planet",
        icon: "♂"
    },
    {
        name: "Jupiter",
        diameter: 142984,
        distance: 778.6,
        orbitalPeriod: 4331,
        dayLength: 9.9,
        moons: 95,
        temperature: "-110",
        fact: "Largest planet in our solar system",
        icon: "♃"
    },
    {
        name: "Saturn",
        diameter: 120536,
        distance: 1433.5,
        orbitalPeriod: 10747,
        dayLength: 10.7,
        moons: 146,
        temperature: "-140",
        fact: "Famous for its spectacular rings",
        icon: "♄"
    },
    {
        name: "Uranus",
        diameter: 51118,
        distance: 2872.5,
        orbitalPeriod: 30589,
        dayLength: 17.2,
        moons: 28,
        temperature: "-195",
        fact: "Rotates on its side",
        icon: "♅"
    },
    {
        name: "Neptune",
        diameter: 49528,
        distance: 4495.1,
        orbitalPeriod: 59800,
        dayLength: 16.1,
        moons: 16,
        temperature: "-200",
        fact: "Windiest planet with supersonic speeds",
        icon: "♆"
    }
];

// Function to populate the table
function populateTable(planetsArray = planets) {
    const tbody = document.querySelector('#planetTable tbody');
    tbody.innerHTML = '';
    
    planetsArray.forEach(planet => {
        const row = document.createElement('tr');
        
        // Format large numbers with commas
        const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        row.innerHTML = `
            <td>
                <div class="planet-name">
                    <span class="planet-icon ${planet.name.toLowerCase()}">${planet.icon}</span>
                    ${planet.name}
                </div>
            </td>
            <td>${formatNumber(planet.diameter)}</td>
            <td>${planet.distance}</td>
            <td>${formatNumber(planet.orbitalPeriod)}</td>
            <td>${planet.dayLength}</td>
            <td>${planet.moons}</td>
            <td>${planet.temperature}</td>
            <td>${planet.fact}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Sorting functions
function sortByName() {
    const sorted = [...planets].sort((a, b) => a.name.localeCompare(b.name));
    populateTable(sorted);
}

function sortByDiameter() {
    const sorted = [...planets].sort((a, b) => b.diameter - a.diameter);
    populateTable(sorted);
}

function sortByDistance() {
    const sorted = [...planets].sort((a, b) => a.distance - b.distance);
    populateTable(sorted);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Populate table on page load
    populateTable();
    
    // Add event listeners to buttons
    document.getElementById('sortByName').addEventListener('click', sortByName);
    document.getElementById('sortByDiameter').addEventListener('click', sortByDiameter);
    document.getElementById('sortByDistance').addEventListener('click', sortByDistance);
    document.getElementById('resetSort').addEventListener('click', () => populateTable());
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('planetTable');
    
    table.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'TD') {
            e.target.style.transition = 'all 0.3s ease';
        }
    });
});
