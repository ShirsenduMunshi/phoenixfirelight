"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formEndpoint = "https://api.web3forms.com/submit";
    const accessKey = "4dae77d3-0c57-4e92-8cc3-df618629a455";

    const response = await fetch(formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, access_key: accessKey }),
    });

    setLoading(false);
    if (response.ok) {
      toast({ title: "Message Sent!", description: "We will get back to you soon." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast({ variant: "destructive", title: "Error!", description: "Something went wrong." });
    }
  };

  return (
    <section className="Background-image w-full py-12 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Toaster />
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info Section */}
          <Card className="shadow-lg mx-4 bg-background/50 backdrop-blur">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-2xl font-semibold text-center">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-red-500 dark:text-blue-500" />
                  <p>Adarpare, Jalpaiguri, west Bengal, 735101</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-red-500 dark:text-blue-500" />
                  <p><Link href="tel://8617504021" className="">+91 8617504021</Link></p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-red-500 dark:text-blue-500" />
                  <p><Link href="mailto:shirsendumunshi@gmail.com" className="">info@phoneixFirelight.com</Link></p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGlobe className="text-red-500 dark:text-blue-500" />
                  <p><Link href="https://shirsendu4.netlify.app/" className="">My Portfolio</Link></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Section */}
          <Card className="shadow-lg mx-4 bg-background/50 backdrop-blur">
            <CardContent className="p-6">
              <h2 className="text-3xl font-semibold text-center mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
      </div>
    </section>
  );
}