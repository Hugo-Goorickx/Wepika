export function noImages() {
    var logoImage = document.getElementsByTagName("img");
    for (var i = 0; i < logoImage.length; i++)
        logoImage[i].onerror = function() { this.src = "./images/no_image.jpeg"; }; 
}
