const params = new URLSearchParams(window.location.search);
const cryptoId = params.get("id");
async function fetchCryptoDetails() {
    try {
        if (!cryptoId) {
            console.error("No Crypto ID found in URL!");
            document.getElementById("cryptoDetails").innerHTML = "<p class='text-danger'>No cryptocurrency selected.</p>";
            return;
        }

        // Fetch crypto details with sparkline data
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}?sparkline=true`);
        const data = await response.json();

        // Check and log the response
        console.log("Crypto Details:", data);

        // Display crypto name
        document.getElementById("cryptoName").textContent = data.name;

        // Display symbol
        document.getElementById("cryptoSymbol").textContent = data.symbol.toUpperCase();

        // Display current price
        document.getElementById("cryptoPrice").textContent = `$${data.market_data.current_price.usd.toFixed(2)}`;

        // Display market cap
        document.getElementById("cryptoMarketCap").textContent = `$${data.market_data.market_cap.usd.toLocaleString()}`;

        // Display total volume
        document.getElementById("cryptoVolume").textContent = `$${data.market_data.total_volume.usd.toLocaleString()}`;

        // Generate chart data
        const prices = data.market_data.sparkline_7d?.price || [];
        if (prices.length === 0) {
            console.warn("No sparkline data available for this cryptocurrency.");
            document.getElementById("priceChart").remove(); // Remove chart canvas if no data
        } else {
            const labels = prices.map((_, i) => `Day ${i + 1}`);
            const ctx = document.getElementById("priceChart").getContext("2d");
            new Chart(ctx, {
                type: "line",
                data: {
                    labels,
                    datasets: [{
                        label: "Price (USD)",
                        data: prices,
                        borderColor: "rgba(75, 192, 192, 1)",
                        tension: 0.1
                    }]
                }
            });
        }

    } catch (error) {
        console.error("Error fetching crypto details:", error);
        document.getElementById("cryptoDetails").innerHTML = "<p class='text-danger'>Failed to load cryptocurrency details.</p>";
    }
}

// Initialize fetching crypto details on page load
document.addEventListener("DOMContentLoaded", fetchCryptoDetails);