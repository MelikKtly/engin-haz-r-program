// ===== Tab Switching =====
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.day-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Activate clicked
            tab.classList.add('active');
            const dayId = 'day-' + tab.dataset.day;
            const section = document.getElementById(dayId);
            if (section) {
                section.classList.add('active');
                // Smooth scroll to top of content
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Animate timeline blocks on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-block, .note-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
    });

    // Trigger initial animation for active section
    setTimeout(() => {
        document.querySelectorAll('.day-section.active .timeline-block, .day-section.active .note-card').forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateX(0)';
            }, i * 80);
        });
    }, 200);

    // Re-trigger animation on tab switch
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const dayId = 'day-' + tab.dataset.day;
            const section = document.getElementById(dayId);
            if (section) {
                const items = section.querySelectorAll('.timeline-block, .note-card');
                items.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateX(-20px)';
                });
                setTimeout(() => {
                    items.forEach((el, i) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateX(0)';
                        }, i * 80);
                    });
                }, 50);
            }
        });
    });
});
