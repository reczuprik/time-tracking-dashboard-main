const options = document.querySelectorAll('.card-footer-button')
const cardTitles= document.querySelectorAll('.card-main-title')
const cardHours= document.querySelectorAll('.card-main-hours')
const cardPrevHours= document.querySelectorAll('.card-main-previous_hours')

window.onload=function(){
    document.getElementById('daily').click();

}

options.forEach((option) => {
    option.addEventListener('click', changeDuration);
});

function changeDuration(e){    
    options.forEach((option) => {option.classList.remove("card-footer-button--active")});    
    const buttonPressed = e.target;
    buttonPressed.classList.add("card-footer-button--active");
    const duration = buttonPressed.getAttribute("data-duration");
    
    fetch('data.json')
    .then(resp => resp.json())
    .then((packageJson) => updateDuration(packageJson,duration)
    );
}

function updateDuration(data,duration){
    

    data.forEach(function (element,index){

        cardTitles[index].textContent= element.title
        const hours=element.timeframes[duration].current;
        const prevhours=element.timeframes[duration].previous
        cardHours[index].innerHTML=hours+'hrs'
        cardPrevHours[index].textContent='Previous - '+  prevhours+'hrs'
        if (hours>prevhours) {
            cardHours[index].style.setProperty('--bordercolor', "green");
            cardHours[index].style.setProperty('--trnsfrm', "-135deg");
        }else if(hours===prevhours){
            cardHours[index].style.setProperty('--bordercolor', "black");
            cardHours[index].style.setProperty('--trnsfrm', "-45deg");
        } 
        else {
            cardHours[index].style.setProperty('--bordercolor', "red");
            cardHours[index].style.setProperty('--trnsfrm', "45deg");
        }
    } );

    
}