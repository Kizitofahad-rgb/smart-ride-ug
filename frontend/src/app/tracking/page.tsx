"use client";


import dynamic from "next/dynamic";

import Dashboard from "@/components/Dashboard";



const Map = dynamic(
  () => import("@/components/Map"),
  {
    ssr:false,
  }
);



export default function TrackingPage(){


return (


<main

className="
min-h-screen
bg-black
text-white
p-8
"

>


<h1

className="
text-4xl
font-bold
"

>

Live Bus Tracking

</h1>





<p

className="
mt-4
text-zinc-400
"

>

Real-time fleet monitoring system.

</p>








{/* FLEET DASHBOARD */}

<Dashboard />










{/* MAP CONTAINER */}


<div


className="
mt-8
rounded-3xl
overflow-hidden
border
border-white/10
bg-white/5
backdrop-blur-md
shadow-2xl
max-w-5xl
mx-auto
"


>



<Map />


</div>









{/* TRIP HISTORY */}










</main>


);


}