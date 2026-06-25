
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const WebsiteGrader = () => {
  useEffect(() => {
    emailjs.init('-243iobnGw0PSzPnp');
  }, []);

  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const form = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&category=performance&category=accessibility&category=seo&category=best-practices`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const lighthouseResult = data?.lighthouseResult;
      if (!lighthouseResult) {
        throw new Error('Lighthouse data is not available in the API response.');
      }

      const performanceScore = parseFloat(
        (lighthouseResult.categories?.performance?.score * 100 || 0).toFixed(1)
      );
      const accessibilityScore = parseFloat(
        (lighthouseResult.categories?.accessibility?.score * 100 || 0).toFixed(1)
      );
      const bestPracticesScore = parseFloat(
        (lighthouseResult.categories?.['best-practices']?.score * 100 || 0).toFixed(1)
      );
      const seoScore = parseFloat(
        (lighthouseResult.categories?.seo?.score * 100 || 0).toFixed(1)
      );

      const emailContent = `
        Website Grading Results
         ${url}
        Performance Score: ${performanceScore}
        Accessibility Score:${accessibilityScore}
        Best Practices Score: ${bestPracticesScore}
        SEO Score: ${seoScore}
        Aggregate Score: ${(
          (performanceScore + accessibilityScore + bestPracticesScore + seoScore) /
          4
        ).toFixed(1)}
      `;

      // Send email with the results using EmailJS
      await emailjs.send(
        'service_sd4ada7', // Replace with your EmailJS service ID
        'template_xcy5z5u', // Replace with your EmailJS template ID
        {
          from_name: 'Website Grader',
          to_email: email.trim(), // Use the email input by the user
          message: emailContent, // Send the generated email content
        },
        '-243iobnGw0PSzPnp' // Replace with your EmailJS public key
      );

      console.log('Email sent successfully!');
     

    } catch (error) {
      console.error('Error sending email:', error);
      setError(`Failed to send email: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 animate-fadeIn">
      <div className="absolute top-4 right-4 mb-5" style={{ color: 'black' }}>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
            <SelectItem value="pt">Português</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <div className="flex justify-center mb-4">
          <img
            width="151"
            alt="Website Grader"
            src="/public/newlogo.png"
            className="h-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
        <h1 className="text-4xl md:text-5xl mb-5 text-center font-bold">
          Website Grader <sup>®</sup>
        </h1>
        <p className="text-lg mb-8 text-center">
          Grade your website in seconds. Then learn how to improve it for free.
        </p>
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="text-center"
            style={{ color: 'black' }}
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="text-center"
            style={{ color: 'black' }}
          />
          <p className="text-sm text-gray-400 mt-2 text-center">
            We are committed to your privacy. Mycto uses the information you
            provide to us to contact you about our relevant content, products,
            and services. You may unsubscribe from these communications at any
            time. For more information, check out our{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Analyzing...' : 'Get your score'}
          </Button>
        </form>
        {loading && (
          <div className="flex justify-center items-center space-x-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${index * 0.15}s` }}
              ></div>
            ))}
          </div>
        )}
        {error && (
          <div className="text-red-500 text-base mt-5 text-center">{error}</div>
        )}
      </div>
    </div>
  );
};

export default WebsiteGrader;
