export default function getRefs() {
    return {
        DEBOUNCE_DELAY: 300,
        searchForm: document.querySelector(".search-form"),
        galleryList: document.querySelector(".gallery"),
        loadMoreBtn: document.querySelector('[data-action="load-more"]'),
        spinner: document.querySelector('.spinner'),
   };
};