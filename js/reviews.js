(function () {
    const form = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviewsContainer');
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.textContent = 'Загрузка...';
    reviewsContainer.parentElement.appendChild(preloader);

    document.addEventListener('DOMContentLoaded', () => {
        showPreloader();
        loadManualReviews();
        fetchComments();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.name.value.trim();
        const review = form.review.value.trim();

        if (!name || !review) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        const reviewObj = {
            id: Date.now(),
            name,
            review,
            date: new Date().toLocaleDateString()
        };

        saveManualReview(reviewObj);
        addReviewToDOM(reviewObj);
        form.reset();
    });

    async function fetchComments() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const comments = await response.json();
            const shuffled = comments.sort(() => 0.5 - Math.random());
            const randomComments = shuffled.slice(0, 5);

            randomComments.forEach((comment) => {
                addReviewToDOM({
                    id: comment.id,
                    name: comment.name,
                    review: comment.body,
                    date: 'Данные сервиса'
                });
            });
        } catch (error) {
            showError('Что-то пошло не так. Попробуйте позже');
            console.error(error);
        } finally {
            hidePreloader();
        }
    }

    function saveManualReview(review) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function loadManualReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach(addReviewToDOM);
    }

    function addReviewToDOM({ id, name, review, date }) {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.dataset.id = id;

        reviewElement.innerHTML = `
            <h4>${name}</h4>
            <p><b>${date}:</b></p>
            <p>${review}</p>
            <button class="delete-review">Удалить отзыв</button>
        `;

        reviewElement.querySelector('.delete-review').addEventListener('click', () => {
            deleteReview(id);
            reviewElement.remove();
        });

        reviewsContainer.appendChild(reviewElement);
    }

    function deleteReview(id) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const updatedReviews = reviews.filter((review) => review.id !== id);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    }

    function showPreloader() {
        preloader.style.display = 'block';
    }

    function hidePreloader() {
        preloader.style.display = 'none';
    }

    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.textContent = message;
        reviewsContainer.parentElement.appendChild(errorElement);
    }
})();
