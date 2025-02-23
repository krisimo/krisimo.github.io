


// Retrieve stored credentials
const API_KEY = localStorage.getItem("apiKey");
const ACCESS_TOKEN = localStorage.getItem("accessToken");

// Headers for API requests
const apiHeaders = {
    "Authorization": `Bearer ${ACCESS_TOKEN}`,
    "X-Noroff-API-Key": API_KEY,
    "Content-Type": "application/json",
};

// Function to fetch jackets from API
async function fetchJacketsFromAPI(page = 1) {
    try {
        const response = await fetch(`${API_BASE_URL}/jackets?page=${page}`, {
            method: "GET",
            headers: apiHeaders,
        });

        if (!response.ok) {
            throw new Error("Failed to fetch jackets from API");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching jackets:", error);
    }
}

// Function to fetch a single jacket
async function fetchJacketById(jacketId) {
    try {
        const response = await fetch(`${API_BASE_URL}/jackets/${jacketId}`, {
            method: "GET",
            headers: apiHeaders,
        });

        if (!response.ok) {
            throw new Error(`Jacket with ID ${jacketId} not found`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching jacket:", error);
    }
}
