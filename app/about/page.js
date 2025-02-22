'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRocket, FaCode, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About PhonexFirelight
      </motion.h1>

      <motion.p
        className="text-center text-lg max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/" className="text-xl font-bold flex flex-col items-center justify-center w-fit m-auto">
              <img src="/logo1-bg-less.png" alt="logo" className="w-[80px] bg-transparent" />
              <p className="">
                <span className="text-[#338fc1] font1">P</span>hoenix Fireligh
                <span className="text-[#338fc1] font1">t</span>
              </p>
            </Link> Is a modern blog platform where users can explore, create,
        and share content seamlessly. Built with Next.js, Supabase, and
        Cloudinary, it ensures a smooth and engaging experience for content
        creators.
      </motion.p>

      <div className="mt-8">
          <Card>
            <div className="space-y-4 p-4">
              <h4 className="text-2xl font-semibold">The Creator</h4>
              <p>
                The creator of "Phoenix Firelight" is a passionate individual dedicated to exploring
                the intersection of technology and creative expression. Through this platform, I aim to share
                my thoughts, ideas, and experiences with others who are eager to grow and evolve.
              </p>
            </div>
          </Card>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-md p-4 flex flex-col items-center text-center">
            <FaRocket size={40} />
            <CardContent className="mt-4">
              <h2 className="text-xl font-semibold">Fast & Efficient</h2>
              <p className="text-sm">Optimized for performance with Next.js & Supabase.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="shadow-md p-4 flex flex-col items-center text-center">
            <FaCode size={40} />
            <CardContent className="mt-4">
              <h2 className="text-xl font-semibold">Modern Tech Stack</h2>
              <p className="text-sm">Built with Next.js, Supabase, and Cloudinary.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="shadow-md p-4 flex flex-col items-center text-center">
            <FaUsers size={40} />
            <CardContent className="mt-4">
              <h2 className="text-xl font-semibold">User-Focused</h2>
              <p className="text-sm">Designed to enhance content sharing & engagement.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="text-center mt-8 flex items-center justify-center space-x-4">
        <Link href={"/"}>
            <Button  className="px-6 py-3 text-lg">Explore Now</Button>
        </Link>
        <Link href={"/contact"}>
            <Button variant="outline" className="px-6 py-3 text-lg">Contact us</Button>
        </Link>
      </div>
    </div>
  );
}
