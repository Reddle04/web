(function () {
    const form = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviewsContainer');

    document.addEventListener('DOMContentLoaded', loadReviews);

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

        saveReview(reviewObj);
        addReviewToDOM(reviewObj);
        form.reset();
    });

    function saveReview(review) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function loadReviews() {
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
})();
