
//Variables
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

