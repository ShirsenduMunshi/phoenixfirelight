"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Terms of Service
      </motion.h1>

      <Card className="shadow-lg rounded-lg">
        <CardContent className="p-6">
          <ScrollArea className="h-[500px] overflow-y-auto">
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome to Phoenix Firelight! These Terms of Service ("Terms") govern your use of
                our website and services. By accessing or using our platform, you agree to comply
                with these Terms.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
              <p className="text-gray-600 dark:text-gray-300">
                By using our platform, you agree to:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                <li>Provide accurate and up-to-date information</li>
                <li>Not engage in fraudulent or harmful activities</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">3. Account Registration & Security</h2>
              <p className="text-gray-600 dark:text-gray-300">
                You may need to create an account to access certain features. You are responsible
                for maintaining the security of your account and password.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">4. Content Ownership</h2>
              <p className="text-gray-600 dark:text-gray-300">
                You retain ownership of any content you submit. However, by posting content on our
                platform, you grant us a license to use, modify, and distribute it as necessary.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">5. Prohibited Activities</h2>
              <p className="text-gray-600 dark:text-gray-300">
                The following actions are strictly prohibited:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                <li>Posting illegal or harmful content</li>
                <li>Attempting to hack or disrupt our services</li>
                <li>Impersonating others</li>
              </ul>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We reserve the right to suspend or terminate your account if you violate these Terms
                or engage in prohibited activities.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We are not responsible for any damages, direct or indirect, resulting from your use
                of our services.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">8. Changes to These Terms</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update these Terms periodically. Continued use of our platform after changes
                means you accept the revised Terms.
              </p>
            </section>

            <Separator />

            <section className="my-6">
              <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions, feel free to contact us at{" "}
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
