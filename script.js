fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then((data)=>{
    console.log(data)

    //function for creating div elements with argument class name
    function creatediv(className){
        var element=document.createElement('div');
        element.setAttribute('class',className);
        return element;
    }
    
    var container=creatediv('container');
    document.body.append(container);
    var row = creatediv('row');
    container.append(row);

    //for loop for creating card for each data with their details
    for(let i in data){
        var column = creatediv('col-lg-4 col-sm-12 d-flex align-items-stretch');
        row.append(column);
        
        var card = creatediv('card');
        column.append(card);

        //country name
        var title = creatediv('card-header');
        title.innerHTML=data[i].name;

        //country flag
        var img = document.createElement("img");
        img.setAttribute("class","card-img-top");
        img.setAttribute("src",data[i].flag);
        img.setAttribute("height",200)
        img.setAttribute("weidth",100)
    
        var cardbody = creatediv('card-body');

        //capital
        var cap= creatediv('cap');
        cap.innerHTML="Capital: "+(data[i].capital).bold();

        //country code
        var code= creatediv('code');
        code.innerHTML= "Country Codes: "+(data[i].alpha2Code+","+data[i].alpha3Code).bold();

        //region
        var regi = creatediv('regi');
        regi.innerHTML="Region: "+(data[i].region).bold();

        //latitude & longitude
        var latlong = creatediv('latlong')
        latlong.innerHTML = "Lat,Long: "+(data[i].latlng[0]+","+data[i].latlng[1]).bold();

        //Click for Weather btn
        var btn=creatediv('btn btn-primary')
        btn.innerHTML="Click for Weather";
        btn.setAttribute("onclick",`getWeather('${data[i].name}')`)

        //appending all to card
        card.append(title,img,cardbody);
        cardbody.append(cap,code,regi,latlong,btn);
    }
})
.catch(function(err){
    console.error(err)
})
//fetch weather API
function getWeather(countryName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=5419af2550f5eec4fc8eee39304f4f76`)
    .then(res => res.json())
    .then(obj=>{
        alert("Weather condition of "+obj.name+" is Weather: "+obj.weather[0].main);
    });
}




