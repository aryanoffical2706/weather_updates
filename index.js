const temperatureField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchField=document.querySelector(".search");
const form=document.querySelector("form");
let target = "patna";
const fetchData=async(target)=>{
    const url=`https://api.weatherapi.com/v1/current.json?key=9838496b740d4d6da37172858242001&q=${target}`
    try {
        const response=await fetch(url);
        const data=await response.json();
         console.log(data);

    const {
     current:{temp_c
        ,condition:{text,icon}},
     location:{name,localtime}
    }=data;
      domUpdate(temp_c,name,localtime,icon,text)

    } catch (error) {
        console.log(error);
    }
}
function domUpdate(temperature,city,time,emoji,text){
  temperatureField.innerText=temperature;
  cityField.innerText=city;
  const exactTime=time.split(" ")[1];
  const exactDate=time.split(" ")[0];
  const exactDay=getDayFullName(new Date(exactDate).getDay());

  dateField.innerText= `${exactTime} - ${exactDay} ${exactDate}`
  emojiField.src=emoji
  weatherField.innerText=text
}
fetchData(target);
function getDayFullName(num){
    switch(num){
        case 0:
            return "Sunday";
            case 1:
            return "Monday";
            case 2:
            return "Tuesday";
            case 3:
            return "Wednesday";
            case 4:
            return "Thursday";
            case 5:
            return "Friday";
            case 6:
            return "Saturday";
            default:
                return "none";
    }
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    target=searchField.value;
    fetchData(target);
})