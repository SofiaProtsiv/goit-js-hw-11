"use strict";

import getRefs from '../js/getRefs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import apiService from  './fetchPhotos'
import galleryList from '../templates/galleryList.hbs';


const refs = getRefs();

refs.searchForm.addEventListener("submit", onSubmit);
refs.loadMoreBtn.addEventListener('click', fetchPhotos);
if(apiService.query === ""){
  hideButton();
  spinnerOff();
  disableButton();
  refs.galleryList.innerHTML = '';
}
function onSubmit (event) {
  event.preventDefault();

  apiService.query = event.target.elements.query.value;

  if(apiService.query === ""){
    hideButton();
    disableButton();
    refs.galleryList.innerHTML = '';
    return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
  } 
  refs.galleryList.innerHTML = '';
  apiService.resetPage();
  fetchPhotos();
}

function fetchPhotos() {
  showButton();
  spinnerOn();
  disableButton();


  apiService.fetchPhotos()
  .then(photo => {
      const markup = galleryList(photo.hits);    
      refs.galleryList.insertAdjacentHTML('beforeend', markup);
      const modal = new SimpleLightbox('.gallery a');

      // const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
      // window.scrollBy({
      //   top: cardHeight * 2,
      //   behavior: "smooth",
      // });
      
      if(photo.totalHits === 0){
        hideButton();
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      if(apiService.page === 2){
        return Notiflix.Notify.info(`Hooray! We found ${photo.totalHits} images.`)
      }
      if (((apiService.page-1) * apiService.perPage) >= photo.totalHits) {
        hideButton();
        return Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      spinnerOff();
      enableButton();
    });

}

function showButton() {
  refs.loadMoreBtn.classList.remove("is-hidden");
};

function hideButton() {
  refs.loadMoreBtn.classList.add("is-hidden");
  refs.loadMoreBtn.innerHTML = '';
};

function enableButton() {
  refs.loadMoreBtn.removeAttribute("disabled");
  refs.loadMoreBtn.innerHTML = 'Load more';
};

function disableButton() {
  refs.loadMoreBtn.setAttribute("disabled", 'true');
  refs.loadMoreBtn.innerHTML = 'Loading';
};

function spinnerOn() {
  refs.spinner.classList.remove('is-hidden')
}

function spinnerOff() {
  refs.spinner.classList.add('is-hidden')
}