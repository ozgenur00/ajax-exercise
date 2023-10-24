console.log("Let's get this party started!");

let gifArea = document.getElementById('gif-area');
let searchInput = document.getElementById('search-input');

function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);

    let newCol = document.createElement('div');
    newCol.classList.add('col', 'colMargin');

    let newGif = document.createElement('img');
    newGif.src = res.data[randomIdx].images.original.url;
    newGif.style.width = '100%';

    newCol.appendChild(newGif);
    gifArea.appendChild(newCol);
  }
}

document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault(); // prevent page refresh on form submit

  let searchTerm = searchInput.ariaValueMax;
  searchInput.value = '';

  try {
    let response = await fetch(
      'http://api.giphy.com/v1/gifs/search?q=' +
        encodeURIComponent(searchTerm) +
        '&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
    );
    let data = await response.json();
    addGif(data);
  } catch (error) {
    console.error('Error fetching Giphy API:', error);
  }
});

document.getElementById('remove').addEventListener('click', function () {
  while (gifArea.firstChild) {
    gifArea.removeChild(gifArea.firstChild);
  }
});
// - Allow the user to search for a GIF and when the form is submitted, make an AJAX request to the Giphy API and return a single GIF
// - Once the Giphy API has responded with data, append the GIF to the page
// - Allow the user to search for as many GIFs as they would like and keep appending them to the page
// - Allow the user to remove all of the GIFs by clicking a button
