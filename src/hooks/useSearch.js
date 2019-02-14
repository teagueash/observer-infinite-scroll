import { useState } from "react";
import Unsplash from "unsplash-js";

const unsplash = new Unsplash({
  applicationId:
    "9a02406d4cedcbe1d14b150cb8e026723fa43b9a432a4ba7e5a4ed62f6ace324",
  secret: "9189f22fc650021cde95ef2702dcf3b7a96a501f679117532e22ff6b68a7c354",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

// once user has scrolled to bottom, fetch next page
const onPaginatedSearch = e => {
  this.fetchImages(this.input.value, this.state.page + 1);
};

const fetchImages = (value, page) => {
  // call this.resultsController() after receiving response from API call
  alert("A value was submitted", value);

  unsplash.search
    .photos(value, page)
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err));
};

// updateResults = result => prevState => ({
//   results: [...prevState.results, ...result.results],
//   page: result.page,
//   isLoading: false
// });

export const useSearch = (initialSearch = [], page = 0) => {
  const [searchResult, setSearchResult] = useState(initialSearch, page);

  return {
    searchFirstQuery: input => {
      if (input !== "") {
        const res = fetchImages(input, 0);
        setSearchResult(res);
      }
      input !== "" && fetchImages(input, 0);
    },
    searchResult: ""
  };
};
