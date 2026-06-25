// // import React from 'react';
// // import MobileFeature from './MobileFeature';

// // const MobileWrapper = ({ score, features }) => (
// //   <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
// //     {/* Header with Score and Title */}
// //     <div className="text-center mb-8">
// //       <div className="text-5xl font-bold text-yellow-500">{score}/30</div>
// //       <h1 className="text-3xl font-bold text-gray-800">Mobile</h1>
// //       <p className="text-gray-600 mt-2">
// //         Traffic from mobile devices is growing fast. Optimize your website for mobile or you'll miss out on valuable traffic, leads, and revenue.
// //       </p>
// //        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-600">
// //           Improve your website performance with a free 15-minute lesson
// //         </button>
// //     </div>

// //     {/* Mobile Preview Image */}
// //     <div className="flex justify-center mb-8">
// //       <img
// //         src="https://m.media-amazon.com/images/I/71GCuB90SEL.png" // Update the path to your image here
// //         alt="Mobile Preview"
// //         className="h-48 w-32 object-cover rounded-lg shadow-lg"
// //       />
// //     </div>

// //     {/* Features List */}
// //     <div className="flex flex-wrap justify-center">
// //       {features.map((feature, index) => (
// //         <MobileFeature key={index} {...feature} />
// //       ))}
// //     </div>
// //   </div>
// // );

// // export default MobileWrapper;

// import React from 'react';
// import { BsFillPhoneFill } from 'react-icons/bs';
// import MobileFeature from './MobileFeature';

// const MobileWrapper = ({ score, features }) => (
//   <div
//     className="p-6 rounded-lg"
//     style={{
//       backgroundColor: '#2C3E50',
//       color: 'white',
//     }}
//   >
//     {/* Header with Score and Title */}
//     <div className="text-center mb-8">
//       <div className="text-5xl font-bold text-yellow-400">{score}/30</div>
//       <h1 className="text-2xl font-bold mt-2 text-gray-200">Mobile</h1>
//       <p className="text-white mt-2">
//         Traffic from mobile devices is growing rapidly. Optimize your website to capture valuable traffic, leads, and revenue.
//       </p>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-600 mt-4">
//         Improve your website performance with a free 15-minute lesson
//       </button>
//     </div>

//     {/* Mobile Preview Image */}
//     <div className="flex justify-center mb-8">
//       <img
//         src="https://m.media-amazon.com/images/I/71GCuB90SEL.png" // Update the path to your image here
//         alt="Mobile Preview"
//         className="h-48 w-32 object-cover rounded-lg shadow-lg"
//       />
//     </div>

//     {/* Features List */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {features.map((feature, index) => (
//         <MobileFeature key={index} {...feature} />
//       ))}
//     </div>
//   </div>
// );

// export default MobileWrapper;


import React from 'react';
import MobileFeature from './MobileFeature';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

const MobileWrapper = ({ score, features, screenshot }) => (
  <Card className="card w-full h-full space-y-6 text-center">
    {/* Header with Score and Title */}
    <CardHeader className="p-0 space-y-2">
       <div className="flex items-center justify-center space-x-2">
         <Smartphone className="w-8 h-8 text-primary" />
         <h2 className="text-3xl md:text-4xl font-bold text-foreground">Mobile Optimization</h2>
       </div>
      <div className={`text-4xl font-extrabold ${score >= 90 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
        {score}
        <span className="text-muted-foreground text-2xl">/100</span>
      </div>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Traffic from mobile devices is growing rapidly. Optimize your website to capture valuable traffic, leads, and revenue.
      </p>
    </CardHeader>

    {/* Mobile Preview Image */}
    <CardContent className="p-0 flex justify-center pt-6 border-t border-border">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
          {screenshot ? (
            <img
              src={screenshot}
              alt="Mobile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Preview Available
            </div>
          )}
        </div>
      </div>
    </CardContent>

    {/* Features List */}
    <CardContent className="grid grid-cols-1 gap-6 p-6 border-t border-border">
      {features.map((feature, index) => (
        <MobileFeature key={index} {...feature} />
      ))}
    </CardContent>
  </Card>
);

export default MobileWrapper;
