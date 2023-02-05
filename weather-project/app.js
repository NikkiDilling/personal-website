//Variables
const myKey = config.apiKey;

const userInformationBtn = document.querySelector('.user-information');
const userLocationInfo = document.querySelector('.user-location-info');
const otherLocationContainer = document.querySelector('.other-location-container');
const addBtn = document.getElementById('addBtn');
//saving the search bar
let inputValue = document.querySelector('.search-bar');

//function that creates an element of city-container.
function addCity(){

    //saving "custom" API url
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${myKey}&units=metric`;
    //fetching data
    fetch(api)
        .then(response => {
                if (response.ok) {
                    return response.json()

                    .then(data =>{
                        //console.log(data);

                        //Creating elements if there is no error                                  
                        //creating container for new city and adding to the main container
                        const cityContainer = document.createElement('div');
                        cityContainer.classList.add('city-container');
                        otherLocationContainer.append(cityContainer);

                        //creating city element
                        const city = document.createElement('p');
                        city.classList.add('city-location');
                        cityContainer.append(city);

                        //creating degrees element
                        const degrees = document.createElement('p');
                        degrees.classList.add('city-location-degrees');
                        cityContainer.append(degrees);

                        //creating button element
                        const button = document.createElement('button');
                        button.setAttribute('id','deleteBtn');
                        cityContainer.append(button);
                        
                        //creating and adding icon element to button
                        const icon = document.createElement('i');
                        button.appendChild(icon);
                        icon.classList.add('fa-sharp', 'fa-solid', 'fa-minus');
                        //saving fetched data, that is needed
                        const {name} = data;
                        const {temp, feels_like} = data.main;
        
                        //displaying the fethced data
                        city.innerText = name;
                        degrees.innerText = Math.floor(temp) + ` C°`;

                        
                        //Adding Event Listener to the NEW delete button
                        button.addEventListener('click', (e)=>{
                            
                            if(e.target.tagName.toLowerCase() === 'button'){
                                e.target.parentElement.remove();
                            }else{
                                e.target.parentElement.parentElement.remove();
                            }
                        
                        })//end of button event listener
        
                    })//end of data

                }else if(response.status === 404) {
                    alert(`City doesn't exist. Please check spelling and try again.`);
                    return Promise.reject('error 404');
                }
        })//end of response
        //displaying error num to the console
        .catch(error => console.log('error is: ', error));

    inputValue.value = ""; //resetting search-bar value

}

addBtn.addEventListener('click',addCity);

inputValue.addEventListener('keyup',(e) =>{

    //Executing function add city if enteris pressed
    if(e.key == "Enter"){
        addCity();
    }
});


userInformationBtn.addEventListener('click',()=> {
    let longitude;
    let latitude;
    let userLocation = document.querySelector('.user-location');
    let userLocationDegrees = document.querySelector('.user-location-degrees');


    //will require the user to allow geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positon => {
            console.log(positon);
            longitude = positon.coords.longitude;
            latitude = positon.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myKey}&units=metric`;
            
                fetch(api)
                    .then(response =>{
                    return response.json();
                    })
                        .then(data => {
                    
                    //shorthand:
                    const {name} = data; //pullnig out all the information from "current"
                    const {temp} = data.main;

                    //Set DOM Element from the API
                    console.log(data.main.temp);
                    userInformationBtn.style.display = 'none';
                    userLocationInfo.classList.toggle('active')
                    userLocation.style.display = 'block';
                    userLocation.textContent = name;
                    userLocationDegrees.textContent = Math.floor(temp) + " C°";
                    userLocationDegrees.style.display = 'block';

                });
        });

    }

});

    