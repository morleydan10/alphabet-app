fetch("http://localhost:3000/alphabet")
.then((res) => res.json())
.then((data) => {
    console.log(data)
data.forEach(letter => {
    renderLetters(letter);
});;
});

function renderLetters(letters) {
    let letterList = document.getElementById("list-of-letters")

    let letter = document.createElement('li')
    letter.textContent = letters.Letter

    letterList.append(letter);
};