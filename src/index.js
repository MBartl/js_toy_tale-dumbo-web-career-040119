const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
const toyList = document.querySelector('#toy-collection')

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => data.forEach(slapItOnTheList))

function slapItOnTheList(toy) {
  const div = document.createElement('div');
  div.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} alt='${toy.name} picture' />
  <p>${toy.likes} likes</p>
  <button class='like-btn'>Like <3</button>`;
  toyList.appendChild(div);
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
