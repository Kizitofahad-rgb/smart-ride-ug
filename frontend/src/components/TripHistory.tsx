"use client";


import { useEffect, useState } from "react";



type Trip = {

id:number;

bus:string;

location:{

latitude:number;

longitude:number;

};

time:string;

};





export default function TripHistory(){



const [trips,setTrips]=useState<Trip[]>([]);





useEffect(()=>{


const loadTrips=async()=>{


try{


const res =
await fetch(
"http://localhost:5000/api/trips"
);



const data =
await res.json();



setTrips(
data.reverse().slice(0,5)
);



}

catch(error){

console.log(error);

}


};




loadTrips();



const timer =
setInterval(
loadTrips,
3000
);



return ()=>clearInterval(timer);



},[]);







return (

<div

className="
mt-6
bg-white/10
backdrop-blur-md
rounded-3xl
p-6
border
border-white/10
"


>


<h2 className="
text-2xl
font-bold
mb-4
">


🕒 Recent Trip History


</h2>





{

trips.length===0 ?


<p>

Waiting for GPS data...

</p>



:


trips.map((trip)=>(



<div

key={trip.id}

className="
mb-3
p-3
rounded-xl
bg-black/30
"


>


<p>

🚌 {trip.bus}

</p>


<p className="text-sm">


📍

{trip.location.latitude.toFixed(4)}

,

{trip.location.longitude.toFixed(4)}


</p>



<p className="text-sm">


🕒

{new Date(trip.time)
.toLocaleTimeString()}


</p>



</div>



))


}



</div>


);


}