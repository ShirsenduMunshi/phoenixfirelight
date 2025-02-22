'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Mail, User, MessageSquare, Send } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '4dae77d3-0c57-4e92-8cc3-df618629a455',
        ...formData,
      }),
    });

    const result = await response.json();
    if (result.success) {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <><main className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-lg p-6 space-y-4">
        <CardHeader className="text-center text-xl font-bold">Contact Us</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <MessageSquare className="w-5 h-5 mt-2" />
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </Button>
          </form>
          {status && <p className="text-center mt-2 text-sm">{status}</p>}
        </CardContent>
      </Card>
    </main>
    <Footer />
    </>);
}
