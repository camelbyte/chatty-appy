const form = document.getElementById('chat-form');
const responseText = document.getElementById('response-text');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const prompt = document.getElementById('user-prompt').value;

    responseText.textContent = 'Loading...';

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responseText.innerHTML = `
            <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
                <p>${data.apiResponse}</p>
                <a href="/" class="mt-4 block text-blue-500 hover:text-blue-600">Go Back</a>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        responseText.textContent = 'An error occurred. Please try again later.';
    }
});