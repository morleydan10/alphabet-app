fetch("http://localhost:3000/alphabet")
.then((res) => res.json())
.then((data) => {
    console.log(data)
    renderAltText(data)
data.forEach(letter => {
    renderLetters(letter);
});;
});

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

// function renderAltText (letters) {
// let imageDiv = document.getElementById("image-div")
// let altTextDiv = document.getElementById("alt-text-div")
// let altText = document.createElement('p')

// imageDiv.addEventListener('mouseover', (e) => {
//     e.preventDefault(),
//     altText.textContent = letters.AltText
//     console.log(letters[0].AltText)
//     });

// altTextDiv.append(altText);
// };