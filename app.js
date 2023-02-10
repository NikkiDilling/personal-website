
//Variables
let activeIndex = 1;

const articleProjectElements = document.getElementsByClassName("article-slide-element");
let nextIndex = activeIndex + 1 <= articleProjectElements.length - 1 ? activeIndex + 1 : 0;
let previousIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : articleProjectElements.length - 1 ;

const handleLeftClick = () =>{
    console.log("button pressed");
    //bump active index
    //check if the index is smaller or equal to the group length

    console.log(previousIndex);
    console.log(activeIndex);
    console.log(nextIndex);

    const previousElement = document.querySelector(`[data-index="${previousIndex}"]`);
    const currentElement = document.querySelector(`[data-index="${activeIndex}"]`);
    const nextElement = document.querySelector(`[data-index="${nextIndex}"]`);
    
    //Active group becomes after
    console.log(document.querySelector(`[data-index="${previousIndex}"]`).dataset.status);
    console.log(document.querySelector(`[data-index="${activeIndex}"]`).dataset.status);
    console.log(document.querySelector(`[data-index="${nextIndex}"]`).dataset.status);
    console.log("");

    currentElement.dataset.status = "after";


    previousElement.dataset.status = "become-active-from-before";

    previousElement.dataset.status = "active";
    nextElement.dataset.status = "before";

    let prevTemp = previousIndex;
    /*
    console.log(document.querySelector(`[data-index="${previousIndex}"]`).dataset.status);
    console.log(document.querySelector(`[data-index="${activeIndex}"]`).dataset.status);
    console.log(document.querySelector(`[data-index="${nextIndex}"]`).dataset.status);
    */
    previousIndex = activeIndex;
    activeIndex = nextIndex;
    nextIndex = prevTemp;
    
    //console.log("");

    console.log(previousIndex);
    console.log(activeIndex);
    console.log(nextIndex);
    


}









const progessSection = document.querySelector('.progress-section');
let progressBar = document.querySelector('.progress-bar');
let progessNum = document.querySelector('.progress-num');
const iconsDiv = document.querySelector('.article-icons');


const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);

        if(entry.isIntersecting){
            entry.target.classList.add('show'); // making the element visible
        }
    });
});

hiddenElements.forEach((el) => observer.observe(el));


//Functions
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

