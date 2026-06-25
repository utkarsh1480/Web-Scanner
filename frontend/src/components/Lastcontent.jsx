import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, Shield } from 'lucide-react';

// Placeholder image for demonstration purposes
const exampleImage = "https://via.placeholder.com/500x300";

function Content() {
  return (
    <Card className="card w-full space-y-6">
      {/* Header Section - Integrated into Card Header */}
      <CardHeader className="p-0 space-y-4">
         <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
           <p className="text-lg font-semibold text-foreground text-center md:text-left">Share your website grade. Got a great grade? Take to social media to share your results with colleagues and friends.</p>
           <div className="flex space-x-4">
             <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Twitter">
               <Twitter className="w-6 h-6" />
             </a>
             <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Facebook">
               <Facebook className="w-6 h-6" />
             </a>
             <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="LinkedIn">
               <Linkedin className="w-6 h-6" />
             </a>
           </div>
         </div>
      </CardHeader>

      {/* Main Content */}
      <CardContent className="p-0 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side - Image */}
        <div className="w-full">
          <img
            src="//static.hsappstatic.net/website-grader-ui/static-1.3895/img/footerCmsFree.png"
            alt="Website Builder"
            className="w-full h-auto object-cover rounded-md shadow-md"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">INCREASE YOUR WEBSITE GRADE</h2>
          <p className="text-muted-foreground">
            Improve your score by creating a brand new website with Website grader CMS Free. Drive more traffic and convert more leads with secure and speedy pages.
          </p>
          <Button className="btn-primary">
            Create a high-speed website
          </Button>
        </div>
      </CardContent>

      {/* Footer - Integrated into Card Footer */}
      <CardFooter className="p-0 pt-6 border-t border-border text-center text-muted-foreground text-sm space-y-2">
        <div className="flex justify-center space-x-4">
           <a href="#" className="hover:underline">Privacy Policy</a>
           <a href="#" className="hover:underline">Legal Stuff</a>
        </div>
        <p className="flex items-center justify-center space-x-1">
           <span>Powered by Google Lighthouse</span>
           <Shield className="w-4 h-4 text-primary"/>
        </p>
      </CardFooter>
    </Card>
  );
}

export default Content;
