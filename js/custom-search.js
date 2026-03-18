document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const categoryQuery = urlParams.get('category');

    const normalize = str => str.toLowerCase().replace(/[\s\-]+/g, '');

    // Populate search input field if search query exists
    if (searchQuery) {
        const searchInput = document.querySelector('input[name="search"]');
        if (searchInput) {
            searchInput.value = searchQuery;
        }
    }

    // Toggle h2 visibility and update content
    const searchH2 = document.querySelector('.search-result-title .search')?.closest('h2');
    const categoryH2 = document.querySelector('.search-result-title .category')?.closest('h2');

    if (searchQuery && searchH2) {
        document.querySelector('.search-result-title .search').textContent = searchQuery;
        searchH2.style.display = '';
        if (categoryH2) categoryH2.style.display = 'none';
    } else if (categoryQuery && categoryH2) {
        document.querySelector('.search-result-title .category').textContent = categoryQuery;
        document.querySelector('.search-result-title .category-desc').textContent = categoryQuery;
        categoryH2.style.display = '';
        if (searchH2) searchH2.style.display = 'none';
    }

    // Show/hide matching elements
    document.querySelectorAll('[data-search], [data-category]').forEach(el => {
        let show = true;

        if (searchQuery && el.hasAttribute('data-search')) {
            const keywords = el.getAttribute('data-search').toLowerCase().split(/\s+/);

            // Remove empty words caused by spaces
            const searchWords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);

            // All words must match (partial match allowed within each keyword)
            show = searchWords.every(searchWord =>
                keywords.some(keyword => keyword.includes(searchWord))
            );

        } else if (categoryQuery && el.hasAttribute('data-category')) {
            const elCategory = normalize(el.getAttribute('data-category'));
            const queryCategory = normalize(categoryQuery);
            show = elCategory === queryCategory;
        } else {
            show = false; // Hide if no match
        }

        el.style.display = show ? '' : 'none';
    });
});
