export function createInput(labelText, labelInput, labelType = 'text') {
    const container = document.createElement('div');

    // Créer l'élément label
    const label = document.createElement('label');
    label.textContent = labelText;

    // Créer l'élément input
    const input = document.createElement('input');
    input.type = labelType; // Vous pouvez changer le type de l'input ici (text, number, etc.)
    input.value = labelInput;

    // Ajouter le label et l'input au conteneur
    container.appendChild(label);
    container.appendChild(input);
    return container;
  }