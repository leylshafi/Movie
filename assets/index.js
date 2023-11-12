let movies = document.getElementById("all-movies")
let detail = document.getElementById("detail")
let searchbtn = document.getElementById("search-btn")
let searchtext= document.getElementById("search-text")
let paginationDiv= document.getElementById("pagination-movie")

const itemsPerPage = 24;
let currentPage = 1;

function renderMovies(data) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        let movieCard = document.createElement("div");
        movieCard.innerHTML += `<div class="card m-2 bg-dark text-light" style="width: 18rem;">
            <a href="/details.html?id=${data[i].id}">
                <img src="${data[i].image.medium}" class="card-img-top" alt="...">
                <h2>${data[i].name}</h2>
            </a>
        </div>`;
        movies.appendChild(movieCard);
    }
}
fetch("https://api.tvmaze.com/shows")
        .then(x => x.json())
        .then(data => {
            console.log(data.length);
            renderMovies(data);
            const totalPages = Math.ceil(data.length / itemsPerPage);
            const paginationContainer = document.createElement("nav");
            paginationContainer.setAttribute("aria-label", "Page navigation");

            const paginationList = document.createElement("ul");
            paginationList.classList.add("pagination");

            for (let i = 1; i <= totalPages; i++) {
                const pageItem = document.createElement("li");
                pageItem.classList.add("page-item");

                const pageLink = document.createElement("a");
                pageLink.classList.add("page-link");
                pageLink.style.cursor="pointer";
                pageLink.textContent = i;
                pageLink.style.backgroundColor = "red";
                pageLink.style.color = "white";
                pageLink.style.border="1px solid red";
                pageLink.addEventListener("click", () => {
                    currentPage = i;
                    movies.innerHTML = "";
                    renderMovies(data);
                    updatePaginationButtons();
                });

                pageItem.appendChild(pageLink);
                paginationList.appendChild(pageItem);
            }

            paginationContainer.appendChild(paginationList);
            paginationDiv.appendChild(paginationContainer);

            function updatePaginationButtons() {
                const buttons = paginationList.querySelectorAll("a.page-link");
                buttons.forEach(button => {
                    button.parentNode.classList.remove("active");
                    if (parseInt(button.textContent) === currentPage) {
                        button.parentNode.classList.add("active");
                        button.classList.remove("bg-light")
                        button.classList.remove("text-danger")
                        button.classList.add("bg-danger")
                        button.classList.add("text-light")

                        
                    }
                    else {
                        button.classList.remove("bg-danger")
                        button.classList.remove("text-light")
                        button.classList.add("bg-light")
                        button.classList.add("text-danger")
                        
                    }
                });
            }

            updatePaginationButtons();
        });


function search(){
    paginationDiv.innerHTML=""
    movies.innerHTML=""
    fetch("https://api.tvmaze.com/shows")
    .then(x => x.json())
    .then(data=>{
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            if(data[i].name.toLowerCase().includes(searchtext.value.toLowerCase())){
                console.log(data[i]);
                let movieCard = document.createElement("div")
                movieCard.innerHTML+=`<div class="card m-2 bg-dark text-light" style="width: 18rem;">
                <a href="/details.html?id=${data[i].id}"><img src="${data[i].image.medium}" class="card-img-top" alt="...">
                <h2>${data[i].name}</h2>
                </a>
              </div>
              `
              movies.appendChild(movieCard)
            }
            
          
        }
    });
   
}









