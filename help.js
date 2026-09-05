// ============================================================
// HELP PAGE - FAQ Toggle
// ============================================================

function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(el => {
        if (el !== answer) {
            el.classList.remove('open');
            el.previousElementSibling.classList.remove('active');
        }
    });

    // Toggle current
    if (isOpen) {
        answer.classList.remove('open');
        button.classList.remove('active');
    } else {
        answer.classList.add('open');
        button.classList.add('active');
    }
}

console.log('❓ Help Page Loaded');
