"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useState } from "react";

import {
MapContainer,
TileLayer,
Marker,
Popup,
Polyline,
useMap
} from "react-leaflet";



const busIcon =
new L.Icon({

iconUrl:"/icons/bus.svg",

iconSize:[40,40],

iconAnchor:[20,40]

});



const stationIcon =
new L.Icon({

iconUrl:"/icons/station.svg",

iconSize:[28,28],

iconAnchor:[14,28]

});



const passengerIcon =
new L.Icon({

iconUrl:"/icons/passenger.svg",

iconSize:[35,35],

iconAnchor:[18,35]

});





const startIcon =
L.divIcon({

html:"🟢",

className:"",

iconSize:[35,35]

});



const endIcon =
L.divIcon({

html:"🔴",

className:"",

iconSize:[35,35]

});





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
name:"Ntinda",
position:ROUTE[5]
}


];








function FollowBus({
position
}:{
position:[number,number]
}){


const map = useMap();


useEffect(()=>{


map.panTo(position,{
animate:true,
duration:0.8
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

status:"connecting"

});




const [passenger,setPassenger]=useState({

latitude:0.3560,

longitude:32.5910,

status:"waiting"

});







useEffect(()=>{


const getData=async()=>{


const busResponse =
await fetch(
"http://localhost:5000/api/bus"
);


const busData =
await busResponse.json();


setBus(busData);




const passengerResponse =
await fetch(
"http://localhost:5000/api/passenger"
);



const passengerData =
await passengerResponse.json();



setPassenger(passengerData);



};



getData();



const timer =
setInterval(
getData,
3000
);



return ()=>clearInterval(timer);



},[]);







const busPosition:
[number,number]=[

bus.latitude,

bus.longitude

];







return (

<div

style={{

height:"500px",

borderRadius:"20px",

overflow:"hidden"

}}

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

url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

/>






<Polyline

positions={ROUTE}

pathOptions={{

color:"#2563eb",

weight:7

}}

/>









<Marker

position={ROUTE[0]}

icon={startIcon}

>

<Popup>

🟢 Start Point

</Popup>


</Marker>








<Marker

position={ROUTE[ROUTE.length-1]}

icon={endIcon}

>

<Popup>

🔴 Destination

</Popup>


</Marker>









{
STATIONS.map((station,index)=>(


<Marker

key={index}

position={station.position}

icon={stationIcon}

>

<Popup>

🚏 {station.name}

</Popup>


</Marker>


))
}









<Marker

position={[
passenger.latitude,
passenger.longitude
]}

icon={passengerIcon}

>

<Popup>

👤 Passenger waiting

<br/>

Status:

{passenger.status}


</Popup>


</Marker>









<Marker

position={busPosition}

icon={busIcon}

>


<Popup>


🚌 Smart Ride UG


<br/>

Speed:

{bus.speed} km/h


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