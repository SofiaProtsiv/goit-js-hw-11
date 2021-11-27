export default {
apiKey: '18667452-b6cf3b15ecb06490e1251bb0b',
baseUrl: "https://pixabay.com/api",
searchQuery: '',
perPage: 40,
page: 1,
image_type: "photo",
orientation: "horizontal",
safesearch: true,

fetchPhotos() {
    const url = `${this.baseUrl}/?q=${this.query}&image_type=photo&orientation=horizontal&per_page=${this.perPage}&key=${this.apiKey}&page=${this.page}`;
    return fetch(url)
        .then(res => {
            this.incrementPage();
            return res.json();
        })
      },

      resetPage() {
          this.page = 1;
      },
  
      incrementPage() {
          this.page += 1;
      },

      get query() {
          return this.searchQuery.trim();
      },
  
      set query(value) {
          this.searchQuery = value;
      },
  };