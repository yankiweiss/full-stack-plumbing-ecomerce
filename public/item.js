function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const itemId = getQueryParam('id'); // e.g. from URL



fetch(`https://full-stack-plumbing-ecomerce.vercel.app/items/${encodeURIComponent(itemId)}`)
  .then(res => {
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
  })
  .then(item => {
    document.getElementById('item-name').textContent = item.name;
    // show image if available
  })
  .catch(err => {
    console.error(err);
    document.getElementById('item-name').textContent = 'Failed to load item';
  });


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const itemDisplayedID = getQueryParam('id'); // e.g. from URL

const items = document.getElementById('items')

fetch(`https://full-stack-plumbing-ecomerce.vercel.app/items/${encodeURIComponent(itemDisplayedID)}`)
  .then(res => {
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
  }).then((data) => displayData(data))

  .catch(err => {
    console.error(err);
    document.getElementById('item-name').textContent = 'Failed to load item';
  });

function displayData(data) {

  const div = document.createElement('div')
  div.className = 'item';

  div.innerHTML = `
    
    
    
    <img src="${data.image}">
    
    <h1>${data.name}</h1>
    
    <h4>Price: ${data.price}</h4>
    
    <h5>Description: ${data.description}</h5>`

  items.appendChild(div)
}





