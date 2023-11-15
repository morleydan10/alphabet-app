let formRendered = false;
let submitedWord = false;
document.querySelector('#related-word-list').style.display = 'none';
document.querySelector('#word-div').style.display = 'none';
document.querySelector('#display-letter').style.display = 'none';

let imageButton = document.querySelector('.button-on-image')
imageButton.style.display = 'none'

let newWordList = document.getElementsByClassName('new-related-words');

fetch("http://localhost:3000/alphabet")
    .then((res) => res.json())
    .then((data) => {
        renderDisplay(data);
        data.forEach(letter => renderLetters(letter));
    });

function renderLetters(letters) {
    let letterList = document.getElementById("list-of-letters");
    let letter = document.createElement('li');
    letter.textContent = letters.Letter;
    letter.style.margin = 10;
    letter.addEventListener('click', () => letter.style.textDecoration = "line-through");
    letterList.append(letter);
};

function renderForm() {
    let formDiv = document.querySelector("#input-form");
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'submit');
    form.className = '.form'
    formDiv.appendChild(form);

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('word', 'newWord');
    input.setAttribute('placeholder', `Type new word here`);

    let button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.setAttribute("value", "Submit");
    button.className = 'button'
    form.append(input, button);

    form.addEventListener('submit', e => {
        e.preventDefault();
        handleFormSubmission(e.target[0].value);
        form.reset()
    })
}

function handleFormSubmission(wordSubmission) {
    let relatedWordList = document.querySelector('#related-word-list');
    
    let newWordLi = document.createElement('li');
    newWordLi.innerText = wordSubmission;
    newWordLi.className = 'new-related-words';
    relatedWordList.append(newWordLi);
    submitedWord = true;
}

function renderDisplay(letter) {
    document.addEventListener('keypress', e => {
  
        if (submitedWord = true) {
            for (let i = 0; i<newWordList.length; i++) {
                newWordList[i].remove()
            }
        } 
        // Check if the form has already been rendered
        if (!formRendered) {
            renderForm();
            formRendered = true;
        }

        if (e.target.tagName.toLowerCase() !== 'input') {
            let index = e.keyCode - 97;

            if (index >= 0 && index <= 25) {
        
                document.querySelector('#related-word-list').style.display = 'flex';
                document.querySelector('#word-div').style.display = 'flex';
                document.querySelector('#display-letter').style.display = 'flex';
                document.querySelector('.button-on-image').style.display = 'flex';

                let photo = document.querySelector('img');
                let word = document.querySelector('h3');
                let displayLetter = document.querySelector('.display-letter');
                // let altText = document.querySelector('#p');
                let liOne = document.querySelector('#li-one');
                let liTwo = document.querySelector('#li-two');

                photo.src = letter[index].Photo;
                photo.alt = letter[index].AltText;
                photo.title = letter[index].AltText;
                word.innerText = letter[index].Word;
                displayLetter.innerText = letter[index].Letter;
                liOne.innerText = letter[index].RelatedWords[0];
                liTwo.innerText = letter[index].RelatedWords[1];

                imageButton.addEventListener('click', () => {
                    photo.src = letter[index].livePhoto
                    imageButton.style.display = 'none'
                })
                photo.addEventListener('mouseover', (e) => {
            
                  let tooltipContent = photo.title
                  e.mouseover = tooltipContent
                  // let tooltipContent = e.target.getAttribute('alt')
                  // altText.innerHTML = tooltipContent
                  // altText.style.display = "block";
                  // altText.style.top = e.target.clientY + "px";
                  // altText.style.left = e.target.clientX + "px";
                  // altText.style.opacity = 1;
                });
                photo.addEventListener('mouseout', () => {
                altText.style.opacity = 0;
        });
        };
    }});
};

