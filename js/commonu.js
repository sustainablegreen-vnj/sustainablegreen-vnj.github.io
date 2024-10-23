const gebi = document.getElementById.bind(document);

function scrollLater(wheredom, timems) {
    return setTimeout(function() {
        wheredom.scrollIntoView();
    }, timems);
}