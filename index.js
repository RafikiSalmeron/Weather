const API_KEY = "15b4b878cd394bc48085757bd1f8b472";
var datos = "";
var evento;
var array = [];
var busqueda;
var division;
window.onload = function() {
  //setInterval(loadDoc, 5000);
  loadDoc();
};

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      datos = JSON.parse(this.responseText);
      console.log(datos);
      //crearTiempo(datos);
      prueba2(datos);
    }
    if (this.readyState == 4 && this.status == 204) {
      console.log("Error");
    }
  };
  xhttp.open("GET", "https://api.weatherbit.io/v2.0/forecast/daily?city=Peligros,ES&key=" + API_KEY, true);
  xhttp.send();
}

function searchDoc() {
  busqueda = document.getElementById("search");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      datos = JSON.parse(this.responseText);
      console.log(datos);
      division.innerHTML = "";
      crearTiempo(datos);
    }
    if (this.readyState == 4 && this.status == 204) {
      console.log("Error");
    }
  };
  xhttp.open("GET", "https://api.weatherbit.io/v2.0/forecast/daily?city=" + busqueda.value + ",ES&key=" + API_KEY, true);
  xhttp.send();
}

function prueba(datos) {
  array = [];
  division = document.getElementById("bloque");
  for (let i = 0; i < datos.data.length; i++) {
    var divCard = document.createElement("div");
    divCard.setAttribute("class", "card");
    divCard.style.width = "18rem";

    var imgCard = document.createElement("img");
    imgCard.src = "./img/claro.jpg";
    imgCard.setAttribute("class", "card-img-top");

    var divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    var h5Card = document.createElement("h5");
    h5Card.setAttribute("class", "card-title");
    h5Card.textContent = datos.city_name;

    var pCard = document.createElement("p");
    pCard.setAttribute("class", "card-text");
    pCard.textContent = convertDateFormat(datos.data[i].datetime);

    var aCard = document.createElement("a");
    aCard.setAttribute("class", "btn btn-primary");
    aCard.textContent = "Go somewhere";

    division.appendChild(divCard);
    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(h5Card);
    divCardBody.appendChild(pCard);
    divCardBody.appendChild(aCard);

  }
}


function prueba2(datos) {
  array = [];
  division = document.getElementById("bloque");
  for (let i = 0; i < datos.data.length; i++) {
    var divCard = document.createElement("div");
    divCard.setAttribute("class", "card");
    divCard.style.width = "18rem";

    var imgCard = document.createElement("img");
    imgCard.src = "./img/claro.jpg";
    imgCard.setAttribute("class", "card-img-top");

    var divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    var tabla = document.createElement("table");
    var tr1 =  document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td2.style.textAlign = "right";

    var tr2 =  document.createElement("tr");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    td4.style.textAlign = "right";


    var h5Card = document.createElement("h5");
    h5Card.setAttribute("class", "card-title");
    h5Card.textContent = datos.city_name;

    var imgIco = document.createElement("img");
    imgIco.setAttribute("class", "iconos");
    imgIco.src = "./img/icons/" + datos.data[i].weather.icon + ".png";

    var pCard = document.createElement("p");
    pCard.setAttribute("class", "card-text");
    pCard.textContent = convertDateFormat(datos.data[i].datetime);



    var aCard = document.createElement("a");
    aCard.setAttribute("class", "btn btn-primary");
    aCard.textContent = "Go somewhere";

    division.appendChild(divCard);
    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);

    divCardBody.appendChild(tabla);
    tabla.appendChild(tr1);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tabla.appendChild(tr2);
    tr2.appendChild(td3);
    tr2.appendChild(td4);

    td1.appendChild(h5Card);
    td2.appendChild(imgIco);
    td3.appendChild(pCard);
    divCardBody.appendChild(aCard);

  }
}




function crearTiempo(datos) {
  array = [];
  division = document.getElementById("bloque");
  for (let i = 0; i < datos.data.length; i++) {
    var boton = document.createElement("button");
    boton.addEventListener("click", function() {
      test(event)
    });
    //boton.setAttribute("onclick", "confirmar()");
    boton.setAttribute("class", "boton");
    boton.textContent = datos.data[i].datetime;
    array.push(boton);

    division.appendChild(boton);
  }
}

function convertDateFormat(string) {
  var info = string.split('-').reverse().join('/');
  return info;
}

function test(event) {
  evento = event.target
  var prueba = array.indexOf(evento);
  console.log(datos.data[prueba]);
}
