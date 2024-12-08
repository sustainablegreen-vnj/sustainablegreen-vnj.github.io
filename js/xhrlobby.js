const articledir = "/articles";
const directoryFile = `${articledir}/directory.txt`;
let xhrpot = null;
let schlattbg = null;
let deskrip = null, titler = null;

// Rant
// Chrome is memory greedy: To chrome, memory is free real estate
// Chromy chromy, yes papa, eating ram, telling lies, no windows, open your mouth, *BLARGS RAM*
// VS Code and Discord is literally chrome underneath
// Well, technically. They are using Electron, which is a JS framework based of chromium.
// Chrome is based of chromium, and I am using all three at once
// Chrome to test, VS Code to code and Discord to VC.
// With my 2015 mac, guess whats next in history.
// (Clue: it involves *WHIRING* pc fans)
// All three open makes it hard for me to save on the mac.
// the creator of this is gay

function fetchMyPagesData(pagesrc) {
    const domparsw = new DOMParser();
    const nDom = domparsw.parseFromString(pagesrc, "text/html");

    let pmetad = {
        "Title": null,
        "Description": null,
        "Image": null
    };

    const head = nDom.querySelector("[itemscope]");
    head.querySelectorAll("[itemprop]").forEach(function(element) {
        const ipd = element.getAttribute("itemprop");
        const ipcontent = element.getAttribute("content");

        if(pmetad.hasOwnProperty(ipd)) pmetad[ipd] = ipcontent;
    });

    return pmetad;
}

function openPage() {

}

let dirnftws;
function fetchMeMyPages(cb) {
    if(!xhrpot) return;


    fetch(directoryFile).then(function(response) { // Covert to text
        return response.text(); 
    }).then(function(directory) {
        let ulist = null;

        console.log("Fetch!");

        // Set fetching message
        {
            let fetchy = xhrpot.querySelector("#XHRPotFetchy");
            fetchy.remove();
            ulist = document.createElement("ul");
            xhrpot.appendChild(ulist);
        }
        const fmsg = document.createElement("p");
        fmsg.textContent = "Fetching the articles now...";
        fmsg.id = "XHRPotFetchy";
        xhrpot.appendChild(fmsg);
        xhrpot.setAttribute("notready", "false");

        // Fetch all the items and create a new list of paths
        let dirftws = directory.split("\n");
        dirnftws = dirftws.map(function(fname) {
            return `${articledir}/${fname}`;
        });

        let counter = 0;
        dirnftws.forEach(function(element) { // Loop over each directory entries
            fetch(element).then(function(response) {
                return response.text();
            }).then(function(text) {
                if(xhrpot.getAttribute("notready") == "false") { // If still initial, mark as ready
                    {
                        let fetchy = xhrpot.querySelector("#XHRPotFetchy");
                        fetchy.remove();
                    }
                    xhrpot.removeAttribute("notready");
                }

                const metai = fetchMyPagesData(text); // Fetch page info

                const lio = document.createElement("li");

                const infobox = document.createElement("img"); // Create xhrpot box
                infobox.src = metai.Image;
                infobox.alt = `${metai.Title}: ${metai.Description}`;
                infobox.onclick = function(_)  {
                    window.location.href = element;
                }
                infobox.style.cursor = "pointer";
                infobox.classList.add("xhrpotbox");
                infobox.classList.add("bg");

                lio.appendChild(infobox);
                xhrpot.appendChild(lio); // Put it to the xhrpot

                console.log("Fetched!");
                if((counter+1) >= dirnftws.length) {
                    cb();
                }

                console.log(counter);
                counter++;
            }).catch(function(_){/* Silent ignore */});
        })
    }).catch(function(reason) {
        xhrpot.textContent = "There was an error fetching the pages: " + reason;
    });
}


