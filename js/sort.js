// here the sorting by dates wil be done 
document.getElementById('sort-btn').addEventListener('click', function(){
    // spinner(true);
    const limit = 6 ;
const loadData2 = async (limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    const dataArr2 = data.data.tools;
    let dateArr =[];

    for(item of dataArr2){
        dateArr.push(item.published_in)
    }
    dateArr.sort(function(a, b){
        a = new Date(a);
        b = new Date(b);
        return b - a 
    });
    console.log(dateArr)
    // if(limit){
    //     const dataArr = data.data.tools.slice(0,6);
    //     console.log(Array.isArray(dataArr))
    //     displayData(dataArr);
    // }
    // else{
    //     displayData(data.data.tools)
    // }
    // console.log(data.data.tools)
}
loadData2()
})