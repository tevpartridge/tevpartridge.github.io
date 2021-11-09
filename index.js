window.addEventListener("scroll", reveal);

function reveal(){
    let reveals = document.querySelectorAll('.reveal');

    for(var i = 0; i < reveals.length; i++){

        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealpoint = 250;

        if(revealTop < windowHeight - revealpoint){
            reveals[i].classList.add('active');
        }
    }

}