"use client";

import { useState } from "react";


export default function RouteSearch() {

  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");



  function searchBus() {

    if (!start || !destination) {
      setMessage("Please select route");
      return;
    }


    setMessage(
      `🚌 Smart Ride Bus 01 found\n\n${start} → ${destination}`
    );

  }



  return (

    <div className="
      text-white
    ">


      <h2 className="
        text-2xl
        font-bold
        mb-5
      ">
        Find a Bus
      </h2>



      <label className="
        block
        text-sm
        text-zinc-300
        mb-2
      ">
        Starting Point
      </label>


      <select

        value={start}

        onChange={(e)=>setStart(e.target.value)}

        className="
          w-full
          bg-zinc-800/80
          text-white
          border
          border-white/20
          rounded-xl
          p-3
          mb-4
          outline-none
        "

      >

        <option value="">
          Select start
        </option>

        <option>
          Makerere
        </option>

        <option>
          Kampala City Centre
        </option>

        <option>
          Ntinda
        </option>


      </select>





      <label className="
        block
        text-sm
        text-zinc-300
        mb-2
      ">
        Destination
      </label>



      <select

        value={destination}

        onChange={(e)=>setDestination(e.target.value)}

        className="
          w-full
          bg-zinc-800/80
          text-white
          border
          border-white/20
          rounded-xl
          p-3
          mb-5
          outline-none
        "

      >

        <option value="">
          Select destination
        </option>


        <option>
          Mulago
        </option>

        <option>
          Nakawa
        </option>

        <option>
          Entebbe
        </option>


      </select>




      <button

        onClick={searchBus}

        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          rounded-xl
          py-3
          font-semibold
          transition
        "

      >

        Find Bus

      </button>





      {message && (

        <div className="
          mt-5
          bg-black/50
          border
          border-green-400/30
          rounded-xl
          p-4
          text-green-300
          whitespace-pre-line
        ">

          {message}

        </div>

      )}



    </div>

  );
}