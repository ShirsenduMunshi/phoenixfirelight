"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Privacy Policy
      </motion.h1>

      <Card className="shadow-lg rounded-lg">
        <CardContent className="p-6">
          <ScrollArea className="h-[500px] overflow-y-auto">
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome to Phoenix Firelight. Your privacy is important to us, and this policy
                outlines how we collect, use, and protect your personal information.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                <li>Personal details such as name and email when signing up</li>
                <li>Usage data to improve the user experience</li>
                <li>Uploaded content such as blog posts and profile images</li>
              </ul>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-gray-300">
                The information we collect is used to:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                <li>Provide and maintain our services</li>
                <li>Personalize user experience</li>
                <li>Communicate important updates</li>
                <li>Ensure security and prevent fraudulent activities</li>
              </ul>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">4. Data Protection</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We implement security measures to protect your data. However, no system is
                completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">5. Third-Party Services</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may use third-party services like Supabase and Cloudinary to enhance our app.
                These services may collect data according to their privacy policies.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300">
                You have the right to:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                <li>Access your personal data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent for data usage</li>
              </ul>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">7. Updates to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this policy from time to time. Changes will be reflected on this page.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:shirsendumunshi4@gmail.com" className="text-blue-500">
                  support@phoenixfirelight.com
                </a>
                .
              </p>
            </section>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}