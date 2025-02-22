"use client";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Toaster } from './ui/toaster';
import DashboardSidebar from './DashboardSidebar';
import ProtectedRoute from "@/components/ProtectedRoute";

function BlogForm() {
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            if (!title || !category || !summary || !image || !body) {
                throw new Error('Please fill in all fields');
            }

            // Convert image to base64
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = async () => {
                const base64Image = reader.result;

                // Send data to API
                const response = await fetch('/api/createBlog', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        title, 
                        category, 
                        summary, 
                        body, 
                        imageFile: base64Image,
                        userId: user.id 
                    }),
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to create blog');

                toast({
                    title: 'Success!',
                    description: 'Blog created successfully',
                });

                // Reset form
                setTitle('');
                setCategory('');
                setSummary('');
                setBody('');
                setImage(null);
            };
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (<>
        <div onClick={() => setIsSidebarOpen((prev) => !prev)}>
            <DashboardSidebar />
        </div>
        <Toaster />
        <Card className={`max-w-2xl mx-auto mt-8 transition-all ${isSidebarOpen ? "w-[77%] ml-[23%]" : "w-[80%] ml-[20%]"
        }`}>
            <CardHeader>
                <CardTitle>Create New Blog Post</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter blog category"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="summary">Summary</Label>
                        <Textarea
                            id="summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            placeholder="Enter blog summary"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="body">Content</Label>
                        <Textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter blog content"
                            className="min-h-[200px]"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Featured Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Blog'}
                    </Button>
                </form>
            </CardContent>
        </Card>
        </>);
}
export default function ProtectedBlogForm() {
    return (
        <ProtectedRoute>
            <BlogForm />
        </ProtectedRoute>
    );
}