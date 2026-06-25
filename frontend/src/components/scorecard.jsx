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
    <Card className="p-4 shadow-md bg-card text-card-foreground rounded-lg border border-border">
      <CardHeader className="flex flex-col items-center">
        <div
          className="relative flex items-center justify-center rounded-full w-20 h-20"
          style={{
            background: `conic-gradient(#ffd700 ${scores.aggregate || 0}%, hsl(var(--muted)) 0)`,
          }}
        >
          <span className="text-xl font-bold text-foreground">
            {scores.aggregate || 0}
          </span>
        </div>
        <p className="text-lg font-semibold mt-2 text-center break-words text-foreground">{url}</p>
      </CardHeader>
      <CardContent>
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
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-center text-sm text-muted-foreground">Is your website slowing you down?</p>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Get the Free CMS
        </Button>
        <p className="text-xs text-muted-foreground">No credit card needed</p>
      </CardFooter>
    </Card>
  );
};

const ScoreDetail = ({ label, score, maxScore, color }) => {
  const barWidth = (score / maxScore) * 100 + "%";
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm text-foreground">
        <span>{label}</span>
        <span className="font-medium">
          {score}/{maxScore}
        </span>
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: barWidth, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreCard;
