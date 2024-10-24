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

        // Set fetching message
        xhrpot.innerHTML = "";
        const fmsg = document.createElement("p");
        fmsg.textContent = "Fetching the articles now...";
        xhrpot.appendChild(fmsg);
        xhrpot.setAttribute("notready", "false");

        // Fetch all the items and create a new list of paths
        let dirftws = directory.split("\n");
        let dirnftws = dirftws.map(function(fname) {
            return `${articledir}/${fname}`;
        });

        dirnftws.forEach(function(element) { // Loop over each directory entries
            fetch(element).then(function(response) {
                return response.text();
            }).then(function(text) {
                if(xhrpot.getAttribute("notready") == "false") { // If still initial, mark as ready
                    xhrpot.innerHTML = "";
                    xhrpot.removeAttribute("notready");
                }

                const metai = fetchMyPagesData(text); // Fetch page info
                
                const infobox = document.createElement("a"); // Create xhrpot box
                infobox.href = element;
                infobox.classList.add("xhrpotbox");

                const title = document.createElement("h3"); // Create header
                title.textContent = metai["Title"];
                infobox.appendChild(title);

                const desc = document.createElement("p"); // Create description
                desc.textContent = metai["Description"];
                infobox.appendChild(desc);

                xhrpot.appendChild(infobox); // Put it to the xhrpot
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