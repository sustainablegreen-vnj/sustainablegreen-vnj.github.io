let sel = null;
document.addEventListener( "DOMContentLoaded", function() {
    sel = new Splide("#vcarousel", { // Creates the carousel
        autoHeight: true,
        direction: "ttb",
        height: '53vh',
        perPage: 1
    });
    sel.mount(); // Mounts it actually for real. This is very important as if this doesn't exist, no carousel.
});