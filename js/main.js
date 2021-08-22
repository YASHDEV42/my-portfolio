const navSlide=()=>{
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.nav-links')
    const navLinks = document.querySelectorAll('.nav-links li')
    
    burger.addEventListener('click', ()=>{
        //toggle nav
        nav.classList.toggle('nav-active'); 

        //animate links
        navLinks.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation = '';
        }else{
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
        }
        link.addEventListener('click', ()=>{
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach((link,index)=>{
                link.style.animation = '';
            })
            
        })
        })
        
            
    //burger animation
    burger.classList.toggle('toggle');
    })
    
   
}
navSlide();

// Start Gsapp 

//GSAP: Hero

    var tl = gsap.timeline({defaults:{duration:.5}})
    tl.from(".anim1", {y:-50, stagger:.3, opacity:0,})
    .from(".anim2", {x:-50, stagger:.3, opacity:0},'-=1.5')
    
//GSAP: About

    gsap.from(".me",{
        scrollTrigger:{
            trigger:'.me',
            pin:false,
        }, x:-400, opacity: 0, duration:1,
    })
    gsap.from(".imgScroll",{
        scrollTrigger:{
            trigger:'.imgScroll',
            pin:false,
        }, y:200, opacity: 0, duration:1,
    })

//GSAP: Service
/*
var tls = gsap.timeline({                                                                                                                                                
    scrollTrigger:{
        trigger:'.card',
    }
})
tls.from(".card",{y: 100, opacity: 0, duration:1, stagger:.6,})*/
