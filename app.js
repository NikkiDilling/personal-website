
//Variables
const articleElements = document.getElementsByClassName("article-slide-element");
    
    //Variables for projects slide
    let activeIndex = 1;    
    let previousIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : articleElements.length - 1 ;
    let nextIndex = activeIndex + 1 <= articleElements.length - 1 ? activeIndex + 1 : 0;
    let unknownIndex;

//Buttons for projects slide
const handleLeftClick = () =>{
    unknownIndex = previousIndex - 1 >=0 ? previousIndex - 1 : articleElements.length - 1;

    const previousElement = document.querySelector(`[data-index="${previousIndex}"]`);
    const currentElement = document.querySelector(`[data-index="${activeIndex}"]`);
    const nextElement = document.querySelector(`[data-index="${nextIndex}"]`);
    const unknownElement = document.querySelector(`[data-index="${unknownIndex}"]`);



    currentElement.dataset.status = "after";
    nextElement.dataset.status = "unknown";
    previousElement.dataset.status = "active";
    console.log(unknownElement);
    unknownElement.dataset.status = "before"
    console.log(unknownElement);

    //making the element before the NEW ACTIVE
    activeIndex = previousIndex;
    //updating element indexes around active element
    previousIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : articleElements.length - 1 ;
    nextIndex = activeIndex + 1 <= articleElements.length - 1 ? activeIndex + 1 : 0;
    unknownIndex = previousIndex - 1 >=0 ? previousIndex - 1 : articleElements.length - 1;
       
}


const handleRightClick = () =>{
    unknownIndex = nextIndex + 1 <= articleElements.length - 1 ? nextIndex + 1 : 0;

    const previousElement = document.querySelector(`[data-index="${previousIndex}"]`);
    const currentElement = document.querySelector(`[data-index="${activeIndex}"]`);
    const nextElement = document.querySelector(`[data-index="${nextIndex}"]`);
    const unknownElement = document.querySelector(`[data-index="${unknownIndex}"]`);


    
    currentElement.dataset.status = "before";
    nextElement.dataset.status = "active";
    previousElement.dataset.status = "unknown";
    unknownElement.dataset.status = "after"

       //making the element before the NEW ACTIVE
       activeIndex = nextIndex;
       //updating element indexes around active element
       previousIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : articleElements.length - 1 ;
       nextIndex = activeIndex + 1 <= articleElements.length - 1 ? activeIndex + 1 : 0;
       unknownIndex = nextIndex + 1 <= articleElements.length - 1 ? nextIndex + 1 : 0;

 
}


//Code for progress bar
const progessSection = document.querySelector('.progress-section');
let progressBar = document.querySelector('.progress-bar');
let progessNum = document.querySelector('.progress-num');
const iconsDiv = document.querySelector('.article-icons');


const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        //console.log(entry);

        if(entry.isIntersecting){
            entry.target.classList.add('show'); // making the element visible
        }
    });
});

hiddenElements.forEach((el) => observer.observe(el));


function updateProgressBar(){
    //updating scroll bar text and progress bar
    progressBar.style.height = `${getScrollPercentage()}%`;
    progessNum.innerText = `${Math.ceil(getScrollPercentage())}%`

    //stopping the progress bar at 100%
        if(getScrollPercentage() >= 100){
            progressBar.style.height = `100%`;
            progessNum.innerText = `100%`;
        }

    //look up this function
    requestAnimationFrame(updateProgressBar);
}

function getScrollPercentage(){
    //returning the position of the user on the screen
    return (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100);
}


//Function for Scaling the icons up/down and displaying the skill's name
iconsDiv.addEventListener('click', function(e){

    if(e.target.tagName.toLowerCase() === 'img'){
      
        //adds an active tag, to show the name of the icon
        if(e.target.parentElement.classList.contains('active') == false){

            e.target.parentElement.classList.add('active');
            //setting p's inner text
            e.target.nextElementSibling.innerText = e.target.getAttribute('id');
            //console.log("added");

        //Removes the active tag and therefore also the name of the icon
        }else if(e.target.parentElement.classList.contains('active') == true){

            //console.log("removed");
            e.target.parentElement.classList.remove('active');
            //removing p's inner text            
            e.target.nextElementSibling.innerText = "";
        }
    }

   
});


//Running Functions
updateProgressBar();

