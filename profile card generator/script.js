const form = document.getElementById('profileForm');
const cardsContainer = document.getElementById('cardsContainer');

function getCardsFromStorage() {
  return JSON.parse(localStorage.getItem('profileCards')) || [];
}

function saveCardsToStorage(cards) {
  localStorage.setItem('profileCards', JSON.stringify(cards));
}

function renderCard(cardData, index) {
  const card = document.createElement('div');
  card.className = `card border-${cardData.borderStyle} ${cardData.theme}`;
  card.innerHTML = `
    <img src="${cardData.image}" />
    <h3>${cardData.name}</h3>
    <p>${cardData.bio}</p>
    <button onclick="toggleTheme(${index})">Toggle Theme</button>
    <button onclick="editCard(${index})">Edit</button>
    <button onclick="deleteCard(${index})">Delete</button>
  `;
  cardsContainer.appendChild(card);
}

function renderAllCards() {
  cardsContainer.innerHTML = '';
  const cards = getCardsFromStorage();
  cards.forEach((card, index) => renderCard(card, index));
}

function readImage(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function previewCard() {
  const name = document.getElementById('name').value;
  const bio = document.getElementById('bio').value;
  const imageFile = document.getElementById('image').files[0];
  const borderStyle = document.getElementById('borderStyle').value;
  if (!imageFile) return;
  readImage(imageFile, (imageData) => {
    renderCard({ name, bio, image: imageData, borderStyle, theme: 'light' }, -1);
  });
}

form.onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const bio = document.getElementById('bio').value;
  const imageFile = document.getElementById('image').files[0];
  const borderStyle = document.getElementById('borderStyle').value;
  if (!imageFile) return;

  readImage(imageFile, (imageData) => {
    const newCard = { name, bio, image: imageData, borderStyle, theme: 'light' };
    const cards = getCardsFromStorage();
    cards.push(newCard);
    saveCardsToStorage(cards);
    renderAllCards();
    form.reset();
  });
};

function deleteCard(index) {
  const cards = getCardsFromStorage();
  cards.splice(index, 1);
  saveCardsToStorage(cards);
  renderAllCards();
}

function toggleTheme(index) {
  const cards = getCardsFromStorage();
  cards[index].theme = cards[index].theme === 'light' ? 'dark' : 'light';
  saveCardsToStorage(cards);
  renderAllCards();
}

function editCard(index) {
  const cards = getCardsFromStorage();
  const card = cards[index];
  document.getElementById('name').value = card.name;
  document.getElementById('bio').value = card.bio;
  document.getElementById('borderStyle').value = card.borderStyle;
  deleteCard(index);
}

window.onload = renderAllCards;
