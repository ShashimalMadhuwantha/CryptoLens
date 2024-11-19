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

        // Display additional details
        const detailsHTML = `
            <p><strong>Symbol:</strong> ${data.symbol.toUpperCase()}</p>
            <p><strong>Current Price:</strong> $${data.market_data.current_price.usd}</p>
            <p><strong>Market Cap:</strong> $${data.market_data.market_cap.usd.toLocaleString()}</p>
            <p><strong>Total Volume:</strong> $${data.market_data.total_volume.usd.toLocaleString()}</p>
        `;
        document.getElementById("cryptoDetails").innerHTML = detailsHTML;

    } catch (error) {
        console.error("Error fetching crypto details:", error);
        document.getElementById("cryptoDetails").innerHTML = "<p class='text-danger'>Failed to load cryptocurrency details. Please try again later.</p>";
    }
}

// Fetch and display the crypto details
fetchCryptoDetails();
