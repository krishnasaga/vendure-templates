import React from "react";
import { FiEye, FiMonitor, FiSmartphone, FiMoreHorizontal } from "react-icons/fi";

function HeaderBar() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm px-4 py-2 flex items-center justify-between text-sm">
      {/* Left: App Name + Status + More */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-blue-700">Dawn</span>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Draft</span>
        <button className="ml-2 text-gray-400 hover:text-gray-700">
          <FiMoreHorizontal size={16} />
        </button>
      </div>


      {/* Right: Icons + Buttons */}
      <div className="flex items-center gap-2">
        {/* Icons */}
        <button title="Preview" className="p-2 hover:bg-blue-50 text-blue-700 rounded">
          <FiEye size={16} />
        </button>
        <button title="Desktop view" className="p-2 hover:bg-blue-50 text-blue-700 rounded">
          <FiMonitor size={16} />
        </button>
        <button title="Tablet view" className="p-2 hover:bg-blue-50 text-blue-700 rounded">
          <FiSmartphone size={16} />
        </button>

        {/* Spacer */}
        <div className="w-px h-5 bg-gray-300 mx-2"></div>

        {/* Buttons */}
        <button className="cursor-pointer px-3 py-1 rounded text-gray-600 bg-gray-100 hover:bg-gray-200 ">Save</button>
        <button className="cursor-pointer px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Publish</button>
      </div>
    </header>
  );
}

export default function AppLayout() {
  return (
    <div className="h-screen flex flex-col">
      <HeaderBar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-50 border-r p-4 text-blue-900">
          <nav className="space-y-2">
            <a href="#" className="block hover:bg-blue-100 px-3 py-2 rounded">Dashboard</a>
            <a href="#" className="block hover:bg-blue-100 px-3 py-2 rounded">Pages</a>
            <a href="#" className="block hover:bg-blue-100 px-3 py-2 rounded">Media</a>
            <a href="#" className="block hover:bg-blue-100 px-3 py-2 rounded">Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mx-5 my-5 shadow-md bg-white rounded-md p-0 h-[calc(100vh-160px)] p-[-2px] overflow-hidden">
            <iframe className="w-full h-full " src="https://singular-salamander-093b82.netlify.app/"/>
          </div>
        </main>
      </div>
    </div>
  );
}
