'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
            // console.log('Blogs data:', data);
            setBlogs(data.recentPosts);
            setCategories(['All', ...new Set(data.recentPosts.map(recentPosts => recentPosts.category))]);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
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
                        <Card key={blog.id} className="p-4 hover:shadow-xl transition duration-300 ease-in-out relative">
                            <div className='bg-gradient-to-t z-10 from-gray-300 to-transparent dark:from-slate-800 dark:to-transparent rounded-lg overflow-hidden'>
                                <img src={blog.image_url} alt={blog.title} className='rounded-lg'/>
                            </div>
                            <CardHeader className="p-0 pt-2">
                                <span className="text-sm font-bold text-[#3288b8]">{blog.category}</span>
                            </CardHeader>
                                <CardTitle className="pt-2">
                                    <h1 className='text-2xl font-bold mb-2 text-wrap'>{blog.title}</h1>
                                </CardTitle>
                            <CardContent className="p-0">
                                <div className='p-4 bg-gradient-to-r from-gray-300 to-transparent dark:from-slate-800 dark:to-transparent flex gap-2 items-center mb-4'>
                                    <div className='w-[3px] bg-slate-600 h-[40px]'></div>
                                    <p className="text-sm">{blog.summary}</p>
                                </div>
                                {/* <p>{blog.summary}</p> */}
                            </CardContent>
                            <CardFooter className="p-0 flex justify-between items-center">
                                <div>
                                    <p>Published on :</p>
                                    <p className="text-sm font-bold">{blog.created_at.slice(0,10).split("-").reverse().join("-") || NaN}</p>
                                </div>
                                <Button onClick={()=>{hendaleBlog(blog.id)}} className="mt-4 font-bold">Read More</Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
