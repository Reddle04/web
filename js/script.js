(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const menuItems = document.querySelectorAll('.header__list li a');
        const currentPage = document.location.pathname.split('/').pop();

        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href.includes(currentPage)) {
                item.classList.add('active');
            }
        });

        menuItems.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.style.backgroundColor = '#2c3e50';
                item.style.color = '#fff';
            });
            item.addEventListener('mouseout', () => {
                item.style.backgroundColor = '';
                item.style.color = '';
            });
        });
    });

    window.addEventListener('load', () => {
        const performance = window.performance;
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        const footer = document.querySelector('.footer');
        if (footer) {
            const p = document.createElement('p');
            p.textContent = `Время загрузки страницы: ${loadTime / 1000} c`;
            footer.appendChild(p);
        }
    });
})();
