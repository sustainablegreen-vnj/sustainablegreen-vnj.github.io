const articledir = "/articles";
const directoryFile = `${articledir}/directory.txt`;
let xhrpot = null;

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

function fetchMeMyPages() {
    if(!xhrpot) return;

    fetch(directoryFile).then(function(response) { // Covert to text
        return response.text(); 
    }).then(function(directory) {
        // Set message
        xhrpot.innerHTML = "";
        const fmsg = document.createElement("a");
        fmsg.textContent = "Fetching the articles now...";
        xhrpot.appendChild(fmsg);
        xhrpot.setAttribute("notready", "false");
        let dirftws = directory.split("\n");
        let dirnftws = dirftws.map(function(fname) {
            return `${articledir}/${fname}`;
        });

        dirnftws.forEach(function(element) {
            fetch(element).then(function(response) {
                return response.text();
            }).then(function(text) {
                if(xhrpot.getAttribute("notready") == "false") {
                    xhrpot.innerHTML = "";
                    xhrpot.removeAttribute("notready");
                }

                const metai = fetchMyPagesData(text);
                
                const infobox = document.createElement("div");
                infobox.classList.add("xhrpotbox");

                const title = document.createElement("h3");
                title.textContent = metai["Title"];
                infobox.appendChild(title);

                const link = document.createElement("a");
                link.href = element;
                link.textContent = "Browse!";
                infobox.appendChild(link);

                const desc = document.createElement("p");
                desc.textContent = metai["Description"];
                infobox.appendChild(desc);

                xhrpot.appendChild(infobox);
            }).catch(function(_){/* Silent ignore */});
        })
    }).catch(function(reason) {
        xhrpot.textContent = "There was an error fetching the pages: " + reason;
    })
}

document.addEventListener("DOMContentLoaded", function(){ // On ready, reference XHRPot, the TOC and start fetching.
    xhrpot = gebi("XHRPot");
    fetchMeMyPages();
});