document.addEventListener('DOMContentLoaded', function() {
    // This JavaScript is primarily for local testing
    // Most functionality is handled by FormSubmit when deployed
    
    // Only attach event listener if we're not using the action attribute (local testing)
    const form = document.getElementById('contactForm');
    
    if (form && !form.getAttribute('action')) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (simple validation for demo)
            if (!name || !email || !message) {
                document.getElementById('errorMessage').style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
                return;
            }
            
            // Show success message (only for local testing)
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
            
            // Reset form
            form.reset();
            
            console.log('Form submitted (local test):', {
                name,
                email,
                phone,
                subject,
                message,
                to: 'echoaisystems@gmail.com'
            });
        });
    }
});