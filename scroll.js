document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.underlineNav');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const nextSectionTop = sections[index + 1] ? sections[index + 1].offsetTop : Number.POSITIVE_INFINITY;
            
            if (window.pageYOffset >= sectionTop - 50 && window.pageYOffset < nextSectionTop - 50) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});