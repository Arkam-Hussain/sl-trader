const sellItemForm = document.getElementById('sellItemForm');

sellItemForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const itemName = document.getElementById('itemName').value;
  const itemDescription = document.getElementById('itemDescription').value;
  const itemImage = document.getElementById('itemImage').files[0];

  // Do something with the form data (e.g., send it to a server)
  // For demonstration purposes, we'll just log the data here.
  console.log('Item Name:', itemName);
  console.log('Item Description:', itemDescription);
  console.log('Item Image:', itemImage);
});
