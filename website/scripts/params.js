document.getElementById("params").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var selectedProvinces = [];
    var checkboxes = document.getElementsByName("province[]");
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        selectedProvinces.push(checkboxes[i].value);
      }
    }
    console.log("Provinces sélectionnées : ", selectedProvinces);
    
    localStorage.setItem("selectedProvinces", JSON.stringify(selectedProvinces));
  });
  