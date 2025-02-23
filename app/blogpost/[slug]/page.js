'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import Image from 'next/image';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

export default function BlogPost() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState("");

      const getUserName = async (id) => {
        try {
            const { data, error } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', id)
            .single();

        if (error || !data) {
            console.error('Error fetching profile name:', error);
            return;
        }

        setAuthor(data.name);
        } catch (error) {
            console.error('Error fetching profile name:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/dashboard`);
                const data = await response.json();
                const foundBlog = data.recentPosts.find(post => post.id === slug);
                const userid = foundBlog.user_id;
                // console.log("userId: ",userid);
                getUserName(userid);
                setBlog(foundBlog);
            } catch (error) {
                console.error('Failed to fetch blog', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    



    if (loading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-6" />
                <Skeleton className="h-64 w-full mb-6" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/6" />
            </div>
        );
    }

    if (!blog) {
        return <p className="text-center text-red-500">Blog post not found.</p>;
    }

    return (
        <div className="container mx-auto py-8 px-4 w-[90%]">
            <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
            <div className='p-4 bg-gradient-to-r from-gray-300 to-transparent dark:from-slate-800 dark:to-transparent flex gap-4 items-center mb-4'>
                <div className='ml-4 w-[3px] bg-slate-600 h-[40px]'></div>
                <p className="ml-4 text-2xl">{blog.summary}</p>
            </div>
            <div className='relative'>
            <div className=" flex small-dev gap-72 mb-6 absolute bottom-4 px-4 w-full">
                <span className="bg-gradient-to-r from-white to-transparent dark:from-black dark:to-transparent p-3 rounded-lg">Written by:<br/> <strong className=''>{author || 'Unknown'}</strong></span>
                <span className="bg-gradient-to-r from-white to-transparent dark:from-black dark:to-transparent p-3 rounded-lg">Published on: <p className='font-bold'>{blog.created_at.slice(0,10).split("-").reverse().join("-") || 'N/A'}</p></span>
            </div>
                <Image src={blog.image_url} alt={blog.title} width={800} height={400} className="rounded-lg w-full h-[70vh] object-cover" priority/>

                <div className="flex gap-4 absolute bottom-4 right-0 pr-4">
                    <Button variant="outline" size="icon"><FaFacebook size={18} /></Button>
                    <Button variant="outline" size="icon"><FaTwitter size={18} /></Button>
                    <Button variant="outline" size="icon"><FaLinkedin size={18} /></Button>
                    <Button variant="outline" size="icon"><Share size={18} /></Button>
                </div>
            </div>
            <Card className="mt-6 text-lg leading-relaxed">
                <CardContent>
                    <p className='mt-4 text-xl'>
                        {blog.body}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

