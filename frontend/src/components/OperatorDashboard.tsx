"use client";


type Props = {

passengers:number;

speed:number;

};



export default function OperatorDashboard({

passengers,

speed

}:Props){



const capacity = 30;


const available =
capacity-passengers;



const demand =

passengers > 22

?

"🔥 High Demand"

:

passengers > 15

?

"🟡 Medium Demand"

:

"🟢 Low Demand";




return (

<div

className="
bg-black/80
backdrop-blur-xl
text-white
rounded-2xl
p-5
border
border-white/20
shadow-xl
"

>


<h2 className="
text-2xl
font-bold
mb-4
">

🚍 Operator Dashboard

</h2>




<div className="space-y-4">


<div>

<p className="text-zinc-400">

Vehicle

</p>


<p className="text-xl">

🚌 Bus 01

</p>

</div>





<div>

<p className="text-zinc-400">

Route

</p>


<p>

Makerere → Ntinda

</p>


</div>






<div>

<p className="text-zinc-400">

Passengers

</p>


<p>

{passengers}/{capacity}

</p>


</div>






<div>

<p className="text-zinc-400">

Seats Available

</p>


<p>

{available}

</p>


</div>







<div>

<p className="text-zinc-400">

Speed

</p>


<p>

{speed} km/h

</p>


</div>







<div>

<p className="text-zinc-400">

Demand

</p>


<p>

{demand}

</p>


</div>





{passengers > 22 && (

<div

className="
bg-red-500/20
border
border-red-400/30
rounded-xl
p-3
"

>


⚠️ Recommendation:

<br/>

Deploy another bus near Makerere

</div>


)}




</div>


</div>


)

}