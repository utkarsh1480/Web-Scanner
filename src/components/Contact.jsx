// // import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FiUser, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

// import { Button } from "./ui/button";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import { Toaster } from "./ui/toaster";
// import { useToast } from "../hooks/use-toast";
// import { useState } from "react";

// const Contact = function Contact() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       mobile: "",
//       message: "",
//     },
//   });

//   const onSubmit = (data) => {
//     setIsSubmitting(true);
//     console.log(data);
//     // Simulate an API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       toast({
//         title: "Message Sent!",
//         description: "Thank you for your message. We'll get back to you soon!",
//       });
//       form.reset();
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
//         <div className="p-8 w-full">
//           <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-1">Contact Us</div>
//           <h2 className="block mt-1 text-lg leading-tight font-medium text-black">We'd love to hear from you!</h2>
//           <p className="mt-2 text-muted-foreground">
//             Have questions about our Website Grader? Want to improve your website's performance, SEO, or best practices?
//             Reach out to us!
//           </p>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 rules={{ required: "Name is required" }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <Input placeholder="Your name" className="pl-10" {...field} />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 rules={{
//                   required: "Email is required",
//                   pattern: {
//                     value: /\S+@\S+\.\S+/,
//                     message: "Invalid email address",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <Input placeholder="john@example.com" className="pl-10" {...field} />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="mobile"
//                 rules={{
//                   required: "Mobile number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Invalid mobile number",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Mobile Number</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <Input placeholder="1234567890" className="pl-10" {...field} />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="message"
//                 rules={{ required: "Message is required" }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Message</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
//                         <Textarea placeholder="Type your message here." className="pl-10 min-h-[100px]" {...field} />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? "Sending..." : "Send Message"}
//               </Button>
//             </form>
//           </Form>
//           <Toaster />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";
import emailjs from "emailjs-com";

import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Toaster } from "./ui/toaster";
import { useToast } from "../hooks/use-toast";
import { useLanguage } from '../Context/LanguageContext';

const Contact = function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Prepare the email data
    const emailData = {
      from_name: data.name,
      from_email: data.email,
      from_mobile: data.mobile,
      message: data.message,
    };

    try {
      // Use EmailJS to send the email
      await emailjs.send(
        "service_o7qbpvs", // Replace with your EmailJS service ID
        "template_5yqnsv9", // Replace with your EmailJS template ID
        emailData,
        "cpP0refyzyRuqJZKV" // Replace with your EmailJS public key
      );

      toast({
        title: t.contactSuccess,
        description: t.contactSuccessDesc,
      });
      form.reset();
    } catch (error) {
      // console.error("EmailJS Error:", error);
      toast({
        title: t.contactError,
        description: t.contactErrorDesc,
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-card rounded-lg shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-1">{t.contactUs}</div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-foreground">{t.contactHeading}</h2>
          <p className="mt-2 text-muted-foreground">
            {t.contactSubtext}
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contactName}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder={t.contactNamePlaceholder} className="pl-10 text-foreground" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contactEmail}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder={t.contactEmailPlaceholder} className="pl-10 text-foreground" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                rules={{
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contactMobile}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder={t.contactMobilePlaceholder} className="pl-10 text-foreground" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                rules={{ required: "Message is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contactMessage}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FiMessageSquare className="absolute left-3 top-3 text-muted-foreground" />
                        <Textarea placeholder={t.contactMessagePlaceholder} className="pl-10 min-h-[100px] text-foreground" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t.contactSending : t.contactSend}
              </Button>
            </form>
          </Form>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Contact;
