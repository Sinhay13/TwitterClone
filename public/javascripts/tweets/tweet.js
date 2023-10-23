// Wait for the DOM content to load before binding the tweet functionality
window.addEventListener('DOMContentLoaded', () => {
    bindTweet(); // Call the bindTweet function to bind the tweet delete functionality to buttons
});

// Function to bind the tweet delete functionality to buttons
function bindTweet() {
    const elements = document.querySelectorAll(".btn-danger"); // Select elements with the class "btn-danger"
    const tweetContainer = document.querySelector("#tweet-list-container"); // Get the tweet container element
    console.log("elements"); // Log the elements to the console
    
    // Loop through each element with the class "btn-danger"
    elements.forEach(e => {
        // Add a click event listener to each element
        e.addEventListener("click", ($event) => {
            const tweetId = $event.target.getAttribute('tweetid'); // Get the tweet ID from the attribute
            axios.delete('/tweets/' + tweetId) // Send a delete request to the server
                 .then(function(response) {
                    tweetContainer.innerHTML = response.data; // Update the tweet container with the new data
                    bindTweet(); // Rebind the tweet functionality to updated elements
                 })
                 .catch(function(err) {
                    console.log(err); // Log any errors
                 });
        });
    });
}