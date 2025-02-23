'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaFilter } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const router = useRouter();

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/dashboard');
            const data = await response.json();
            console.log('Blogs data:', data);
            setBlogs(data.recentPosts);
            setCategories(['All', ...new Set(data.recentPosts.map(recentPosts => recentPosts.category))]);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
        // Simulate fetching data

        // setTimeout(() => {
        //     const fetchedBlogs = [
        //         { id: 1, title: 'Blog 1', category: 'Tech', summary: 'This is a tech blog' },
        //         { id: 2, title: 'Blog 2', category: 'Lifestyle', summary: 'This is a lifestyle blog' },
        //         { id: 3, title: 'Blog 3', category: 'Tech', summary: 'Another tech blog' },
        //     ];
        //     setBlogs(fetchedBlogs);
        //     setCategories(['All', ...new Set(fetchedBlogs.map(blog => blog.category))]);
        //     setLoading(false);
        // }, 2000);
    }, []);

    const hendaleBlog = (id) => {
        try {
            router.push(`/blogpost/${id}`);
        } catch (error) {
            console.error('Failed to fetch blogs', error);              
        }
    }

    const filteredBlogs = selectedCategory === 'All' 
        ? blogs 
        : blogs.filter(blog => blog.category === selectedCategory);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Blogs</h1>
                <div className="flex items-center gap-4">
                    <FaFilter className="" />
                    <select
                        className="border p-2 rounded-md"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [...Array(6)].map((_, index) => (
                        <Card key={index} className="p-4">
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4 mb-2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-5/6" />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    filteredBlogs.map(blog => (
                        <Card key={blog.id} className="p-4 hover:shadow-lg transition">
                            <img src={blog.image_url} alt={blog.title} className=''/>
                            <CardHeader>
                                <CardTitle>{blog.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{blog.summary}</p>
                                <span className="text-sm">Category: {blog.category}</span>
                            </CardContent>
                                <Button onClick={()=>{hendaleBlog(blog.id)}} className="mt-4 font-bold">Read More</Button>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
