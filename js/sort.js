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

 for (let index = 0; index < dataArr2.length; index++) {
    const element = dataArr2[index];
    const a = new Date(element.published_in[index]);
    const b = new Date(element.published_in[index + 1]);
    dateComparison(a,b);
 }
 function dateComparison(a, b) {  
    return a - b ;
}
dataArr2.sort(dateComparison);
    console.log(dataArr2);

    const i = ['a', 'b', 'c', 'd' ]
    console.log(i.indexOf(i[0]))
   












    if(limit){
        const dataArr = dateArr.slice(0,6);
        displayData(dateArr);
    }
    else{
        displayData(dateArr)
    }
}
loadData2()
})