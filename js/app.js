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
    displayDetails(data.data);

}
const displayDetails = data => {
  const container = document.getElementById('modal-container');
  container.innerHTML = `
  <section class="d-flex justify-content-center">
     <div class="bg-danger-subtle border border-danger rounded p-4 w-50">
       <div> 
         <h4 class="font-bold">${data.description}</h4>
       </div>
       <div class="row p-2 gx-2"  id="${data.tool_name}"> </div>
   </div>
  <div class = "w-50 p-2"> 
        <div class= "position-relative">
          <div class = "p-2 rounded position-relative">
           <img src= "${data.image_link[0] ? data.image_link[0] : data.image_link[1] }" class="img-fluid rounded" >
           </div>
           <div class= "bg-danger rounded position-absolute top-0 end-0" style="width:150px; padding:5px; ${(data.accuracy.score === null ? 'display:none' : '')}">
           <p class = "text-white text-center m-0">${(data.accuracy.score) * 100}% accuracy </p>
           </div>
           <div clas="text-center">
           <h5 class="my-3 fw-bold text-center fs-2">${(data.input_output_examples === null) ? ' No Input available' : data.input_output_examples[0].input}</h5>
           <h5 class="mt-2 text-center">${(data.input_output_examples === null) ? ' No Output available' : data.input_output_examples[0].output}</h5>
           
           </div>
        </div> 
  </div>
  </section>
  `
  const displayPrice = () => {
  const pricing = data.pricing;
  if( data.pricing === null ) {
    const h4 = document.createElement('h4');
    h4.innerText = "Free No cost"
    h4.classList.add('text-success');
    document.getElementById(`${data.tool_name}`).appendChild(h4);
  }
  else{
    pricing.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `
      <h6>${ (data.pricing === null ) ? 'Free' : item.plan}</h6>
      <h6>${(item === null || item.price === "0" || data.pricing === null  ) ? 'No cost' : item.price}</h6>
      `
      div.classList.add('col-4', 'text-success');
      document.getElementById(`${data.tool_name}`).appendChild(div);
    })
  }
}
displayPrice()

const displayFeaturesList = () => {
    const featuresContainer = Object.values(data.features)   ;
    ;
    const h4 = document.createElement('h4');
    h4.innerText = "Features"
    document.getElementById(`${data.tool_name}`).appendChild(h4);
    featuresContainer.forEach(item => {
      const ul = document.createElement('ul');
      ul.innerHTML +=`
      <li class="list-group-item fw-bold text-primary">${item.feature_name ? item.feature_name : 'Feature not found'}</li> 
      ` ;
      ul.classList.add('flex', 'flex-column','list-group', 'mb-2');
      document.getElementById(`${data.tool_name}`).appendChild(ul);
    console.log(ul);
    })
  }
  displayFeaturesList()
  const displayinteragationList = () => {
    const integrationsContainer = data.integrations;
    ;
    const h4 = document.createElement('h4');
    h4.innerText = "Integrations"
    document.getElementById(`${data.tool_name}`).appendChild(h4);
    if(data.integrations === null){
      const h5 = document.createElement('h5');
      h5.innerText = "Not found"
      h5.classList.add('text-danger');
      document.getElementById(`${data.tool_name}`).appendChild(h5);
    }
    else{
      integrationsContainer.forEach(item => {
        const ul = document.createElement('ul');
        ul.innerHTML +=`
        <li class="list-group-item fw-bold text-warning">${(item === null || data.integrations === null) ? 'not found' : item}</li> 
        ` ;
        ul.classList.add('flex', 'flex-column','list-group', 'mb-2');
        document.getElementById(`${data.tool_name}`).appendChild(ul);
      console.log(ul);
      })
    }
  }
  displayinteragationList();

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
