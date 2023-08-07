export function createElement(nameElement, src, alt, href, textContent, classList) {
    const element = document.createElement(nameElement);
    if (src !== '')
        element.src = src;
    if (alt !== '')
        element.alt = alt;
    if (href !== '')
        element.href = href;
    if (textContent !== '')
        element.textContent = textContent;
    if (classList.length > 0)
        classList.forEach(function(className) { element.classList.add(className);});
    return element;
}