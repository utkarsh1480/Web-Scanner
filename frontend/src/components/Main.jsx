import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`border border-gray-300 rounded-md mb-2 p-4 transition-colors duration-300 cursor-pointer ${
        isOpen ? 'bg-gray-200' : 'bg-white'
      }`}
      onClick={toggleAnswer}
    >
      <h3 className="font-semibold">{question}</h3>
      {isOpen && (
        <article className="mt-2">
          <p dangerouslySetInnerHTML={{ __html: answer }} />
        </article>
      )}
    </div>
  );
};

const BottomFaq = () => {
  const faqs = [
    {
      question: 'What is a website checker?',
      answer: 'A website checker is a mini site audit, giving you insight into how your website performs. A good website analyzer should audit your site across a range of criteria so you can get an idea of your overall performance, security, mobile experience, and search engine optimization (SEO). If you’re looking for next steps, read <a class="text-blue-500 underline" target="_blank" rel="noopener noreferrer" href="https://academy.hubspot.com/courses/web-optimization">HubSpot’s Academy Course on Web Optimization</a> to learn about the factors that are both improving and reducing your site rating.',
    },
    {
      question: 'Why is website performance important?',
      answer: 'Performance test matters because it is a key factor in user experience. When users get an immediate response, such as a click, a successful login, or confirmation, they are more likely to stay on the page. This fast response is commonly referred to as website speed. Search engines like Google check website speed and interactivity to make sure searchers only see high-quality sites. So beyond building a better user experience, speed tools help you make your site more attractive to search engines – win-win.',
    },
    {
      question: 'How to optimize a website for SEO?',
      answer: 'There are some concrete steps you can take to optimize your site for SEO. Making sure your pages are indexed (viewable by search engines) is a great start. In addition, making full use of alt-tags and meta-data is advised. If you want to go further, try making sure you have descriptive link text and appropriate content plugins. And if you’re wondering where to start, getting your site\'s SEO score is a great first step. It just so happens HubSpot\'s website grader has a built-in SEO test!',
    },
    {
      question: 'Why is website grading important?',
      answer: 'Test grading is important because it can help you build your site smarter and better while monitoring its health along the way. These site testers help show the impact of the steps you’re taking and areas for new opportunities by checking the pages of your website. It can also help you understand what your competitors are doing, and why they do it. Technical evaluation and general assessment are important in any site build. Doing both makes your site successful in the search results and beyond!',
    },
  ];

  return (
    <div className="BottomFaq__BottomFaqWrapper bg-gray-300">
      {/* Overview Section */}
      <section className="BottomFaq__OverviewSection flex items-center mb-6">
        <div className="overview flex-1">
          <h2 className="overview-title text-2xl font-bold mb-2 text-gray-700">Get Your Website Rating in Seconds</h2>
          <p className="overview-description text-gray-700">
            Website grader free website grader makes understanding website performance easy. The hardest part of building a site is often the guesswork. Which changes are important, and which aren’t? It can sometimes feel impossible to tell. Our online grader demystifies the whole process. Learn about your page performance, security, search engine optimization (SEO), and mobile experience. Discover what makes your site strong and uncover new opportunities for the future.
          </p>
        </div>
        <div className="overview-img flex-1 text-center">
          <img
            loading="lazy"
            height="462"
            width="470"
            src="//static.hsappstatic.net/website-grader-ui/static-1.3755/img/website-performance-rating.jpg"
            alt="Webpage score after performing a free test with the Web Scanner"
            className="max-w-full h-auto" // Ensure responsiveness
          />
        </div>
      </section>

      Questions Section
      <section className="BottomFaq__QuestionsSection">
        <div className="questions-center-wrapper px-4">
          <h2 className="questions-title text-2xl font-bold mb-4 text-gray-700 ">More Information</h2>
          <div className="questions grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 ">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} className="text-gray-700"/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BottomFaq;
