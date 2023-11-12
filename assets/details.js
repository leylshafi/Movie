let id = window.location.search.slice(4)
let div = document.getElementById("movie")
axios.get(`https://api.tvmaze.com/shows/${id}`)
    .then(response=>{
        console.log(response.data);
        
        div.innerHTML=`
        <div class="container">
            <h1>${response.data.name}</h1>
            <div class="image-detail d-flex">
                <img src="${response.data.image.original}" alt="" class="" width=30%>
                <div class="summary">
                    <div class="d-flex summary-head">
                    <h2 class="text-danger">Summary</h2>
                    <p>On ${response.data.schedule.days} at ${response.data.schedule.time}</p>
                    </div>
                    <p>${response.data.summary}</p>
                    <p><strong class="text-danger">Genres:</strong> ${response.data.genres}</p>
                    <p><strong class="text-danger">Language:</strong> ${response.data.language}</p>

                    <table border="1px" class="table table-secondary border-secondary">
                        <thead>
                            <th >Country</th>
                            <th>Premiered</th>
                            <th>Ended</th>
                            <th>Status</th>
                            <th>IMDB</th>
                            <th>Runtime</th>
                        </thead>
                        <tbody>
                            <td>${response.data.network.country.name}</td>
                            <td>${response.data.premiered}</td>
                            <td>${response.data.ended}</td>
                            <td>${response.data.status}</td>
                            <td>${response.data.rating.average}</td>
                            <td>${response.data.runtime}</td>
                        </tbody>
                    </table>
                    <h3>Watch on: </h3>
                    <a href="${response.data.officialSite}" class="text-danger">${response.data.officialSite}</a>

        
                </div>
            </div>
        </div>
        `
    })