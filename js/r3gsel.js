let sel = null;
document.addEventListener( "DOMContentLoaded", function() {
    sel = new Splide(".splide", {
        autoHeight: true,
        direction: "ttb",
        height: '100vh',
    });
    sel.mount();
});