function carouselMyFetches() {
    let track = xhrpot;
    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
        track.dataset.mouseDownAt = "0";  
        track.dataset.prevPercentage = track.dataset.percentage;
    }
    
    const handleOnMove = e => {
        if(track.dataset.mouseDownAt === "0" || track.dataset.mouseDownAt === null || track.dataset.mouseDownAt === undefined) return;

        
        let parsedDownAt = parseFloat(track.dataset.mouseDownAt);
        
        if(isNaN(parsedDownAt)) return;
        
        const mouseDelta = parsedDownAt - e.clientX,
            maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = (parseFloat(track.dataset.prevPercentage) || 0) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        
        track.dataset.percentage = nextPercentage;
        
        track.animate({
            transform: `translate(${nextPercentage}%, 0%)`
        }, { duration: 3820, fill: "forwards" });

        let uplexed = track.getElementsByClassName("xhrpotbox");
        for(const image of uplexed) {
            console.log(image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" }));
        }
    }
    
    /* -- Had to add extra lines for touch events -- */
    
    window.onmousedown = e => handleOnDown(e);
    
    window.ontouchstart = e => handleOnDown(e.touches[0]);
    
    window.onmouseup = e => handleOnUp(e);
    
    window.ontouchend = e => handleOnUp(e.touches[0]);
    
    window.onmousemove = e => handleOnMove(e);
    
    window.ontouchmove = e => handleOnMove(e.touches[0]);
}

function createOnHoverBox(img, dset, titlized, deskripzed){
    function schlattor(){
        schlattbg.classList.add("paged");
        schlattbg.src = img.src;
        console.log("hov");
    }

    function msgify(){
        titlized.textContent = dset.title;
        deskripzed.textContent = dset.description;

        titlized.style.visibility = "visible";
        deskripzed.style.visibility = "visible";
    }

    return function(){
        msgify();
        schlattor();
    };
}

function createOnUnhoverBox(img, dset, titlized, deskripzed){
    function schlattor() {
        schlattbg.classList.remove("paged");
        schlattbg.src = img.src;
        console.log("nohov");
    }

    function msgify(){
        titlized.textContent = "";
        deskripzed.textContent = "";

        titlized.style.visibility = "hidden";
        deskripzed.style.visibility = "hidden";
    }

    return function(){
        msgify();
        schlattor();
    };
}

document.addEventListener("DOMContentLoaded", function(){ // On ready, reference XHRPot, the TOC and start fetching.
    document.body.style.pointerEvents = "none";

    xhrpot = gebi("XHRPot");
    schlattbg = gebi("zoombg").querySelector("img");
    deskrip = gebi("descriptor"); titler = gebi("titletor");
    const ases = xhrpot.getElementsByTagName("a");
    /* fetchMeMyPages(function() {
        console.log("done");
    }); */
    setTimeout(function() {
        carouselMyFetches();
        // xhrpot.classList.remove("boxesofcontents");
        for(const a of ases) {
            a.classList.remove("xhrpotboxanim1");
            a.style.transform = "translate(0%,-50%)";
        }

        setTimeout(function(){
            carouselMyFetches();
            //help.
            for(const b of ases){
                b.classList.remove("xhrpotboxanim2");
                b.style.transform = "translate(0%,-50%)";
            }

            setTimeout(function(){
                carouselMyFetches();
                //help.
                for(const c of ases){
                    c.classList.remove("xhrpotboxanim3");
                    c.style.transform = "translate(0%,-50%)";
                }

                setTimeout(function(){
                    carouselMyFetches();
                    //help.
                    for(const d of ases){
                        d.classList.remove("xhrpotboxanim4");
                        d.style.transform = "translate(0%,-50%)";
                    }
                    document.body.style.pointerEvents ="all";

                    for(const preimgf of ases){
                        const imgf = preimgf.querySelector("img");
                        const dset = preimgf.dataset;
                        imgf.onmouseover = createOnHoverBox(imgf, dset, titler, deskrip);
                        imgf.onmouseout = createOnUnhoverBox(imgf, dset, titler, deskrip);
                    }
                }, 400);
            }, 400); //3430
        }, 400); // 3230
    }, 2620);

    for(const a of ases) {
        a.onclick = function(e) {
            e.preventDefault();
            const self = this;
            const onDone = function(){
                window.location.href = self.href;
            };
            setTimeout(onDone, 1000); // Replace this with zoom done event
        }
    }
});