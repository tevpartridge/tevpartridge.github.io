window.addEventListener("scroll", reveal);

function reveal(){
    let reveals = document.querySelectorAll(".reveal");
    let windowHeight = window.innerHeight;
    let revealpoint = 250;

    for(i = 0; i < reveals.length; i++){
        let revealTop = reveals[i].getBoundingClientRect().top;
        if(revealTop < windowHeight - revealpoint){
            reveals[i].classList.add('active');
        }
    }
}