const searchResults = document.getElementById('result');
const searchResults2 = document.getElementById('result2');
const inputfrom = document.querySelector("#from");
const inputtoo = document.querySelector("#too");
const tables = document.querySelector(".table-container");
const failAlert = document.querySelector(".failAlert");
const form = document.getElementById("form");


let apikey = "210336fa-863a-4150-9ed8-a420ecc0f203";

let travel = new travelBot(apikey)
let render = new renderData();
travel.getInput();
travel.searchHelp();
render.renderTable();