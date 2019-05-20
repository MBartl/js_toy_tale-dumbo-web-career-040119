const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const submitForm = document.querySelector('.add-toy-form')
let addToy = false

// List of toys, so cards can be added
const toyList = document.querySelector('#toy-collection')

// Get all toys from localhost API on page load (render is in the HTML)
fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(slapToyOnTheList))

function slapToyOnTheList(toy) {
  const div = document.createElement('div');
  div.className = 'card'

  div.innerHTML =
  `<h2>${ toy.name }</h2>
  <img src=${ toy.image } class='toy-avatar' alt='${ toy.name } Picture' />`;
  if (toy.likes == 1 || toy.likes == -1) {
    div.innerHTML += `<p><span id='toy-${ toy.id }-likes'>${ toy.likes }</span> like</p>`;
  }
  else {
    div.innerHTML += `<p><span id='toy-${ toy.id }-likes'>${ toy.likes }</span> likes</p>`;
  };
  div.innerHTML += `<button class='like-btn'>Like 💛</button> <button class='dislike-btn'>Dislike 🗑</button>`;

  const likeButton = div.querySelector('.like-btn');
  likeButton.addEventListener('click', increaseLikes)
  likeButton.dataset.toyId = toy.id

  const dislikeButton = div.querySelector('.dislike-btn')
  dislikeButton.addEventListener('click', decreaseLikes)
  dislikeButton.dataset.toyId = toy.id

  toyList.appendChild(div);
}


function createNewToy(event) {
  event.preventDefault();
  const toyName = submitForm.name.value;
  const toyImage = submitForm.image.value;
  if (toyName !== "" && toyImage !== "") {
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify( { name: toyName, image: toyImage, likes: 0 } )
    })
      .then(res => res.json())
      .then(newToy => (slapToyOnTheList(newToy)));
  }
  else {
    alert("You must enter a name and an image.");
  }
}


function increaseLikes(event) {
  const button = event.target
  const toyId = button.dataset.toyId

  const likesSpan = document.getElementById(`toy-${ toyId }-likes`)
  const likes = parseInt(likesSpan.innerText) + 1

  fetch(`http://localhost:3000/toys/${ toyId }`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ likes: likes }),
  })
    .then((response) => {return response.json()})
    .then((data) => {likesSpan.innerText = data.likes})
}

function decreaseLikes(event) {
  const button = event.target
  const toyId = button.dataset.toyId

  const likesSpan = document.getElementById(`toy-${ toyId }-likes`)
  const likes = parseInt(likesSpan.innerText) - 1

  fetch(`http://localhost:3000/toys/${ toyId }`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ likes: likes }),
  })
    .then((response) => {return response.json()})
    .then((data) => {likesSpan.innerText = data.likes})
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    submitForm.addEventListener('submit', createNewToy)
  } else {
    toyForm.style.display = 'none'
  }
})
