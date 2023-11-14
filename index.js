let formRendered = false;
document.querySelector('#related-word-list').style.display = 'none';
document.querySelector('#word-div').style.display = 'none';
document.querySelector('#display-letter').style.display = 'none';

fetch("http://localhost:3000/alphabet")
    .then((res) => res.json())
    .then((data) => {
        renderDisplay(data)
        data.forEach(letter => renderLetters(letter))
    });

function renderLetters(letters) {
    let letterList = document.getElementById("list-of-letters")
    let letter = document.createElement('li')
    letter.textContent = letters.Letter
    letter.addEventListener('click', () => letter.style.textDecoration = "line-through");
    letterList.append(letter);
};

function renderForm() {
    let formDiv = document.querySelector("#input-form");
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'submit');
    formDiv.appendChild(form);

    let newWord = document.createElement('input');
    newWord.setAttribute('type', 'text');
    newWord.setAttribute('word', 'newWord');
    newWord.setAttribute('placeholder', 'type a new word');

    let button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.setAttribute("value", "Submit");
    form.append(newWord, button);

    form.addEventListener('submit', e => {
        e.preventDefault();
        handleFormSubmission(e.target[0].value);
    })
}

function handleFormSubmission(wordSubmission) {
    let relatedWordList = document.querySelector('#related-word-list');
    let newWordLi = document.createElement('li');
    newWordLi.innerText = wordSubmissionl;
    newWordLi.className = 'related-words';
    relatedWordList.append(newWordLi);
}

function renderDisplay(letter) {
    document.addEventListener('keypress', e => {
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
                document.querySelector('#display-letter').style.display = 'flexsdds';

                let photo = document.querySelector('img');
                let word = document.querySelector('h3');
                let displayLetter = document.querySelector('.display-letter');
                let altText = document.querySelector('#p');
                let liOne = document.querySelector('#li-one');
                let liTwo = document.querySelector('#li-two');

                photo.src = letter[index].Photo;
                photo.alt = letter[index].AltText;
                word.innerText = letter[index].Word;
                displayLetter.innerText = letter[index].Letter;
                liOne.innerText = letter[index].RelatedWords[0];
                liTwo.innerText = letter[index].RelatedWords[1];

                photo.addEventListener('mouseover', () => 
                    altText.innerText = letter[index].AltText);
                photo.addEventListener('mouseout', () => altText.innerText = '')
            }
        }
    });
}