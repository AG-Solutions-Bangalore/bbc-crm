import { useState } from "react";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";
import SideNav from "../components/SideNav";

const Layout = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);
  return (
    <div className="relative min-h-screen bg-blue-gray-50/50 overflow-hidden">
      {/* SVG Geometric Pattern - Top */}
      <svg 
        className="absolute top-0 -z-10 left-0 w-full opacity-15" 
        height="200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#A41460" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        <g>
          {Array.from({ length: 15 }).map((_, i) => (
            <circle 
              key={i} 
              cx={Math.random() * 500} 
              cy={Math.random() * 200} 
              r={Math.random() * 3 + 1} 
              fill="#A41460" 
              opacity={Math.random() * 0.5 + 0.1}
            >
              <animate 
                attributeName="opacity" 
                values={`${Math.random() * 0.3 + 0.1};${Math.random() * 0.5 + 0.3};${Math.random() * 0.3 + 0.1}`} 
                dur={`${Math.random() * 3 + 2}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          ))}
        </g>
      </svg>

      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
        {children}
      </div>
      
      {/* SVG Isometric Pattern - Bottom */}
      <svg 
        className="absolute bottom-0 -z-10 left-0 w-full opacity-15" 
        height="200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="isometric" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 0 15 L 15 0 L 30 15 L 15 30 Z" fill="none" stroke="#A41460" strokeWidth="0.5" opacity="0.4"/>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#isometric)" />
        <g>
          {Array.from({ length: 6 }).map((_, i) => (
            <rect 
              key={i} 
              x={Math.random() * 450} 
              y={Math.random() * 170} 
              width="15" 
              height="15" 
              fill="#A41460" 
              opacity={Math.random() * 0.2 + 0.1}
              transform={`rotate(${Math.random() * 45}, ${Math.random() * 450 + 7.5}, ${Math.random() * 170 + 7.5})`}
            >
              <animate 
                attributeName="y" 
                values={`${Math.random() * 170};${Math.random() * 170 - 10};${Math.random() * 170}`} 
                dur={`${Math.random() * 4 + 3}s`} 
                repeatCount="indefinite" 
              />
            </rect>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Layout;