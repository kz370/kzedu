// Main JavaScript for Shared Logic

document.addEventListener('DOMContentLoaded', () => {
    // Add a subtle fade-in effect to the body for page transitions
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    console.log("KZEDU System Design Module Loaded");
});
