document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        
        const nickname = document.getElementById('nickname').value;
        const rant = document.getElementById('rant').value;
        
        // Check if both fields are filled
        if (!nickname || !rant) {
            alert('Please fill out both fields!');
            return;
        }

        // Send data to the backend
        try {
            const response = await fetch('http://localhost:3001/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname, rant })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                thankYouMessage.textContent = result.message; // Show success message
                form.reset(); // Clear form
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
