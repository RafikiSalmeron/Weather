const API_KEY = "15b4b878cd394bc48085757bd1f8b472";
var datos = "";
window.onload = function () {

  //setInterval(loadDoc, 5000);
  loadDoc();
};


function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      datos = JSON.parse(this.responseText);
      console.log(datos);
    }
    if (this.readyState == 4 && this.status == 204) {
      console.log("Error");
    }
  };

  xhttp.open("GET", "https://api.weatherbit.io/v2.0/forecast/daily?city=Peligros,ES&key=" + API_KEY, true);
  xhttp.send();
}
