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

    $.ajax({ // Fetch the directory, which is where all the articles are.
        url: directoryFile,
        success: function(result) {
            // Set message
            xhrpot.innerHTML = "";
            const fmsg = document.createElement("a");
            fmsg.textContent = "Fetching the articles now...";
            xhrpot.appendChild(fmsg);
            xhrpot.setAttribute("notready", "false");

            let dirftws = result.split("\n");
            let dirnftws = dirftws.map(function(fname) {
                return `${articledir}/${fname}`;
            });

            dirnftws.forEach(function(element) {
                $.ajax({
                    url: element,
                    success: function(result2) {
                        if(xhrpot.getAttribute("notready") == "false") {
                            xhrpot.innerHTML = "";
                            xhrpot.removeAttribute("notready");
                        }

                        const metai = fetchMyPagesData(result2);
                        
                        const infobox = document.createElement("div");
                        infobox.classList.add("xhrpotbox");

                        const title = document.createElement("h3");
                        title.textContent = metai["Title"];
                        infobox.appendChild(title);

                        const link = document.createElement("a");
                        link.href = "/";
                        link.textContent = "Browse!";
                        infobox.appendChild(link);

                        const desc = document.createElement("p");
                        desc.textContent = metai["Description"];
                        infobox.appendChild(desc);

                        xhrpot.appendChild(infobox);
                    }
                });
            });
        }
    })
}

$(function(){ // On ready, reference XHRPot, the TOC and start fetching.
    xhrpot = gebi("XHRPot");
    fetchMeMyPages();
});