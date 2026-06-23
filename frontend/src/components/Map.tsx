"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useState, useCallback } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";


// ===============================
// ICONS
// ===============================

const busIcon = new L.Icon({
  iconUrl:"/icons/bus.svg",
  iconSize:[40,40],
  iconAnchor:[20,40],
});


const stationIcon = new L.Icon({
  iconUrl:"/icons/station.svg",
  iconSize:[28,28],
  iconAnchor:[14,28],
});


const passengerIcon = new L.Icon({
  iconUrl:"/icons/passenger.svg",
  iconSize:[35,35],
  iconAnchor:[18,35],
});



const startIcon = L.divIcon({
 html:"🟢",
 className:"",
 iconSize:[35,35]
});


const endIcon = L.divIcon({
 html:"🔴",
 className:"",
 iconSize:[35,35]
});



// ===============================
// ROUTE
// ===============================

const ROUTE:[number,number][]=[

[0.3536,32.5885],
[0.3550,32.5900],
[0.3570,32.5925],
[0.3590,32.5945],
[0.3610,32.5965],
[0.3630,32.5985]

];



const STATIONS=[

{
name:"Kampala",
position:ROUTE[0]
},

{
name:"Makerere",
position:ROUTE[1]
},

{
name:"Wandegeya",
position:ROUTE[2]
},

{
name:"Mulago",
position:ROUTE[3]
},

{
name:"Ntinda Terminal",
position:ROUTE[5]
}

];




// ===============================
// FOLLOW BUS
// ===============================

function FollowBus({
position
}:{
position:[number,number]
}){

const map=useMap();


useEffect(()=>{

map.panTo(position,{
animate:true,
duration:0.5
});


},[position,map]);


return null;

}





export default function Map(){


const [bus,setBus]=useState({

latitude:ROUTE[0][0],
longitude:ROUTE[0][1],
speed:0,
passengers:0,
status:"active"

});



const [passengers,setPassengers]=useState<any[]>([]);


const [loading,setLoading]=useState(false);





// ===============================
// LOAD DATA
// ===============================


const fetchData=useCallback(async()=>{


try{


const busResponse =
await fetch(
"http://localhost:5000/api/bus"
);


const busData =
await busResponse.json();



setBus(busData);





const passengerResponse =
await fetch(
"http://localhost:5000/api/passengers"
);



const passengerData =
await passengerResponse.json();



setPassengers(passengerData);



}
catch(err){

console.log(err);

}


},[]);






useEffect(()=>{


fetchData();


const timer=setInterval(
fetchData,
3000
);


return ()=>clearInterval(timer);


},[fetchData]);







// ===============================
// BOARD
// ===============================


const boardPassenger=async(id:string)=>{


setLoading(true);


await fetch(
`http://localhost:5000/api/passenger/${id}/board`,
{

method:"POST",
headers:{
"Content-Type":"application/json"
}

});


await fetchData();


setLoading(false);


};







// ===============================
// LEAVE
// ===============================


const leavePassenger=async(id:string)=>{


setLoading(true);


await fetch(
`http://localhost:5000/api/passenger/${id}/leave`,
{

method:"POST",
headers:{
"Content-Type":"application/json"
}

});


await fetchData();


setLoading(false);


};







const busPosition:
[number,number]=
[
bus.latitude,
bus.longitude
];






return (


<div

className="
relative
w-full
h-[500px]
overflow-hidden
rounded-[20px]
"

>



<MapContainer


center={ROUTE[0]}

zoom={15}

style={{
height:"100%",
width:"100%"
}}


>



<TileLayer

url="
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

/>






{/* ROUTE */}

<Polyline

positions={ROUTE}

pathOptions={{

color:"#2563eb",
weight:7

}}

/>







{/* START */}

<Marker

position={ROUTE[0]}

icon={startIcon}

>

<Popup>

🟢 Start Point

<br/>

Kampala

</Popup>

</Marker>








{/* END */}

<Marker

position={
ROUTE[ROUTE.length-1]
}

icon={endIcon}

>

<Popup>

🔴 Destination

<br/>

Ntinda Terminal

</Popup>

</Marker>








{/* STATIONS */}


{
STATIONS.map((station,index)=>(


<Marker

key={index}

position={station.position}

icon={stationIcon}

>


<Popup>

🚏

<strong>

{station.name}

</strong>

<br/>

Bus Stop

</Popup>


</Marker>


))

}








{/* PASSENGERS */}


{
passengers

.filter(
p=>p.status==="waiting"
)

.map(passenger=>(


<Marker

key={passenger.id}

position={[
passenger.latitude,
passenger.longitude
]}

icon={passengerIcon}


>


<Popup>


<h3>

👤 {passenger.name}

</h3>


<p>

Status:

<strong>

{" "}
{passenger.status}

</strong>

</p>




<button

disabled={loading}

onClick={()=>boardPassenger(passenger.id)}

className="
bg-blue-600
text-white
px-3
py-1
rounded
"

>

🚌 Board

</button>


</Popup>


</Marker>


))

}








{/* BUS */}


<Marker

position={busPosition}

icon={busIcon}

>


<Popup>


<h3>

🚌 Smart Ride UG

</h3>


Speed:

{bus.speed}

km/h


<br/>


Passengers:

{bus.passengers}/50


<br/>


Status:

{bus.status}


</Popup>


</Marker>








<FollowBus

position={busPosition}

/>




</MapContainer>


</div>


);


}