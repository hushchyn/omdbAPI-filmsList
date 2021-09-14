function getSel(select) {
    return document.querySelector(select)
}

getSel('.search').addEventListener('click', function () {
    render()
    let form = getSel('form')
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${form.txt.value}&apikey=71211de1`, false)
    xhr.send();
    let data = JSON.parse(xhr.responseText)
    createCards(data);
})

function createCards(data) {
    for (let i = 0; i < data.Search.length; i++) {
        generateCart(data.Search[i])
    }
}

function generateCart(dataCart) {
    let cart = document.createElement('div')
    cart.classList.add('cart')
    cart.innerHTML = `
        <img src="${dataCart.Poster}" class="img"> 
        <p class="title">${dataCart.Title}<p>
        <p class="type">${dataCart.Type}<p>
        <p class="year">${dataCart.Year}<p>
        <button class="more-block" id="${dataCart.imdbID}">More details</button>
        `
    getSel('.container').appendChild(cart)
};

getSel('.container').addEventListener('click', function (event) {
    if (event.target.classList == 'more-block') {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://www.omdbapi.com/?i=${event.target.id}&apikey=71211de1`, false)
        xhr.send()
        let data = JSON.parse(xhr.responseText)
        createCartInfo(data)
        console.log(data.Ratings);

    }
    getSel('.modal').classList.add('modal-block')
})

function createCartInfo(data) {
    getSel('.info').innerHTML = `
    <img src="${data.Poster}" class="img-poster">
    <div class="details">
    <p class="name">${data.Title}</p>
    <p class="rated">${data.Rated}</p>
    <p class="desc">${data.Plot}</p>
    <p class="writtenBy"><span>Written by:</span> ${data.Writer}</p>
    <p class="directedBy"><span>Directed by:</span> ${data.Director}</p>
    <p class="starring"><span>Starring:</span> ${data.Actors}</p>
    <p class="boxOffice"><span>Box office:</span> ${data.BoxOffice}</p>
    <p class="awwards"><span>Awwards:</span> ${data.Awards}</p>
    <p class="raitings"><span>Ratings:</span> ${data.Ratings[0].Source} ${data.Ratings[0].Value} ${data.Ratings[1].Source} ${data.Ratings[1].Value} </p>
    </div>  
 `
}

function render() {
    getSel('.container').innerHTML = ""
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        getSel('.modal').classList.remove('modal-block')
    }
})
