// // import React from 'react';

// // const MobileFeature = ({ title, description, status }) => (
// //   <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/4 m-2">
// //     <div className={`text-3xl ${status === 'fail' ? 'text-red-500' : 'text-green-500'}`}>
// //       {status === 'fail' ? '✖️' : '✔️'}
// //     </div>
// //     <h3 className="font-semibold text-lg">{title}</h3>
// //     <p className="text-gray-500">{description}</p>
// //   </div>
// // );

// // export default MobileFeature;

// import React from 'react';
// import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

// const MobileFeature = ({ title, description, status }) => (
//   <div className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col items-center">
//     {/* Status Icon */}
//     <div className="mb-4">
//       {status === 'fail' ? (
//         <BsXCircleFill className="text-red-500 text-5xl" />
//       ) : (
//         <BsCheckCircleFill className="text-green-500 text-5xl" />
//       )}
//     </div>

//     {/* Title */}
//     <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>

//     {/* Description */}
//     <p className="text-black text-center text-sm">{description}</p>
//   </div>
// );

// export default MobileFeature;

import React from 'react';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { Card, CardContent } from '@/components/ui/card';

const MobileFeature = ({ title, description, status }) => (
  <Card className="w-full border border-border shadow-sm hover:shadow-md transition-all duration-200">
    <CardContent className="p-6 flex flex-row items-start gap-6 text-left">
      {/* Status Icon - Left Side */}
      <div className="flex-shrink-0 mt-1">
        {status === 'fail' ? (
          <BsXCircleFill className="text-red-500 text-3xl md:text-4xl" />
        ) : (
          <BsCheckCircleFill className="text-green-500 text-3xl md:text-4xl" />
        )}
      </div>

      {/* Content - Right Side */}
      <div className="flex-grow space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <div className={`text-xs font-semibold ${status === 'fail' ? 'text-red-500 bg-red-500/10' : 'text-green-500 bg-green-500/10'} px-3 py-1 rounded-full w-fit`}>
            {status === 'fail' ? 'Not Optimized' : 'Optimized'}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default MobileFeature;
