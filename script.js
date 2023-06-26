

usersUrl = "https://ajax.test-danit.com/api/json/users";
postsUrl = "https://ajax.test-danit.com/api/json/posts";


const containerDiv = document.querySelector(".container");


class Card {
  constructor(title, text, name, email, postId) {
    this.title = title;
    this.text = text;
    this.name = name;
    this.email = email;
    this.postId = postId;
  }
}


const usersRequest = fetch("https://ajax.test-danit.com/api/json/users").then(response => response.json());
const postsRequest = fetch("https://ajax.test-danit.com/api/json/posts").then(response => response.json());


Promise.all([usersRequest, postsRequest])
  .then(([usersInfo, postsInfo]) => {

    for (user of usersInfo) {
      for (post of postsInfo) {
        if (user.id === post.userId) {
          let card = new Card
          card.name = user.name
          card.email = user.email
          card.title = post.title
          card.text = post.body

          const showCard = `
<div class="card">


<header>
  <div class="profile-picture"></div>
  <div class="info-section">
    <h2 class="title">${card.title}</h2>
    <a href="" class="name-link">
      <p class="name">@${card.name}</p>
    </a>
  </div>
</header>

<main>
  <p class="text">
  ${card.text}
  </p>
</main>
  <footer>
    <p class="email">${card.email}</p>

    <button class="delete-btn">
      Delete
    </button>

  </footer>

  
</div>
`

          containerDiv.insertAdjacentHTML('beforeend', showCard)

        }
      }
    }

  })

  .catch(error => {
    console.log(error);
  });

setTimeout(() => {
  const deleteBtn = document.querySelectorAll("button");
  const childCards = containerDiv.querySelectorAll(".card");


  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', () => {
      console.log(`clicked ${i} index item of Buttons`);
    },

      deleteBtn[i].onclick = function () {
        console.log('clicked also');

        fetch(`https://ajax.test-danit.com/api/json/posts/${i + 1}`, {
          method: "DELETE"
        })
          .then(childCards[i].style.display = "none");

      }

    )
  }
}, 1000)










