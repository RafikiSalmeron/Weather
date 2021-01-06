const API_KEY = "15b4b878cd394bc48085757bd1f8b472";
var datos = "";
var evento;
var array = [];
var busqueda;
var division;
var modalWrap = null;
var tablaModal = null;

window.onload = function() {
  enter();
  loadDoc();
};

function enter(){
  busqueda = document.getElementById("search");
  busqueda.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
          event.preventDefault();
          document.getElementById("btnSearch").click();
          busqueda.value = "";
      }
  });
}

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      datos = JSON.parse(this.responseText);
      cargarTiempo(datos);
    }
    if (this.readyState == 4 && this.status == 204) {
      console.log("Error");
      alert("No se encuentra la ciudad especificada. Disculpe las molestias");
    }
  };
  xhttp.open("GET", "https://api.weatherbit.io/v2.0/forecast/daily?city=Granada,ES&key=" + API_KEY, true);
  xhttp.send();
}

function searchDoc() {
  busqueda = document.getElementById("search");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      datos = JSON.parse(this.responseText);
      division.innerHTML = "";
      cargarTiempo(datos);
    }
    if (this.readyState == 4 && this.status == 204) {
      console.log("Error");
      alert("No se encuentra la ciudad especificada. Disculpe las molestias");
    }
  };
  xhttp.open("GET", "https://api.weatherbit.io/v2.0/forecast/daily?city=" + busqueda.value + ",ES&key=" + API_KEY, true);
  xhttp.send();
}

function cargarTiempo(datos) {
  array = [];
  division = document.getElementById("bloque");
  for (let i = 0; i < datos.data.length; i++) {
    var divCard = document.createElement("div");
    divCard.setAttribute("class", "card");
    divCard.style.width = "18rem";

    var imgCard = document.createElement("img");
    imgCard.src = "./img/" + imgTiempo(datos.data[i].weather) + ".jpg";
    imgCard.setAttribute("class", "card-img-top");

    var divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    var tabla = document.createElement("table");
    var tr1 = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td2.style.textAlign = "right";

    var tr2 = document.createElement("tr");
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

    var aCard = document.createElement("button");
    aCard.setAttribute("class", "btn btn-primary");
    aCard.textContent = "Ver detalles";

    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
    aCard.addEventListener("click", function() {
      infoModal(event);
      myModal.show();
      //showModal();
      //test(event);
    });
    array.push(aCard);

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

function imgTiempo(dato) {
  var code = dato.code;
  if (code >= 200 && code <= 233) {
    return "tormenta";
  }
  if (code >= 300 && code <= 522) {
    return "lluvia";
  }
  if (code >= 600 && code <= 623) {
    return "nieve";
  }
  if (code >= 700 && code <= 751) {
    return "niebla";
  }
  if (code >= 800 && code <= 803) {
    return "claro";
  }
  if (code >= 804 && code <= 900) {
    return "nubes";
  }
}

function infoModal(event) {
  evento = event.target;
  var i = array.indexOf(evento);

  document.getElementById("exampleModalLabel").textContent = datos.city_name;
  var bodyModal = document.getElementById("bodyModal");
  bodyModal.innerHTML = "";
  bodyModal.appendChild(crearTablaModal(datos.data[i]));
}

function crearTablaModal(dato) {
  var tablaModal = document.createElement("table");

  var tr1 = document.createElement("tr");
  var td1 = document.createElement("td");
  td1.textContent = "Día :";
  var td2 = document.createElement("td");
  td2.style.textAlign = "right";
  td2.textContent = convertDateFormat(dato.datetime);

  var tr2 = document.createElement("tr");
  var td3 = document.createElement("td");
  td3.textContent = "Tiempo :";
  var td4 = document.createElement("td");
  td4.style.textAlign = "right";
  td4.textContent = traducirTiempo(dato.weather.description);

  var tr3 = document.createElement("tr");
  var td5 = document.createElement("td");
  td5.textContent = "Probabilidad de precipitación :";
  var td6 = document.createElement("td");
  td6.style.textAlign = "right";
  td6.textContent = dato.pop + " %";

  var tr4 = document.createElement("tr");
  var td7 = document.createElement("td");
  td7.textContent = "Temperatura mínima :";
  var td8 = document.createElement("td");
  td8.style.textAlign = "right";
  td8.textContent = dato.min_temp + " °C";

  var tr5 = document.createElement("tr");
  var td9 = document.createElement("td");
  td9.textContent = "Temperatura máxima :";
  var td10 = document.createElement("td");
  td10.style.textAlign = "right";
  td10.textContent = dato.max_temp + " °C";


  tablaModal.appendChild(tr1);
  tr1.appendChild(td1);
  tr1.appendChild(td2);

  tablaModal.appendChild(tr2);
  tr2.appendChild(td3);
  tr2.appendChild(td4);

  tablaModal.appendChild(tr3);
  tr3.appendChild(td5);
  tr3.appendChild(td6);

  tablaModal.appendChild(tr4);
  tr4.appendChild(td7);
  tr4.appendChild(td8);

  tablaModal.appendChild(tr5);
  tr5.appendChild(td9);
  tr5.appendChild(td10);

  return tablaModal;
}

function traducirTiempo(prec) {
  switch (prec) {
    case "Thunderstorm with light rain":
      return "Tormenta con lluvia ligera";

    case "Thunderstorm with rain":
      return "Tormenta con lluvia";

    case "Thunderstorm with heavy rain":
      return "Tormenta con lluvia intensa";

    case "Thunderstorm with light drizzle":
      return "Tormenta con lluvia ligera";

    case "Thunderstorm with drizzle":
      return "Tormenta con llovizna";
      //
    case "Thunderstorm with heavy drizzle":
      return "Tormenta con llovizna intensa";

    case "Thunderstorm with hail":
      return "Tormenta con granizo";

    case "Light drizzle":
      return "Llovizna ligera";
      //
    case "Drizzle":
      return "Llovizna";

    case "Heavy drizzle":
      return "Llovizna intensa";

    case "Light rain":
      return "Lluvia ligera";

    case "Moderate rain":
      return "Lluvia moderada";

    case "Heavy rain":
      return "Lluvia Pesada";

    case "Freezing rain":
      return "Lluvia helada";

    case "Light shower rain":
      return "Lluvia ligera";

    case "Shower rain":
      return "Aguacero";

    case "Heavy shower rain":
      return "Aguacero intenso";

    case "Light snow":
      return "Nieve ligera";

    case "Snow":
      return "Nieve";

    case "Heavy snow":
      return "Nieve intensa";

    case "Mix snow/rain":
      return "Aguanieve";

    case "Sleet":
      return "Aguanieve";

    case "Heavy sleet":
      return "Aguanieve";

    case "Snow shower":
      return "Nevada";

    case "Heavy snow shower":
      return "Nevada intensa";

    case "Flurries":
      return "Nevada ligera";

    case "Mist":
      return "Niebla";

    case "Smoke":
      return "Ahumado";

    case "Haze":
      return "Calina";

    case "Sand/dust":
      return "Arena/Polvo";

    case "Fog":
      return "Niebla";

    case "Freezing fog":
      return "Niebla helada";

    case "Clear Sky":
      return "Cielo despejado";

    case "Few clouds":
      return "Pocas nubes";

    case "Scattered clouds":
      return "Nubes dispersas";

    case "Broken clouds":
      return "Nubes rotas";

    case "Overcast clouds":
      return "Cielo cubierto de nubes";

    default:
      return "Desconocido";
  }
}

function convertDateFormat(string) {
  var info = string.split('-').reverse().join('/');
  return info;
}
