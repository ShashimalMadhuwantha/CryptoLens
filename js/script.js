const cryptoContainer = document.getElementById("cryptoContainer");
const searchBar = document.getElementById("searchBar");

const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";

// Fetch crypto data
async function fetchCryptoData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayCryptos(data);
    } catch (error) {
        console.error("Error fetching crypto data:", error);
    }
}

// Display top cryptocurrencies
function displayCryptos(cryptos) {
    cryptoContainer.innerHTML = "";
    cryptos.forEach((crypto) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "col-sm-6", "mb-4");
        card.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <img src="${crypto.image}" alt="${crypto.name}" class="img-fluid" width="50">
                    <h5 class="card-title">${crypto.name}</h5>
                    <p class="card-text">Price: $${crypto.current_price.toFixed(2)}</p>
                    <p class="card-text">Market Cap: $${(crypto.market_cap / 1e9).toFixed(2)}B</p>
                    <a href="details.html?id=${crypto.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
        cryptoContainer.appendChild(card);
    });
}

// Search functionality
searchBar.addEventListener("input", async (event) => {
    const query = event.target.value.toLowerCase();
    const response = await fetch(API_URL);
    const data = await response.json();
    const filteredData = data.filter((crypto) => crypto.name.toLowerCase().includes(query));
    displayCryptos(filteredData);
});

// Fetch and display crypto data on page load
fetchCryptoData();
