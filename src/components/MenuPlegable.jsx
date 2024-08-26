// src/components/PillTabs.jsx
// src/components/PillTabs.jsx
import { useState } from "react";
import { MagicTabSelect } from "react-magic-motion";

const pillTabs = {
  inicio: "Inicio",
  productos: "Productos",
  ofertas: "Ofertas",
  contacto: "Contacto",
  
};

const PillTabs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const tabKeys = Object.keys(pillTabs);

  return (
    <div className="flex flex-col w-full border border-gray-300 items-start">
      {tabKeys.map((key, i) => (
        <div
          key={key}
          className={`w-full border-t border-gray-300 ${
            i === tabKeys.length - 1 ? '' : 'mb-1'
          }`}
        >
          <button
            onMouseEnter={() => setHoveredIndex(i)}
            className="pt-4 pb-4 relative text-black font-semibold w-full px-4 py-2 bg-white"
            style={{
              borderRadius: "999px",
              textAlign: "left", // Asegura que el texto se alinee a la izquierda
            }}
          >
            {hoveredIndex === i && (
              <MagicTabSelect
                id="pillTabs"
                transition={{ type: "spring", bounce: 0.35 }}
              >
                <span
                  style={{
                    borderRadius: "999px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10,
                    mixBlendMode: "difference",
                  }}
                />
              </MagicTabSelect>
            )}
            {pillTabs[key]}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PillTabs;
