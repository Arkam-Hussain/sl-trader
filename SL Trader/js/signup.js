document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // You can perform validation and backend interactions here
    
    // Example: Display a message
    const messageElement = document.getElementById("message");
    messageElement.textContent = "Sign up successful!";
    messageElement.style.color = "#008000";
});
