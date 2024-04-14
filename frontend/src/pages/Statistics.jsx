import React from 'react'
import PermanentDrawer from '../Components/Admin_Dashboard'

export default function Statistics() {
  return (
    <div>
        <PermanentDrawer/>
    <div className="bg-gray-100 min-h-screen">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 mt-[-5%] ml-[55%]">Statistics</h1>
    </div>
    <img
      alt="Image"
      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:order-last ml-[20%]"
      height="500px"
      src="/img/Stats_Graph1.png"
      width="500px"
    />
    <img
      alt="Image"
      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:order-last mr-[5%]"
      height="500px"
      src="/img/Stats_Graph2.png"
      width="500px"
    />
    </div>
    </div>
  )
}
