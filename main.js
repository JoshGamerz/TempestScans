function generateCards() {
    var url = 'https://tempest-scan.herokuapp.com/database'
    var xmlHttp = new XMLHttpRequest();
    // xmlHttp.overrideMimeType("application/json");
    xmlHttp.open("GET", url, false);
    xmlHttp.setRequestHeader('key', '4aEdFoYwMAyfwZHqGFuvfgM2arXyOm51')
    xmlHttp.send(null);
    var json = JSON.parse(xmlHttp.responseText);
    for (var key in json) {
        document.getElementById("cards").innerHTML +=
            `<div class="card" id=${key} onClick="test(this.id)"> <img class="card-image" src=${json[key]['manga_thumbnail_url']} alt="image"> <div class="card-content"> <h3>${json[key]['manga_name']}</h3> </div> </div>`;
    }
}


function save_to_db() {
    var manga_name = document.getElementById("name").value;
    var manga_thumbnail = document.getElementById("thumbnail").value;
    var manga_desc = document.getElementById("description").value;
    var manga_pdf_url = document.getElementById("pdf").value;


    if (manga_name != "" && manga_thumbnail != "" && manga_desc != "" && manga_pdf_url != "") {
        var data = JSON.stringify({
            "manga_name": manga_name,
            "manga_thumbnail_url": manga_thumbnail,
            "manga_desc": manga_desc,
            "manga_pdf": manga_pdf_url,
        });

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (JSON.parse(xhr.responseText)['status'] == 'success') {
                    show_snackbar("Data saved to database successfully!");
                }
            }
        }

        xhr.open("POST", "https://tempest-scan.herokuapp.com/savetodatabase");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("key", "4aEdFoYwMAyfwZHqGFuvfgM2arXyOm51");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send(data);


    } else {
        show_snackbar("Please fill the empty fields..");
    }




}


function show_snackbar(text) {
    // Get the snackbar DIV
    var snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = text;

    // Add the "show" class to DIV
    snackbar.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}


function search(){
    query = document.getElementById("search-bar").value;
    var url = 'https://tempest-scan.herokuapp.com/search?query='+query;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.setRequestHeader('key', '4aEdFoYwMAyfwZHqGFuvfgM2arXyOm51')
    xmlHttp.send(null);
    var json = JSON.parse(xmlHttp.responseText);
    const card_element = document.getElementById("cards");
    card_element.innerHTML = '';
    for (var key in json) {
        document.getElementById("cards").innerHTML +=
            `<div class="card" id=${key} onClick="test(this.id)"> <img class="card-image" src=${json[key]['manga_thumbnail_url']} alt="image"> <div class="card-content"> <h3>${json[key]['manga_name']}</h3> </div> </div>`;
    }
}
