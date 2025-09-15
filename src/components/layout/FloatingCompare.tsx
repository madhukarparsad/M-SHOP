// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCompareStore } from '../../store/useStore';

// export const FloatingCompare: React.FC = () => {
//   const count = useCompareStore((s) => s.getCount());
//   const clear = useCompareStore((s) => s.clear);
//   const navigate = useNavigate();

//   if (count === 0) return null;

//   return (
//     <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
//       <button
//         onClick={() => {
//           if (window.confirm('Clear compare list?')) clear();
//         }}
//         className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-2 rounded-full shadow text-sm"
//         title="Clear compare list"
//       >
//         Clear
//       </button>
//       <button
//         onClick={() => navigate('/compare')}
//         className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 rounded-full shadow-lg text-sm font-semibold"
//       >
//         Compare ({count})
//       </button>
//     </div>
//   );
// };




import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompareStore } from '../../store/useStore';

export const FloatingCompare: React.FC = () => {
  const count = useCompareStore((s) => s.getCount());
  const clear = useCompareStore((s) => s.clear);
  const navigate = useNavigate();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-fade-in">
      {/* Clear Button */}
      <button
        onClick={() => {
          if (window.confirm('Do you want to clear the compare list?')) clear();
        }}
        className="
          px-4 py-2 rounded-xl text-sm font-medium
          bg-gradient-to-br from-gray-100 to-gray-200
          text-gray-700 shadow-[4px_4px_10px_rgba(0,0,0,0.15),-4px_-4px_10px_rgba(255,255,255,0.8)]
          hover:shadow-[6px_6px_15px_rgba(0,0,0,0.2),-6px_-6px_15px_rgba(255,255,255,0.9)]
          active:scale-95 transition-all duration-200
        "
        title="Clear compare list"
      >
        ✖ Clear
      </button>

      {/* Compare Button */}
      <button
        onClick={() => navigate('/compare')}
        className="
          relative px-6 py-3 rounded-2xl font-semibold text-white text-sm
          bg-gradient-to-r from-sky-500 to-indigo-500
          shadow-[0_8px_20px_rgba(56,189,248,0.5)]
          hover:shadow-[0_12px_25px_rgba(56,189,248,0.6)]
          hover:scale-105 active:scale-95 transition-all duration-200
        "
      >
        Compare
        <span
          className="
            ml-2 px-2 py-1 rounded-full text-xs font-bold
            bg-white/20 backdrop-blur-md border border-white/30
          "
        >
          {count}
        </span>
      </button>
    </div>
  );
};
