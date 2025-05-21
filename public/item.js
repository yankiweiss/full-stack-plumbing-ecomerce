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


