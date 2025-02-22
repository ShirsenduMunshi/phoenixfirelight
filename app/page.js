"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Rocket, PenTool, Shield, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative text-center py-2 bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:to-black">
        <div className="relative w-full h-[60vh] Background-image justify-center flex flex-col overflow-hidden">
          
          <div className="Background-image-glass absolute inset-0 z-0 items-center flex justify-between" >
            <div className="relative  z-10 bg-gradient-to-r from-white to-transparent dark:from-black dark:to-transparent p-6 rounded-lg max-w-2xl">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                  Welcome to Phoenix Firelight
              </motion.h1>
              <p className="text-lg md:text-xl mb-6">
                Ignite your passion for knowledge, storytelling, and creative exploration.
              </p>
              <div className="flex justify-start gap-3">
                <Link href="/signup" className="block w-fit">
                  <Button className="px-6 py-3 text-lg font-bold flex items-center">
                    Get Started <ArrowRight className="ml-2" />
                  </Button>
                </Link>

                <Link href="/blogs">
                  <Button variant="outline" className="">
                    Explore blogs <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
              {/* <Image src={"/logo1-bg-less.png"} alt="logo1-image" width={"300"} height={"300"} className="p-6 bg-[#020817] rounded-full"/> */}
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Features Section */}
      <section className="max-w-6xl mx-auto text-center py-12 px-4">
        <h2 className="text-3xl font-semibold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Rocket size={36} />}
            title="Fast & Reliable"
            description="Lightning-fast content delivery and reliable performance."
          />
          <FeatureCard
            icon={<PenTool size={36} />}
            title="Seamless Writing"
            description="An intuitive and distraction-free writing experience."
          />
          <FeatureCard
            icon={<Shield size={36} />}
            title="Secure & Private"
            description="Your data and content are fully protected and encrypted."
          />
        </div>
      </section>

      <Separator className="my-12" />

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto text-center py-12 px-4">
        <h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Testimonial
            name="Amit Sharma"
            feedback="Phoenix Firelight has completely transformed the way I share my thoughts and stories. Highly recommended!"
            rating={5}
          />
          <Testimonial
            name="Sarah Johnson"
            feedback="An amazing platform for writers and readers alike. The user experience is top-notch!"
            rating={4}
          />
        </div>
      </section>

      <Separator className="my-12" />

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-semibold mb-4">Join Us Today!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Be part of a vibrant community of writers and readers.
        </p>
        <Link href="/signup">
          <Button size="lg" className="font-bold">Sign Up Now</Button>
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}

function Testimonial({ name, feedback, rating }) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300 italic">"{feedback}"</p>
        <div className="flex justify-center mt-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="text-yellow-500" />
          ))}
        </div>
        <h4 className="text-lg font-semibold mt-2">{name}</h4>
      </CardContent>
    </Card>
  );
}
