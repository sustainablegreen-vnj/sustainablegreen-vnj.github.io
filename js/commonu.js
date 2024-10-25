const gebi = document.getElementById.bind(document);

function scrollTo(x, y, time=0) {
    let scrollId = 0; // Set scroll id
    let scrollAmount = 100;
}

function scrollLater(wheredom, timems) {
    return setTimeout(function() {
        wheredom.scrollIntoView();
    }, timems);
}