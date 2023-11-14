fetch("http://localhost:3000/alphabet")
.then((res) => res.json())
.then((data) => {
    console.log(data)
data.forEach(letter => {
    renderLetters(letter)
    })
})

function renderLetters(letters) {
    let letterList = document.getElementById("list-of-letters")

    let letter = document.createElement('li')
    letter.textContent = letters.Letter
    letter.addEventListener('click', (e) => {
        e.preventDefault();
        letter.style.textDecoration = "line-through";
    });

    letterList.append(letter);
};

fetch("http://localhost:3000/alphabet")
.then((res) => res.json())
.then((data) => {
        renderDisplay(data)
});

function renderDisplay(letter) {
    let displayLetter = document.querySelector('#display-letter');
    let photo = document.querySelector('img');
    let word = document.querySelector('h3');
    let altText = document.querySelector('#alt-text-div');
    // let tooltipDiv = document.querySelector("#tooltip-Div");
    let liOne = document.querySelector('#li-one')
    let liTwo = document.querySelector('#li-two')

    document.addEventListener('keypress', e => {
      let index = e.keyCode - 97; // subtract 97 to get the index
                                    // does not work with CAPS LOCK
      if (index >= 0 && index <= 25) {
        photo.src = letter[index].Photo;
        photo.alt = letter[index].AltText;
        word.innerText = letter[index].Word;
        displayLetter.innerText = letter[index].Letter
        liOne.innerText = letter[index].RelatedWords[0]
        liTwo.innerText = letter[index].RelatedWords[1]

        photo.addEventListener('mouseover', (e) => {

            let tooltipContent = e.target.getAttribute('alt')
            altText.innerHTML = tooltipContent
            altText.style.top = e.target.pageY + "px";
            altText.style.left = e.target.pageX + "px";
            altText.style.opacity = 1;
            
        });
    };
        photo.addEventListener('mouseout', () => {
            altText.style.opacity = 0;
        })
      });
    };
