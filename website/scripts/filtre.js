let form = document.createElement("form");
form.id = "params";
let cps = [{
            name: "Province non définie",
            id: 0
        }
        ,{
            name: "Region Bruxelles-Capitale",
            id: 1
        }
        ,{
            name: "Brabant Wallon",
            id: 2
        }
        ,{
            name: "Brabant Flamand",
            id: 3
        }
        ,{
            name: "Anvers",
            id: 4
        }
        ,{
            name: "Limbourg",
            id: 5
        }
        ,{
            name: "Liège",
            id: 6
        }
        ,{
            name: "Namur",
            id: 7
        }
        ,{
            name: "Hainaut",
            id: 8
        }
        ,{
            name: "Luxembourg",
            id: 9
        }
        ,{
            name: "Flandre Occidentale",
            id: 10
        }
        ,{
            name: "Flandre Orientale",
            id: 11
        }];
cps.forEach(cp => {
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.type = "checkbox";
    input.name = "province[]";
    input.value = cp.id;
    input.id = cp.name;
    input.title = cp.name;
    label.for = cp.name;
    label.innerHTML = cp.name;
    form.appendChild(input);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
});
let input = document.createElement("input");
input.type = "submit";
input.value = "Soumettre";
form.appendChild(input);
document.getElementById("filter").appendChild(form);