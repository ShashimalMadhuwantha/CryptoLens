async function fetchCryptoNews() {
    const newsContainer = document.getElementById('newsContainer');
    const API_KEY = '789c14dd8209404b85a3a623ec02e6fa'; // Replace with your NewsAPI key

    try {
        // Fetching the news data from NewsAPI
        const response = await fetch(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${API_KEY}`);
        const newsData = await response.json();

        // Clearing previous news
        newsContainer.innerHTML = "";

        // Looping through the fetched news and adding them to the container
        newsData.articles.forEach(news => {
            const newsElement = document.createElement("div");
            newsElement.classList.add("col-md-4", "mb-4", "news-item");
            newsElement.innerHTML = `
                <div class="card">
                    <img src="${news.urlToImage}" class="card-img-top" alt="news image">
                    <div class="card-body">
                        <h6><a href="${news.url}" target="_blank">${news.title}</a></h6>
                        <p>${news.description ? news.description : 'No description available.'}</p>
                    </div>
                    <div class="card-footer">
                        <small>Published: ${new Date(news.publishedAt).toLocaleDateString()}</small>
                    </div>
                </div>
            `;
            newsContainer.appendChild(newsElement);
        });
    } catch (error) {
        console.error("Error fetching crypto news:", error);
        newsContainer.innerHTML = "<p>Sorry, we couldn't fetch the news at this moment. Please try again later.</p>";
    }
}

// Calling the function to load the news when the page loads
window.onload = fetchCryptoNews;
