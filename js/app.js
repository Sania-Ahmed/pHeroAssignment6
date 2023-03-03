// fetching the data 
const limit = 6 ;
const loadData = async (limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    if(limit){
        const dataArr = data.data.tools.slice(0,6);
        console.log(Array.isArray(dataArr))
        displayData(dataArr);
    }
    else{
        displayData(data.data.tools)
    }
    // console.log(data.data.tools)
}


// displaying the datas in UI 
const displayData = (tools) => {
    const container = document.getElementById('card-container')
    tools.forEach(tool => {
        const featureList = tool.features.map( item => item );
        console.log(featureList)
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
        function features () {
            
          featureList.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            document.getElementById(`${tool.id}`).appendChild(li);
          })
        }
        features()
    });
    spinner(false)
}

// spinner onload 
const spinner = (isSpinning) => {
    if (isSpinning) {
        document.getElementById('spinner').classList.remove('d-none');
    }
    else{
        document.getElementById('spinner').classList.add('d-none');
    }
}

loadData(limit);

const loadDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);

}


// show all cards 
const showAllBtn  = document.getElementById('showAll-btn');
showAllBtn.addEventListener('click', function(){
  spinner(true);
  const container = document.getElementById('card-container');
  container.innerHTML = " ";
  loadData();
  showAllBtn.classList.add('d-none');

}) 
