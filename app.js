
//Variables
const progessSection = document.querySelector('.progress-section');
let progressBar = document.querySelector('.progress-bar');
let progessNum = document.querySelector('.progress-num');

const iconsDiv = document.querySelector('.article-icons');

//Functions
function updateProgressBar(){
    progressBar.style.height = `${getScrollPercentage()}%`;
    progessNum.innerText = `${Math.ceil(getScrollPercentage())}%`

    //stopping the progress bar at 100%
    
        if(getScrollPercentage() >= 100){
            progressBar.style.height = `100%`;
            progessNum.innerText = `100%`;
        }


    requestAnimationFrame(updateProgressBar);
}

function getScrollPercentage(){
    return (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100);
}


iconsDiv.addEventListener('click', function(e){
   
    if(e.target.tagName.toLowerCase === 'img'){
        e.target.style.content = e.target.getAttribute('id');
    }
});



//Running Functions
updateProgressBar();
