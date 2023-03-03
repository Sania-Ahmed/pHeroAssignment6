// here the sorting by dates wil be done 
document.getElementById('sort-btn').addEventListener('click', function(){
    // spinner(true);
    const limit = 6 ;
const loadData2 = async (limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    const dataArr2 = data.data.tools;
    const newData = [...dataArr2];

    let dateArr =[];

    for(item of dataArr2){
        dateArr.push(item.published_in)
        const {published_in} = item ;
        console.log(published_in);
    }
    dataArr2.sort(function(a, b){
        a = new Date(a);
        b = new Date(b);
        return b - a 
    });
    console.log(dataArr2)
    newData.sort((a, b) => dateArr.indexOf(a) - dateArr.indexOf(b));
     console.log(newData.sort((a, b) => dateArr.indexOf(a) - dateArr.indexOf(b)))

}
loadData2()
})
var array = [{id: 1,
     date: "Mar 12 2012 10:00:00 AM"}, 
    {id: 2, 
    date: "Mar 8 2012 08:00:00 AM"}];
array.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
  console.log(array);