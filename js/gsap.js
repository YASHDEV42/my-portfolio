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

var tls = gsap.timeline({                                                                                                                                                
scrollTrigger:{
    trigger:'.card',
}
})
tls.from(".card",{y: 100, opacity: 0, duration:1, stagger:.5,})

//GSAP: Projects

var tls = gsap.timeline({                                                                                                                                                
    scrollTrigger:{
        trigger:'.workBx',
    }
    })
    tls.from(".workBx",{x: -100, opacity: 0, duration:1, stagger:.5,})

//GSAP: Contact

gsap.from(".contact",{
    scrollTrigger:{
        trigger:'.contact',
        pin:false,
    }, scale:0, opacity: 0, duration:1,
})
    