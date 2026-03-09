"use client";

import { useState } from "react";
import Layout from "@/components/layout/layout";
import { SportsCard } from "@repo/ui";
import { Button } from "@repo/ui";
import { Badge } from "@repo/ui";
import { Input } from "@repo/ui";
import { Textarea } from "@repo/ui";
import { Label } from "@repo/ui";
import { ArrowRight, Trophy, Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    service: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Thank you for your inquiry! We&apos;ll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      organization: "",
      phone: "",
      service: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const contactOptions = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Send us a message and we&apos;ll respond within 24 hours.",
      value: "info@gritdigitalperformance.com",
      action: "mailto:info@gritdigitalperformance.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Speak with our team directly about your needs.",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "Stop by our Denver office for a consultation.",
      value: "Denver, Colorado",
      action: "#"
    }
  ];

  const services = [
    "Website Development",
    "Event Registration System",
    "Sports Consulting",
    "Mobile App Development",
    "Marketing Automation",
    "Data Analytics",
    "Other"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-red-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-red-600 text-white hover:bg-red-700 mb-6">
              <Trophy className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Let&apos;s Build Something Great Together
            </h1>
            
            <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
              Ready to transform your sports organization&apos;s digital presence? 
              We&apos;re here to help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <SportsCard
                key={index}
                title={option.title}
                description={option.description}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-slate-900">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                      {option.icon}
                    </div>
                    <span className="font-medium">{option.value}</span>
                  </div>
                  <Button className="btn-primary w-full">
                    {option.title}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </SportsCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-slate-600">
              Tell us about your project and we&apos;ll get back to you with a personalized plan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-900 font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-900 font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-slate-900 font-medium">
                  Sports Organization
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Denver United Soccer Club"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-900 font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service" className="text-slate-900 font-medium">
                Service Interest *
              </Label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleInputChange}
                className="w-full h-12 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-900 font-medium">
                Project Details *
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project, goals, and timeline..."
                className="min-h-[150px] resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                * Required fields. We typically respond within 24 hours.
              </p>
              
              <Button 
                type="submit" 
                className="btn-primary text-lg px-8 py-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about our services and process.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does a typical website project take?",
                answer: "Most sports website projects take 8-12 weeks from discovery to launch, depending on complexity and scope."
              },
              {
                question: "Do you work with organizations of all sizes?",
                answer: "Yes! We work with everyone from local youth leagues to professional sports organizations, tailoring solutions to fit your needs and budget."
              },
              {
                question: "What is your pricing structure?",
                answer: "We offer both project-based pricing and ongoing retainers. Website projects typically start at $5,000, while event registration systems start at $2,500 plus a small percentage per registration."
              },
              {
                question: "Do you provide ongoing support and maintenance?",
                answer: "Absolutely! We offer comprehensive support packages to ensure your digital platforms continue to perform optimally and stay up-to-date."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}


