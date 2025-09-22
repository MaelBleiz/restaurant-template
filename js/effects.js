// Button reveal effect after 3 seconds
document.addEventListener('DOMContentLoaded', () => {
  // Wait for the button to be created by main.js
  setTimeout(() => {
    const button = document.querySelector('.reservation-button');
    if (button) {
      // Add revealed class after 3 seconds
      setTimeout(() => {
        button.classList.add('revealed');
      }, 1500);
    }
  }, 100); // Small delay to ensure button is created
});
