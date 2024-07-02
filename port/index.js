document.addEventListener('DOMContentLoaded', function () {
    let sections = document.querySelectorAll('section');
    let currentSection = 0;
    let scrollCount = 0;
    let lastDirection = 0;

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
            currentSection = index;
            scrollCount = 0; // Reset the scroll count after navigating
        }
    }

    window.addEventListener('wheel', function (event) {
        let direction = event.deltaY > 0 ? 1 : -1;

        if (direction === lastDirection) {
            scrollCount++;
        } else {
            scrollCount = 1; // Reset to 1 to count the new direction
        }

        lastDirection = direction;

        if (scrollCount >= 3) {
            if (direction > 0) {
                scrollToSection(currentSection + 1); // Scroll down
            } else {
                scrollToSection(currentSection - 1); // Scroll up
            }
        }
    });
});

(function() {
    emailjs.init("service_42seime"); 
})();

function sendEmail(event) {
    event.preventDefault();

    var params = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Email sent successfully!');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send email.');
        });
}

// Add event listener to the form
document.getElementById('contact-form').addEventListener('submit', sendEmail);

