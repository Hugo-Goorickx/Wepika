function pagination() {
    let session_start = localStorage.getItem('session_start');
    let session_size = localStorage.getItem('session_size');
    if (session_start)
        session_start = JSON.parse(session_start);
    else
    {
        session_start = 0;
        localStorage.setItem('session_start', JSON.stringify(session_start));
    }
    if (session_size)
        session_size = JSON.parse(session_size);
    else
    {
        session_size = 20;
        localStorage.setItem('session_size', JSON.stringify(session_size));
    }
    let middle = session_start/session_size;
    let pagination = document.getElementById("pagination");
    if(middle)
    {
        let prevBtn = document.createElement("button");
            prevBtn.setAttribute("id", "prevBtn");
            prevBtn.textContent = "Précédent";
        pagination.appendChild(prevBtn);
    }
    let btn = document.createElement("button");
        btn.setAttribute("id", "nextBtn");
        btn.textContent = "Suivant";
    let position = document.createElement("span");
        position.setAttribute("id", "currentPage");
        position.textContent = "Page " + (middle + 1);
    pagination.appendChild(position);
    pagination.appendChild(btn);

    //<button id="prevBtn" disabled>Précédent</button>
    //<span id="currentPage">Page 1</span>
    //<button id="nextBtn">Suivant</button>
}

pagination();

let btn = document.getElementById("prevBtn");
if (btn)
{
    btn.addEventListener("click", function() {
        let session_start = localStorage.getItem('session_start');
        let session_size = localStorage.getItem('session_size');
        session_size = JSON.parse(session_size);
        session_start = JSON.parse(session_start);
    
        if (session_start < session_size)
        {
            session_start = 0;
            localStorage.setItem('session_start', JSON.stringify(session_start));
        }
        else
        {
            session_start -= session_size;
            localStorage.setItem('session_start', JSON.stringify(session_start));
        }
        window.location.reload();
    });
}

document.getElementById("nextBtn").addEventListener("click", function() {
    let session_start = localStorage.getItem('session_start');
    let session_size = localStorage.getItem('session_size');
    session_size = JSON.parse(session_size);
    session_start = JSON.parse(session_start);
    session_start += session_size;
    console.log("te" + session_start);
    localStorage.setItem('session_start', JSON.stringify(session_start));
    window.location.reload();   
});