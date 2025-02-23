'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import Image from 'next/image';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
// import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export default function BlogPost() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState("");

    // const supabase = createClient(
    //     process.env.NEXT_PUBLIC_SUPABASE_URL,
    //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    //   );

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
            <p className=" mb-4">{blog.summary}</p>
            <div className='relative'>
            <div className=" flex small-dev gap-80 mb-6 absolute bottom-4 px-4 w-full">
                <span className="">Written by:<br/> <strong className='py-4'>{author || 'Unknown'}</strong></span>
                <span className="">Published on: <p className='py-4'>{blog.created_at.slice(0,10).split("-").reverse().join("-") || 'N/A'}</p></span>
            </div>
                <Image src={blog.image_url} alt={blog.title} width={800} height={400} className="rounded-lg w-full h-[70vh] object-cover" priority/>

                <div className="flex gap-4 absolute bottom-4 right-0 pr-4">
                    <Button variant="outline" size="icon"><FaFacebook size={18} /></Button>
                    <Button variant="outline" size="icon"><FaTwitter size={18} /></Button>
                    <Button variant="outline" size="icon"><FaLinkedin size={18} /></Button>
                    <Button variant="outline" size="icon"><Share size={18} /></Button>
                </div>
            </div>
            <div className="mt-6 text-lg leading-relaxed">
                {blog.body}
            </div>
        </div>
    );
}

