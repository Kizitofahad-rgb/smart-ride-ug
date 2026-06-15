"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import RouteSearch from "@/components/RouteSearch";


const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});


export default function TrackingPage() {

  const [showSearch, setShowSearch] = useState(false);


  return (

    <main
      className="
      min-h-screen
      bg-gradient-to-br
      from-black
      via-zinc-900
      to-black
      text-white
      p-6
      "
    >


      <h1
        className="
        text-4xl
        font-bold
        "
      >
        Live Bus Tracking 🚍
      </h1>


      <p className="
        mt-2
        text-zinc-400
      ">
        Real-time public transport tracking
      </p>




      <div
        className="
        relative
        mt-8
        max-w-6xl
        mx-auto
        rounded-3xl
        overflow-hidden
        border
        border-white/20
        shadow-2xl
        "
      >



        {/* Search Button */}

        <button

          onClick={() => setShowSearch(!showSearch)}

          className="
          absolute
          z-[1000]
          top-5
          left-5
          bg-black/70
          backdrop-blur-xl
          border
          border-white/20
          rounded-full
          px-5
          py-3
          hover:bg-white/20
          transition
          "
        >

          🔍 Search Bus

        </button>





        {/* Search Window */}

        {showSearch && (

          <div

            className="
            absolute
            z-[1000]
            top-20
            left-5
            w-96
            max-h-[500px]
            overflow-y-auto
            bg-zinc-950/95
            backdrop-blur-xl
            border
            border-white/20
            rounded-2xl
            p-5
            shadow-xl
            "

          >



            <div
              className="
              flex
              justify-between
              items-center
              mb-4
              "
            >

              <h2 className="font-bold text-xl">
                Find Bus
              </h2>


              <button

                onClick={() => setShowSearch(false)}

                className="
                text-zinc-400
                hover:text-white
                text-xl
                "
              >

                ✕


              </button>


            </div>



            <RouteSearch />



          </div>


        )}





        <Map />



      </div>




    </main>

  );

}