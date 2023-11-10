fetch("http://localhost:3000/alphabet")
.then((res) => res.json())
.then((data) => {
    console.log(data)
// for (i=0; i < data.length; i++);
});

