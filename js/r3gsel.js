let sel = null;
document.addEventListener( "DOMContentLoaded", function() {
    sel = new Splide("#vcarousel", {
        autoHeight: true,
        direction: "ttb",
        height: '100vh',
    });
    sel.mount();
});