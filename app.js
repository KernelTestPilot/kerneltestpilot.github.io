class travelBot {
    constructor(APIkey) {
        this.APIkey = APIkey;
        this.ID = [];
    }
    renderData(depatures){
        failAlert.style.display = "none"
        const render = new renderData(depatures);
        render.renderTable();
    }
    sendID(ID){
        this.ID.push(ID);
    }
    getInput(){
    form.addEventListener("submit", (e) => {
    if (form.value != "") {
        e.preventDefault();
        tables.innerHTML="";
        this.ID.splice(0, this.ID.length)
        this.handleData(e.target)
        }
      })
    }
    searchHelp(){
      inputfrom.addEventListener("keydown", (e) => {
        if (inputfrom.value != "") {
         this.getResult(inputfrom.value, searchResults)
        }
        })
        inputtoo.addEventListener("keydown", (e) => {
          if (inputtoo.value != "") {
            this.getResult(inputtoo.value, searchResults2)
          }
          })
    }
    getResult(input, maincontainer){
      this.searchHelper(input).then((data) => {
         for (let i = 0; i < data.stopLocationOrCoordLocation.length; i++) {
          const option = document.createElement("option");
          option.value = data.stopLocationOrCoordLocation[i].StopLocation.name;
          maincontainer.appendChild(option);
          }
      })          
     
    }
    searchHelper(input){
      return fetch("https://api.resrobot.se/v2.1/location.name?input="+input+"?&format=json&accessId="+this.APIkey+"")
      .then((response) => response.json())
      .catch((err) => console.log(err)) ;
    }
    fetchtID(name){
      fetch("https://api.resrobot.se/v2.1/location.name?input="+name.from+"&format=json&accessId="+this.APIkey+"")
      .then(response => response.json())
      .then(data => {
        this.sendID(data.stopLocationOrCoordLocation[0].StopLocation.extId)
        //Another fetch method
        return fetch("https://api.resrobot.se/v2.1/location.name?input="+name.too+"&format=json&accessId="+this.APIkey+"")
      })
      .then(response => response.json())
      .then(data => {
        this.sendID(data.stopLocationOrCoordLocation[0].StopLocation.extId)
        return fetch("https://api.resrobot.se/v2.1/trip?format=json&originId="+this.ID[0]+"&destId="+this.ID[1]+"&passlist=true&showPassingPoints=true&LegList&accessId="+this.APIkey+"")
      })
      .then(response => response.json())
      .then(data => {
        this.renderData(data)
      })
      .catch(error => {
        failAlert.style.display = "inline"
        console.log(error);
      });
  }
   
    handleData(form){
        let formData = new FormData(form)
        let data = Object.fromEntries(formData);
        this.fetchtID(data);
    }
} 