import { createElement } from "../utils/createElement.js";
import { noImages } from "../utils/noImages.js";

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
            const shopDatas = JSON.parse(data.shopDatas)[0];

            const articleElement = createElement('article', '', '', '', '', ['w-[70vw]', 'h-[50vw]', 'border', 'grid', 'grid-cols-[repeat(5,1fr)]', 'grid-rows-[14%_7%_30%_7%_30%_12%]', 'ml-[15vw]', 'mr-0', 'mt-[10vh]', 'mb-0', 'border-solid', 'border-[black]']);

            //Logo
            const logoSpan = createElement('span', '', '', '', '', ['col-start-1', 'col-end-3', 'row-start-1', 'row-end-2', 'flex', 'justify-center', 'items-center']);
            logoSpan.appendChild(createElement('img', globalDatas.Logo, 'logo', '', '', ['js_logo', 'w-auto', 'h-[70%]']));
            articleElement.appendChild(logoSpan);

            //Title with Name
            articleElement.appendChild(createElement('h3', '', '', '', globalDatas.Name, ['col-start-3', 'col-end-6', 'row-start-1', 'row-end-2', 'text-3xl']));

            //Flags and Attributes
            if (attDatas.length > 0) {
                const statsDiv = createElement('div', '', '', '', '', ['col-start-1', 'col-end-6', 'row-start-2', 'row-end-3', 'text-2xl', 'h-[90%]', 'flex', 'flex-row', 'justify-between', 'items-center', 'mx-[20%]', 'my-0']);

                for (const attribute of attDatas)
                    statsDiv.appendChild(createElement('span', '', '', '', attribute.attribute_name, ['border', 'w-auto', 'h-3/4', 'flex', 'justify-center', 'items-center', 'px-[2%]', 'py-0', 'border-solid', 'border-[black]']));
                for (const flag of flagDatas)
                    statsDiv.appendChild(createElement('span', '', '', '', flag.flag_name, ['border', 'w-auto', 'h-3/4', 'flex', 'justify-center', 'items-center', 'px-[2%]', 'py-0', 'border-solid', 'border-[black]']));

                articleElement.appendChild(statsDiv);
            }

            //Image
            const imageSpan = createElement('span', '', '', '', '', ['col-start-1', 'col-end-3', 'row-start-3', 'row-end-6', 'flex', 'justify-center', 'items-center']);
            imageSpan.appendChild(createElement('img', globalDatas.Image_vitrine, 'image page bureau', '', '', ['h-full', 'w-auto']));
            articleElement.appendChild(imageSpan);

            //Description
            articleElement.appendChild(createElement('p', '', '', '', globalDatas.Description, ['col-start-3', 'col-end-6', 'row-start-3', 'row-end-4', 'flex', 'justify-center', 'items-center', 'text-2xl']));

            //Link
            const linkSpan = createElement('span', '', '', '', '', ['col-start-4', 'col-end-5', 'row-start-4', 'row-end-5', 'h-full', 'w-full', 'flex', 'justify-center', 'items-center']);
            linkSpan.appendChild(createElement('a', '', '', globalDatas.URL, 'Aller vers le site', ['flex', 'justify-center', 'items-center', 'h-3/6', 'w-auto', 'text-xl', 'border', 'px-[3%]', 'border-solid', 'border-[black]']));
            articleElement.appendChild(linkSpan);

            const socialDiv = createElement('div', '', '', '', '', ['col-start-2', 'col-end-5', 'row-start-6', 'row-end-7', 'border', 'w-3/5', 'h-4/5', 'flex', 'flex-col', 'items-center', 'ml-[20%]', 'border-solid', 'border-[black]']);
            socialDiv.appendChild(createElement('p', '', '', '', shopDatas ? `${shopDatas.address} ${shopDatas.city} ${shopDatas.cp}` : "Pas d'adresse disponible", ['text-[75%]', 'h-auto']));

            const socialLinksSpan = createElement('span', '', '', '', '', ['h-2/5', 'w-4/5', 'flex', 'justify-between', 'items-center']);

            for (const network of networkDatas) {
                const networkLink = createElement('a', '', '', `https://${network.data}`, '', ['h-full', 'w-auto']);
                networkLink.appendChild(createElement('img', `./images/logo_networks/${network.type}.png`, network.type, '', '', ['h-full', 'w-auto']));
                socialLinksSpan.appendChild(networkLink);
            }

            socialDiv.appendChild(socialLinksSpan);
            articleElement.appendChild(socialDiv);

            document.body.appendChild(articleElement);
            noImages();
        });
}

requestProduct();
