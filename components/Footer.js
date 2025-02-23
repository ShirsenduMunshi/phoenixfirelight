// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// export default function Footer() {
//     return (
//         <footer className="py-6 px-6 border-t bg-background text-foreground bg-gray-200 dark:bg-[#2a2633]">
//             <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//                 {/* Footer Brand */}
//                 <div className="flex flex-col items-center justify-center">
//                     <div className="mb-1 pt-1">
//                         <Link href={`/`}>
//                             <Image src="/logo1-bg-less.png" alt="Phoenix Logo" width={40} height={40} />
//                         </Link>
//                     </div>
//                     <Link href="/" className="text-xl font-bold flex items-center pb-1">
//                     <span className="text-[#338fc1] font1">P</span>hoenix Fireligh
//                     <span className="text-[#338fc1] font1">t</span>
//                     </Link>
//                 </div>
//                 {/* Footer Links */}
//                 <nav className="flex space-x-6 margin-x-30px mt-6 md:mt-0">
//                     <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
//                     <Link href="/terms" className="hover:underline">Terms of Service</Link>
//                     <Link href="/contact" className="hover:underline">Contact</Link>
//                 </nav>
//                 {/* Copyright */}
//                 <div className="mt-4 md:mt-0 text-sm text-center text-gray-500">
//                     &copy; {new Date().getFullYear()} PhoenixFirelight. All rights reserved.
//                 </div>
//             </div>
//             <div className="mb-1 pt-1 w-full flex justify-center border-none outline-none">
//                 <Link href={`/`}>
//                     <Image src="/logo1-bg-less.png" alt="Phoenix Logo" width={160} height={160} priority={true}/>
//                 </Link>
//             </div>
//         </footer>
//     );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Separator } from './ui/separator';

export default function Footer() {
    return (
        <footer className="py-6 px-6 border-t bg-background text-foreground ">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Footer Brand */}
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-1 pt-1">
                        <Link href={`/`}>
                            <Image src="/logo1-bg-less.png" alt="Phoenix Logo" width={40} height={40} />
                        </Link>
                    </div>
                    <Link href="/" className="text-xl font-bold flex items-center pb-1">
                        <span className="text-[#338fc1] font1">P</span>hoenix Fireligh
                        <span className="text-[#338fc1] font1">t</span>
                    </Link>
                </div>
                {/* Footer Links */}
                <nav className="flex space-x-6 margin-x-30px mt-6 md:mt-0">
                    <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                    <Link href="/terms" className="hover:underline">Terms of Service</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </nav>
                {/* Social Media Handles */}
                <div className="flex space-x-4 mt-6 md:mt-0">
                    <Link href="https://facebook.com" className="text-gray-500 hover:text-gray-700">
                        <FaFacebook size={24} />
                    </Link>
                    <Link href="https://twitter.com" className="text-gray-500 hover:text-gray-700">
                        <FaTwitter size={24} />
                    </Link>
                    <Link href="https://instagram.com/munshirudra/" className="text-gray-500 hover:text-gray-700">
                        <FaInstagram size={24} />
                    </Link>
                    <Link href="https://github.com/ShirsenduMunshi?tab=repositories" className="text-gray-500 hover:text-gray-700">
                        <FaGithub size={24} />
                    </Link>
                    <Link href="https://in.linkedin.com/in/shirsendu-munshi-341590288?original_referer=https%3A%2F%2Fwww.google.com%2F" className="text-gray-500 hover:text-gray-700">
                        <FaLinkedin size={24} />
                    </Link>
                </div>
            </div>
            {/* Other Projects Section */}
            <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold">Other Projects</h3>
                <div className="flex flex-wrap justify-center gap-4 mt-3">
                    <Link href="https://shirsendu4.netlify.app/" target='_blank' className="text-blue-500 hover:underline">My Portfolio</Link>
                    <Link href="https://blog-curd.vercel.app/" target='_blank' className="text-blue-500 hover:underline">Blog Curd</Link>
                    <Link href="https://munshi-info-wheat.vercel.app/" target='_blank' className="text-blue-500 hover:underline">Munshi-info</Link>
                </div>
            </div>
            <div className="mb-1 pt-1 w-full flex justify-center border-none outline-none">
                <Link href={`/`}>
                    <Image src="/logo1-bg-less.png" alt="Phoenix Logo" width={160} height={160} priority={true} />
                </Link>
            </div>
            <Separator className="my-4"/>

            {/* Copyright */}

            <div className="mt-4 md:mt-0 text-sm text-center text-gray-500">
                &copy; {new Date().getFullYear()} PhoenixFirelight. All rights reserved.
            </div>
        </footer>
    );
}
