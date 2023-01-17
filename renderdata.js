class renderData {
    constructor(data) {
        this.data = data;
        this.trip = [];
    }
    getTrips(){
        for (let i = 0; i < this.data.Trip.length; i++) {
            this.trip.push(this.data.Trip[i])
        }
    }
    createTh(input, rows, classes){
        let th = document.createElement("th");
        th.className = classes;
        th.innerHTML = input;
        rows.appendChild(th);
    }
    calcTime(startt,endt, startd,endd){
        let startTime = startt;
        let endTime = endt;
        let Sdate = startd+" ";
        let Edate = endd+ " ";
        let start = new Date(Sdate + startTime);
        let end = new Date(Edate + endTime);
        let diff = end - start;
        return diff / (1000 * 60);
    }
    trimTime(time){
        return time.substring(0, time.length - 3);
    }
    renderTable(){
        this.getTrips();
        let table = document.createElement("table");
        table.className = "table"
        for (let i = 0; i < this.trip.length; i++) {
           let time = this.calcTime(this.trip[i].Origin.time,this.trip[i].Destination.time,this.trip[i].Origin.date, this.trip[i].Destination.date )
            let rows = table.insertRow();         
            this.createTh("Avgång", rows,"th-bg2");
            this.createTh("", rows, "th-bg2");
            this.createTh("No.", rows, "th-bg3");
            this.createTh("Total restid:" +time+" min", rows, "th-bg");
            this.createTh("", rows, "th-bg");
            this.createTh("Ankomst", rows,"th-bg2");
            for (let a = 0; a < this.trip[i].LegList.Leg.length; a++) {
    
                let row = table.insertRow();
                let timeCell = row.insertCell();
                let iconCell = row.insertCell()
                let trainCell = row.insertCell();
                let fromCell = row.insertCell();
                let tooCell = row.insertCell();
                let arrivalCell = row.insertCell();
                let depTime = this.trimTime(this.trip[i].LegList.Leg[a].Origin.time)
                let arrivalTime = this.trimTime(this.trip[i].LegList.Leg[a].Destination.time)
                this.checkUndef(this.trip[i].LegList.Leg[a].Product[0].num, trainCell)
                this.checkUndef(this.trip[i].LegList.Leg[a].Origin.name,fromCell)
                this.checkUndef(depTime,timeCell)
                this.checkUndef(this.trip[i].LegList.Leg[a].Destination.name,tooCell)
                this.checkUndef(arrivalTime, arrivalCell)
                this.checkId(this.trip[i].LegList.Leg[a].Product[0].catIn,iconCell)

            }
          }
          tables.appendChild(table)

        console.log(this.trip)
}

    checkId(id,iconCell){
        if(id == "BLT" ||id == "BXB" || id == "BAX"){
            iconCell.innerHTML = `<div class="icon has-text-info">
        <i class="fa-solid fa-bus-simple fa-lg"></i>
      </div>`;
        }
           else if(id == "ULT"){
            iconCell.innerHTML = `<div class="icon has-text-black-bis">
            
            <i class="fa-solid fa-t"></i>
          </div>`;
           } else if(id == "JAX" || id == "JLT" || id== "JRE" || id == "JIC" || id == "JPT" || id == "JEX" || id == "JST" | id == "J"){
            iconCell.innerHTML = `<div class="icon has-text-info">
            <i class="fa-solid fa-train fa-lg"></i>
          </div>`;
           } else if(id == "FLT" || id == "FUT"){
            iconCell.innerHTML = `<div class="icon has-text-info">
            <i class="fa-solid fa-ship"></i>
          </div>`;
           } else if(typeof id === 'undefined' ){
            iconCell.innerHTML = `<div class="icon has-text-black-bis">
            <i class="fa-solid fa-person-walking fa-lg"></i>
          </div>`;
           } 
    }
    checkUndef(data, cell){
        if(typeof data != 'undefined'){
            cell.innerHTML = data;
        }
    }

} 

