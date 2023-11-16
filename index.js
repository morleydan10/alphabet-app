let formRendered = false;
let submitedWord = false;
let newWordList = document.getElementsByClassName('new-related-words');
let footerPhoto = document.querySelector('.footer-image')
let imageButton = document.querySelector('.button-on-image');
imageButton.style.display = 'none';

fetch("http://localhost:3000/alphabet")
    .then((res) => res.json())
    .then((data) => {
        renderDisplay(data);
        data.forEach(letter => renderLetters(letter));
    });

function renderLetters(letters) {
    let letterList = document.getElementById("list-of-letters");
    let letter = document.createElement('li');
    letter.textContent = letters.letter;
    letter.addEventListener('click', () => letter.style.textDecoration = "line-through");
    letterList.append(letter);
};

let form = document.querySelector('#form')
form.addEventListener('submit', e => {
        e.preventDefault();
        handleFormSubmission(e.target[0].value);
        form.reset();
})

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
                newWordList[i].remove()}};

        if (e.target.tagName.toLowerCase() !== 'input') {
            let index = e.keyCode - 97;

            if (index >= 0 && index <= 25) {
                document.querySelector('#related-word-list').style.display = 'flex';
                document.querySelector('#word-div').style.display = 'flex';
                document.querySelector('#display-letter').style.display = 'flex';
                document.querySelector('.button-on-image').style.display = 'flex';
                form.style.display = 'block';
                footerPhoto.style.display = 'flex'

                let photo = document.querySelector('img');
                let word = document.querySelector('h3');
                let displayLetter = document.querySelector('.display-letter');
                let liOne = document.querySelector('#li-one');
                let liTwo = document.querySelector('#li-two');

                photo.src = letter[index].photo;
                photo.alt = letter[index].altText;
                photo.title = letter[index].altText;
                word.innerText = letter[index].word;
                displayLetter.innerText = letter[index].letter;
                liOne.innerText = letter[index].relatedWords[0];
                liTwo.innerText = letter[index].relatedWords[1];

                imageButton.addEventListener('click', () => {
                    photo.src = letter[index].livePhoto;
                    imageButton.style.display = 'none';
                });
                photo.addEventListener('mouseover', (e) => {
                    let tooltipContent = photo.title;
                    e.mouseover = tooltipContent;
                });
            } else {
                alert('Oops! Remember to press letters only.')
            }
        };
    });
};

