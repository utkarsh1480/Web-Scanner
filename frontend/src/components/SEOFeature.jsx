// // import React from 'react';

// // const SEOFeature = ({ title, status, description, message }) => {
// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-md text-center" id='seo'>
// //       {/* Status badge */}
// //       {status && (
// //         <div className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded-full inline-block mb-4">
// //           {status}
// //         </div>
// //       )}
      
// //       {/* Title */}
// //       <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      
// //       {/* Icon */}
// //       <div className="my-4">
// //         <span className="text-green-500 text-4xl">✔️</span>
// //       </div>

// //       {/* Message */}
// //       <p className="text-gray-700 font-medium">{message}</p>
      
// //       {/* Description */}
// //       <p className="text-gray-600 mt-2 text-sm">{description}</p>
// //     </div>
// //   );
// // };

// // export default SEOFeature;

// import React from 'react';
// import { FaCheckCircle } from 'react-icons/fa';

// const SEOFeature = ({ title, status, description, message }) => {
//   const statusStyles = {
//     PASS: 'text-green-600 bg-green-100',
//     FAIL: 'text-red-600 bg-red-100',
//     WARN: 'text-yellow-600 bg-yellow-100',
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
//       {/* Status badge */}
//       {status && (
//         <div
//           className={`text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4 ${statusStyles[status] || 'bg-gray-100 text-gray-600'}`}
//         >
//           {status}
//         </div>
//       )}

//       {/* Title */}
//       <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

//       {/* Icon */}
//       <div className="my-4 text-green-500">
//         <FaCheckCircle size={40} />
//       </div>

//       {/* Message */}
//       <p className="text-gray-700 font-medium">{message}</p>

//       {/* Description */}
//       <p className="text-gray-500 mt-2 text-sm">{description}</p>
//     </div>
//   );
// };

// export default SEOFeature;



import React from 'react';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { Card, CardContent } from '@/components/ui/card';

const SEOFeature = ({ title, status, description, message }) => (
  <Card className="w-full border border-border shadow-sm hover:shadow-md transition-all duration-200">
    <CardContent className="p-6 flex flex-row items-start gap-6 text-left">
      {/* Icon - Left Side */}
      <div className="flex-shrink-0 mt-1">
        {status === 'PASS' ? (
          <BsCheckCircleFill className="text-green-500 text-3xl md:text-4xl" />
        ) : (
          <BsXCircleFill className="text-red-500 text-3xl md:text-4xl" />
        )}
      </div>

      {/* Content - Right Side */}
      <div className="flex-grow space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <div className={`text-xs font-semibold ${status === 'PASS' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'} px-3 py-1 rounded-full w-fit`}>
            {status === 'PASS' ? 'Optimized' : 'Not Optimized'}
          </div>
        </div>
        
        <p className="text-foreground font-medium">{message}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default SEOFeature;
