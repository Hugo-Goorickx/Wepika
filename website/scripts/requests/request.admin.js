import { createElement } from "../utils/createElement.js";
import { noImages } from "../utils/noImages.js";
import { createInput } from "../utils/createInput.js";
let listNetworks = [
    'tiktok',
    'facebook',
    'instagram',
    'pinterest',
    'twitter',
    'linkedin'
];

function requestProduct() {
    const urlParams = new URLSearchParams(window.location.search);

    const requestAPI = 'http://localhost:8001/id/' + urlParams.get('id');
    console.log(requestAPI);

    fetch(requestAPI)
        .then(response => response.json())
        .then(function(data) {
            const globalDatas = JSON.parse(data.globalDatas)[0];
            const attDatas = JSON.parse(data.attDatas);
            const flagDatas = JSON.parse(data.flagDatas);
            const networkDatas = JSON.parse(data.networkDatas);
            const shopDatas = JSON.parse(data.shopDatas);
            
            console.log(shopDatas);

            const mainElement = createElement('main', '', '', '', '', ['w-full', 'h-full', 'flex', 'bg-gray-100', 'justify-center', 'items-center']);
            const articleElement = createElement('article', '', '', '', '', ['w-95', 'h-90', 'border', 'border-gray-500']);
            const allDatasElement = createElement('div', '', '', '', '', ['flex', 'justify-between', 'h-95', 'p-2', 'border', 'border-gray-400']);
            
            const globalDatasElement = createElement('div', '', '', '', '', ['w-3/10', 'h-100','border', 'border-gray-400', 'flex', 'flex-col']);
            let general = createElement('div', '', '', '', '', ['p-2', 'border-p', 'border-gray-400', 'flex', 'flex-col']);
            //name
            general.appendChild(createInput('Titre: ', globalDatas.Name));
            //Descripion
            general.appendChild(createInput('Description: ', globalDatas.Description));
            //Logo
            general.appendChild(createInput('Logo: ', globalDatas.Logo));
            general.appendChild(createElement('img', globalDatas.Logo, 'logo', '', '', ['js_logo', 'w-auto', 'h-[70%]']));
            //Image
            general.appendChild(createInput('Image: ', globalDatas.Image_vitrine));
            general.appendChild(createElement('img', globalDatas.Image_vitrine, 'logo', '', '', ['js_logo', 'w-auto', 'h-[70%]']));
            //URL
            general.appendChild(createInput('URL: ', globalDatas.URL));
            globalDatasElement.appendChild(general);
            let socialNetworks = createElement('div', '', '', '', '', ['p-2', 'border-p', 'border-gray-400']);
            socialNetworks.appendChild(createElement('h3', '', '', '', 'Réseaux sociaux', ['text-2xl', 'text-center']));
            for (const network of networkDatas) {
                const input = createInput(listNetworks[network.type - 1], network.data);
                const br = createElement('br', '', '', '', '', []);
                socialNetworks.append(input, br);
            }
            globalDatasElement.appendChild(socialNetworks);


            const categDatasElement = createElement('div', '', '', '', '', ['w-3/10', 'h-full','border', 'border-gray-400', 'flex', 'flex-col']);
            let categories = createElement('div', '', '', '', '', ['p-2', 'border-p', 'border-gray-400']);
            categories.append(  createElement('h3', '', '', '', 'Catégories', ['text-2xl', 'text-center']), 
                                createElement('button', '', '', '', 'Ajouter une catégorie', ['border', 'w-auto', 'flex', 'justify-center', 'items-center', 'px-[2%]', 'py-0', 'border-solid', 'border-[black]']));
            for (const attribute of attDatas) {
                categories.append(  createElement('div', '', '', '', attribute.attribute_name, ['border', 'w-auto', 'flex', 'justify-center', 'items-center', 'px-[2%]', 'py-0', 'border-solid', 'border-[black]']),
                                    createElement('br', '', '', '', '', []));
            }
            categDatasElement.appendChild(categories);
            let flags = createElement('div', '', '', '', '', ['p-2', 'border-p', 'border-gray-400']);
            flags.append(   createElement('h3', '', '', '', 'Flags', ['text-2xl', 'text-center']),
                            createElement('button', '', '', '', 'Ajouter un flag', ['border', 'w-auto', 'flex', 'justify-center', 'items-center', 'px-[2%]', 'py-0', 'border-solid', 'border-[black]']));
            for (const flag of flagDatas) {
                flags.append(   createElement('div', '', '', '', flag.flag_name, ['border', 'w-auto', 'flex', 'justify-center', 'items-center', 'px-[2%]', 'py-0', 'border-solid', 'border-[black]']),
                                createElement('br', '', '', '', '', []));
            }
            categDatasElement.appendChild(flags);


            const shopDatasElement = createElement('div', '', '', '', '', ['w-3/10', 'h-100','border', 'border-gray-400']);
            let shop = createElement('div', '', '', '', '', ['p-2', 'border-p', 'border-gray-400', 'flex', 'flex-col']);
            shop.append(    createElement('h3', '', '', '', 'Magasin', ['text-2xl', 'text-center']),
                            createElement('button', '', '', '', 'Ajouter un magasin', ['border', 'w-auto', 'flex', 'justify-center', 'items-center', 'px-[2%]', 'py-0', 'border-solid', 'border-[black]']));
            for (const shopData of shopDatas) {
                let details = createElement('div', '', '', '', '', ['border', 'w-auto', 'flex', 'flex-col', 'items-center', 'px-[2%]', 'py-0', 'border-solid', 'border-[black]']);
                details.append( createInput('Adresse: ', shopData.address),
                                createElement('br', '', '', '', '', []),
                                createInput('Ville: ', shopData.city),
                                createElement('br', '', '', '', '', []),
                                createInput('Code postal: ', shopData.cp),
                                createElement('br', '', '', '', '', []),
                                createInput('Téléphone: ', shopData.phone),
                                createElement('br', '', '', '', '', []),
                                createInput('Email: ', shopData.email),
                                createElement('br', '', '', '', '', []));
                shop.append(details);
            }
            shopDatasElement.appendChild(shop);


            allDatasElement.append(globalDatasElement, categDatasElement, shopDatasElement);
            articleElement.appendChild(allDatasElement);
            mainElement.appendChild(articleElement);

            document.body.appendChild(mainElement);
            noImages();
        });
}

requestProduct();
