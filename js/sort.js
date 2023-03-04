// here the sorting by dates wil be done 
document.getElementById('sort-btn').addEventListener('click', function(e){
    spinner(true);
    const limit = 6 ;
const loadData2 = async (limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    const dataArr2 = data.data.tools;

   const sortedData = dataArr2.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.published_in) - new Date(a.published_in);
    });
    displayData2(sortedData);
}
const displayData2 = (tools) => {
    const container = document.getElementById('card-container')
    container.innerHTML = ' ';
    tools.forEach(tool => {
      container.innerHTML += `
      <div class="col">
      <div class="card">
      <img src="${tool.image}" class="card-img-top">
      <div class="card-body">
      <h5 class="card-title">Features</h5>
      <ol class="card-text" id="${tool.id}">
      
      </ol>
      </div>
      <hr>
      <div class="p-3">
      <h4> ${tool.name} </h4>
      <div class = "d-flex justify-content-between align-items-center p-1"> 
      <div class = "h-25 d-flex p-1 align-items-center gap-2">
      <i class="fa-solid fa-calendar-days"></i>
      <p class="m-0 "> ${tool.published_in} </p>
      </div>
      <div class="bg-danger-subtle px-1  rounded-circle">
      <i onclick="loadDetails('${tool.id}')" class="fa-solid fa-arrow-right text-danger " data-bs-toggle="modal" data-bs-target="#Ai-details"></i>
      </div>
      </div>
      </div>
      </div>
      </div>
      `
      const featureList2 = tool.features.map( item => item );
        function features2 () {
            
          featureList2.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            document.getElementById(`${tool.id}`).appendChild(li);
          })
        }
        features2()
    });
    spinner(false)
}
loadData2()
})

