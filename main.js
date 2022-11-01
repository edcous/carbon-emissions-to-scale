const data = [["4-people-norway", 20.25], ["4-people-america", 70.33], ["1k-people-america",  17581.67 ], ["usa_transit", 1815660034], ["usa_energy", 1965560059], ["usa_buildings", 557570007], ["usa_other", 5771000000-(557570007+1965560059+1815660034)]]

function makeResponsive(elementID, desiredArea){
    let width = window.innerWidth * .975
    let el = document.getElementById(elementID)
    if(width > 2000){
        width = 2000
    }
    let height = desiredArea / width
    if(desiredArea < 200000){
        width = Math.sqrt(desiredArea)
        height = Math.sqrt(desiredArea)
    }
    el.style.height = `${height}px`
    el.style.width = `${width}px`
}

function splitDivHeight(parentID){
    let el = document.getElementById(parentID)
    let elements = el.querySelectorAll(`.info-wrapper`)
    let height = parseInt(el.style.height)
    let length = elements.length
    elements.forEach(element => {
        element.style.height = `${(height/length)-200}px`
    });
}

let header = document.getElementById("us-sticky");

let sticky = header.offsetTop;

function headerStick(){
  if (window.pageYOffset > sticky && window.pageYOffset < (sticky + document.getElementById("usa").offsetHeight)) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function progressUpdate(){
    let width = window.innerWidth * .975
    let current = window.pageYOffset - document.getElementById("usa").offsetTop + window.innerHeight
    let scrollProgress = current * width * 10
    let progressEl = document.getElementById("us-progress")
    if(scrollProgress > 5771000000){
        scrollProgress = 5771000000
    }
    else if(scrollProgress < 0){
        scrollProgress = 0
    }
    progressEl.innerHTML = `Progress: ${Math.round((scrollProgress/5771000000) * 100)}% (${(scrollProgress).toLocaleString()} tons out of 5,771,000,000 tons)`
}

function runResFuncs(){
    data.forEach(element => {
        makeResponsive(element[0], element[1]/10)
        splitDivHeight(element[0])
    });
    updateScale()
}

function runScrollFuncs(){
    headerStick()
    progressUpdate()
}

window.onresize = runResFuncs;
window.onload = runResFuncs;
window.onscroll = runScrollFuncs;