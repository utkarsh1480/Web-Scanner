// // Filename: ScoreCard.jsx
// import React from "react";
// import "./ScoreCard.css"; // Ensure you have the corresponding CSS file

// const ScoreCard = ({ url, scores }) => {
//   return (
//     <div className="score-card">
//       <div className="score-header">
//       <div
//   className="score-circle"
//   style={{
//     background: `conic-gradient(#ffd700 ${scores.aggregate || 0}%, #34495e 0)`,
//   }}
// >
//   <span className="score-value">{scores.aggregate || 0}</span>
// </div>
//         <p className="score-url">{url}</p>
//       </div>
//       <div className="score-details">
//         {scores.details.map((scoreDetail, index) => (
//           <ScoreDetail
//             key={index}
//             label={scoreDetail.label}
//             score={scoreDetail.score}
//             maxScore={scoreDetail.maxScore}
//             color={scoreDetail.color}
//           />
//         ))}
//       </div>
//       <div className="score-footer">
//         <p>Is your website slowing you down?</p>
//         <button className="score-button">Get the Free CMS</button>
//         <p className="no-credit">No credit card needed</p>
//       </div>
//     </div>
//   );
// };

// const ScoreDetail = ({ label, score, maxScore, color }) => {
//   const barWidth = (score / maxScore) * 100 + "%";
//   return (
//     <div className="score-detail">
//       <div className="score-label">
//         {label}{" "}
//         <span className="score-text">
//           {score}/{maxScore}
//         </span>
//       </div>
//       <div className="score-bar">
//         <div
//           className="score-fill"
//           style={{ width: barWidth, backgroundColor: color }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default ScoreCard;

// Filename: ScoreCard.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const ScoreCard = ({ url, scores }) => {
  return (
    <Card className="bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 rounded-[1.75rem] p-6 shadow-xl text-foreground dark:text-white">
      <CardHeader className="flex flex-col items-center pb-4">
        {/* Concentric Tech Circle Design */}
        <div className="relative flex items-center justify-center rounded-full w-24 h-24 bg-zinc-100/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <div
            className="absolute inset-1.5 rounded-full flex items-center justify-center"
            style={{
              background: `conic-gradient(currentColor ${scores.aggregate || 0}%, transparent 0)`,
            }}
          >
            <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center">
              <span className="text-2xl font-extrabold text-foreground dark:text-white">
                {scores.aggregate || 0}
              </span>
            </div>
          </div>
        </div>
        <p className="text-base font-bold mt-4 text-center break-all px-2 text-foreground dark:text-white">{url}</p>
      </CardHeader>
      
      <CardContent className="pt-2 pb-4">
        <div className="space-y-4">
          {scores.details.map((scoreDetail, index) => (
            <ScoreDetail
              key={index}
              label={scoreDetail.label}
              score={scoreDetail.score}
              maxScore={scoreDetail.maxScore}
              color={scoreDetail.color}
            />
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-center space-y-3 pt-4 border-t border-slate-100 dark:border-zinc-800/60">
        <p className="text-center text-xs font-semibold text-foreground/60 dark:text-white/60">Is your website slowing you down?</p>
        <button className="bg-[#ff4f22] text-white font-bold hover:bg-[#e03b12] rounded-full w-full h-11 text-xs transition-all shadow-md">
          Get the Free CMS
        </button>
        <p className="text-[10px] font-semibold text-foreground/40 dark:text-white/40">No credit card needed</p>
      </CardFooter>
    </Card>
  );
};

const ScoreDetail = ({ label, score, maxScore, color }) => {
  const barWidth = (score / maxScore) * 100 + "%";
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs font-semibold text-foreground/80 dark:text-white/80">
        <span>{label}</span>
        <span>
          {score}/{maxScore}
        </span>
      </div>
      <div className="w-full h-2 bg-zinc-100/60 dark:bg-zinc-900/60 rounded-full overflow-hidden border border-zinc-200/20 dark:border-zinc-800/20">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: barWidth, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreCard;
