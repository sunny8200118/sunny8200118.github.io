var where = document.getElementById('where');
var hotWhere = document.getElementById('hotWhere');
var list=document.getElementById('list');
var title = document.querySelector('.main-title');
// 從外部引入JSON資料
var xhr=new XMLHttpRequest();
var data;
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
xhr.onload=function(){
    data=JSON.parse(xhr.responseText);
}

// 抓取選單選取內容
function getWhere(e) {
    var select = e.target.value;
    if (select == '- 請選擇行政區 -') {
        return
    }
    updateList(select);
    console.log(select);
}

function getHotWhere(e) {
    var hotEl=e.target.textContent;
    if (e.target.nodeName !== 'LI') {
        return
    }
    updateList(hotEl);
    console.log(hotEl);
}

// 輸入資料到html
function updateList(zone) {
    var total =data.result.records.length;
    var str ='';
    title.textContent=zone;
    for(var i=0;i<total;i++){
        if(zone == data.result.records[i].Zone){
            str += '<div class="col-lg-4"><div class="item"><div class="area-img"><img src="'+data.result.records[i].Picture1+'" alt="" class="img-fluid d-block"><h2 class="sub-title">'+data.result.records[i].Name+'</h2><p class="area">'+data.result.records[i].Zone+'</p></div><ul class="list-unstyled"><li class="time">'+data.result.records[i].Opentime+'</li><li class="pin">'+data.result.records[i].Add+'</li><li class="phone">'+data.result.records[i].Tel+'</li><li class="tag">'+data.result.records[i].Ticketinfo+'</li></ul></div></div>'
        }
    }
    list.innerHTML=str;
    
}
// if()
var tag =document.querySelectorAll('.tag');
for(var i=0;i<tag.length;i++){
    console.log(tag[i].textContent);
    // if(tag[i].textContent == ''){
    //     // tag[i].style.display='none';
    //     console.log(i);
    // }
}
where.addEventListener('change', getWhere, false);
hotWhere.addEventListener('click', getHotWhere, false);