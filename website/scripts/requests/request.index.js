import { createElement } from '../utils/createElement.js';
import { noImages } from '../utils/noImages.js';

function indexRequest() {
    let size = localStorage.getItem('session_size');
    size = size ? JSON.parse(size) : 20;
    let start = localStorage.getItem('session_start');
    start = start ? JSON.parse(start) : 0;
    let requestAPI;
    let provinces = localStorage.getItem('selectedProvinces');
    provinces = provinces ? JSON.parse(provinces) : [];
    if (provinces.length > 0) {
        provinces = provinces.join('-');
        requestAPI = 'http://localhost:8001/all/' + start + '/' + size + '/' + provinces;
    }
    else
        requestAPI = 'http://localhost:8001/all/' + start + '/' + size ;
    console.log('api' +requestAPI);
    fetch(requestAPI)
    .then(response => response.json())
    .then(function(data) {
        console.log(data);
        data.forEach(function(product) {
            // Création de l'élément <article>
            const   article = createElement('article', '', '', '', '', ['border', 'w-[490px]', 'h-[435px]', 'grid', 'grid-cols-[60%_40%]', 'grid-rows-[repeat(3,1fr)]', 'border-solid', 'border-[black]']);
    
            // Création de l'élément <span> avec l'image
            const   imageSpan = createElement('span', '', '', '', '', ['col-start-1', 'col-end-2', 'row-start-1', 'row-end-4', 'w-full', 'flex', 'justify-center', 'items-center']);
                    imageSpan.appendChild(createElement('img', './images/satas.png', 'image page bureau', '', '', ['max-h-[90%]', 'w-auto']));
    
            // Création du lien avec le logo
            const domainWithoutDot = product.Name.replace('.', '-'); // Supprime le point
            const idParameter = "id=" + encodeURIComponent(domainWithoutDot);
            const   logoLink = createElement('a', '', '', './product.html?' + idParameter , '', ['col-start-2', 'col-end-3', 'row-start-1', 'row-end-2', 'w-full', 'flex', 'justify-center', 'items-center']) ;
                    logoLink.appendChild(createElement('img', product.Logo, 'logo', '', '', ['js_logo', 'h-auto', 'w-4/5']));
    
            // Création du conteneur avec les éléments en grille
            const   gridContainer = createElement('div', '', '', '', '', ['col-start-2', 'col-end-3', 'row-start-3', 'row-end-4', 'text-xs', 'w-[90%]', 'h-[90%]', 'grid', 'grid-cols-[1fr]', 'grid-rows-[1fr_0.5fr_1fr_0.5fr_1fr]']);
                    // Création du premier élément de la grille
                    gridContainer.appendChild(createElement('span', '', '', '', product.Categories, ['col-start-1', 'col-end-2', 'row-start-1', 'row-end-2', 'border', 'w-auto', 'flex', 'justify-center', 'items-center', 'border-solid', 'border-[black]']));
            
            article.append(imageSpan, logoLink,createElement('p', '', '', '', product.Description, ['col-start-2', 'col-end-3', 'row-start-2', 'row-end-3', 'text-base', 'text-center']));
            if (product.Categories)
                article.appendChild(gridContainer);
            // Ajout de l'article au document
            document.getElementById('js_articles').appendChild(article);
        });
    noImages();
    })
}

indexRequest();