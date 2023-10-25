// Get reference to HTML elements
const $formSearch = $('.form-search');
const $query = $('#query');
const $gifArea = $('#gif-area');
const $removeButton = $('#remove');

$formSearch.on('submit', async function (e) {
  e.preventDefault();

  let searchTerm = $query.val();
  $query.val(''); // clear the input field

  // Make API request using Axios
  const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      q: searchTerm,
      api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym',
    },
  });

  // Check if there are results, then append the first GIF to the page
  if (response.data.data.length) {
    let gifUrl = response.data.data[0].images.original.url;
    $gifArea.append(`<img src="${gifUrl}" alt="${searchTerm} gif">`);
  }
});

$removeButton.on('click', function () {
  $gifArea.empty(); // Remove all GIFs
});

