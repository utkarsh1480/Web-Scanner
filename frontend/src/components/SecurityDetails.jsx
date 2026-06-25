// import React from 'react';

// const SecurityDetails = ({ title, status, description }) => {
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
//       <div className={`text-4xl ${status ? 'text-green-500' : 'text-red-500'}`}>
//         {status ? '✅' : '❌'}
//       </div>
//       <h3 className="text-xl font-semibold mt-4">{title}</h3>
//       <p className="text-gray-600 mt-2">{status ? 'Secured.' : 'Not Secured.'}</p>
//       <p className="text-gray-500 mt-2">{description}</p>
//     </div>
//   );
// };

// export default SecurityDetails;


import React from 'react';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { Card, CardContent } from '@/components/ui/card';

const SecurityDetails = ({ title, status, description }) => {
  return (
    <Card className="h-full border border-border shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6 flex flex-col items-center text-center h-full">
        {/* Status Icon */}
        <div className="mb-4">
          {status ? (
            <BsCheckCircleFill className="text-green-500 text-5xl" />
          ) : (
            <BsXCircleFill className="text-red-500 text-5xl" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>

        {/* Status Text */}
        <p className={`font-medium ${status ? 'text-green-500' : 'text-red-500'} mb-2`}>
          {status ? 'Secured.' : 'Not Secured.'}
        </p>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default SecurityDetails;
