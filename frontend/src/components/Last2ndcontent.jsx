import React from "react";
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Lightbulb } from 'lucide-react';

const Lcontent = () => {
  // Data for the table
  const data = [
    {
      category: "Performance",
      items: [
        {
          performance: "Page requests",
          current: "278",
          recommendation:
            "Reduce the number of HTTP requests your site makes. Remove any unnecessary images, scripts, or files, and consider lazy loading your images.",
        },
        {
          performance: "Page speed",
          current: "9.9Sec",
          recommendation:
            "Speed up your site by lightening up your site pages, compressing images and video where possible.",
        },
      ],
    },
    {
      category: "Mobile",
      items: [
        {
          performance: "Legible Font Size",
          current: "No",
          recommendation:
            "Increase the font size of some of your text so at least 60% of the page has a font size of 12px or larger.",
        },
        {
          performance: "Tap Targets",
          current: "No",
          recommendation:
            "Tap targets (e.g., links and buttons) should be at least 8px apart from each other, and at least 48px wide and 48px tall so they are clickable for mobile users.",
        },
        {
          performance: "Responsive",
          current: "No",
          recommendation:
            "Give your site the gift of responsive design by using the Mycto Website Platform.",
        },
      ],
    },
  ];

  return (
    <Card className="card w-full space-y-6">
       <CardHeader className="p-0 space-y-2 text-center">
         <div className="flex items-center justify-center space-x-2">
           <Lightbulb className="w-8 h-8 text-primary" />
           <h2 className="text-3xl md:text-4xl font-bold text-foreground">What should I do next?</h2>
         </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here are some recommendations to improve your website's performance and mobile experience.
        </p>
      </CardHeader>
      <CardContent className="p-0 pt-6 border-t border-border space-y-8">
        {data.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">{section.category}</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Performance</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {section.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.performance}</TableCell>
                      <TableCell>{item.current}</TableCell>
                      <TableCell>{item.recommendation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Lcontent;
