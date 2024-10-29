let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

function displayIpInfo(ip, location) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>IP Address Info</h3>
        <p><strong>IP Address:</strong> ${ip}</p>
        <p><strong>City:</strong> ${location.city}</p>
        <p><strong>Region:</strong> ${location.region}</p>
        <p><strong>Country:</strong> ${location.country_name}</p>
        <button onclick="copyToClipboard('${ip}')">Copy IP Address</button>
    `;
    saveSearch(ip); 
}

function saveSearch(ip) {
    if (!recentSearches.includes(ip)) {
        recentSearches.push(ip);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        updateRecentSearches();
    }
}

function updateRecentSearches() {
    const searchesList = document.getElementById('searchesList');
    searchesList.innerHTML = recentSearches.map(ip => `<li>${ip}</li>`).join('');
}

function copyToClipboard(ip) {
    navigator.clipboard.writeText(ip).then(() => {
        alert("IP Address copied to clipboard!");
    });
}

document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
});


document.getElementById('submitBtn').addEventListener('click', () => {
    const ipInput = document.getElementById('ipInput').value;
  
    getLocation(ipInput).then(location => {
        displayIpInfo(ipInput, location);
    });
});

updateRecentSearches();

async function getLocation(ip) {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    return response.json();
}
