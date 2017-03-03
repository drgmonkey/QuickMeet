//Setup the inital uuid
var user = localStorage.getItem("uuid");
console.log(user); 
get_data("/QuickMeet/default/api/username.json");

function setup(){
    //Fetch an random uuid and assign it to the user and give a random name for now
    //Also update the local cache
    //Inisert code to prompt the user for name
    if (user === undefined) {

        user = get_data("/QuickMeet/uuid/api/1.json");
        console.log(user); 
        localStorage.setItem("uuid", user); 
    //The coordinate tracker's inital setup should draw boxes for the user
    }
}
setup();

var data = get_data("/QuickMeet/default/api/"+ user +".json")
alert(data)
//create array to store the events, days is a [][] array
var btimeStart = []
var btimeEnd = []
var bdayStart = []
var bdayEnd = []

//parse data
var jsonData = JSON.parse(data);
for (var i = 0; i < jsonData.length; i++) {

    btimeStart.push(jsonData[i].startTime)
    btimeEnd.push(jsonData[i].endTime)
    bdayStart.push(jsonData[i].days[0])
    bdayEnd.push(jsonData[i].days[jsonData[i].days.length -1])
    //alert(startTime)
    //alert(endTime)
    //alert(startDay)
    //alert(endDay)
}

//draw the box of the user
for(var i = 0; i < btimeStart.length; i++){
    drawBox(btimeStart[i], btimeEnd[i], bdayStart[i], bdayEnd[i])
}



function post_data(URL, tStart, tEnd, dStart, dEnd){
    var x = new XMLHttpRequest();
    x.open('POST', URL, false);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send("timeStart=" + tStart + "&timeEnd=" + tEnd + "&dayStart=" + dStart + "&dayEnd=" + dEnd);
    //alert(x.responseText);
}

function get_data(URL){
    var x = new XMLHttpRequest();
    x.open( "GET", URL, false ); // false for synchronous request
    x.send( null );
    return x.response;
    //alert(x.responseText);
}
