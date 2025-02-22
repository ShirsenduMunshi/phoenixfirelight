// import Link from "next/link";
// import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="border-t py-6 mt-12">
//       <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
//         {/* Left Side - Copyright */}
//         <p className="text-sm">&copy; {new Date().getFullYear()} Phonex Firelight. All rights reserved.</p>

//         {/* Middle - Navigation Links */}
//         <nav className="flex gap-4 mt-3 md:mt-0">
//           <Link href="/about" className="text-sm hover:underline">
//             About
//           </Link>
//           <Link href="/contact" className="text-sm hover:underline">
//             Contact
//           </Link>
//           <Link href="/blog" className="text-sm hover:underline">
//             Blog
//           </Link>
//         </nav>

//         {/* Right Side - Social Icons */}
//         <div className="flex gap-4 mt-3 md:mt-0">
//           <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
//             <FaGithub className="w-5 h-5 hover:scale-110 transition" />
//           </a>
//           <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer">
//             <FaTwitter className="w-5 h-5 hover:scale-110 transition" />
//           </a>
//           <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">
//             <FaLinkedin className="w-5 h-5 hover:scale-110 transition" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }


// app/components/Footer.js
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-6 px-6 border-t bg-background text-foreground bg-gray-200 dark:bg-[#2a2633]">
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
                {/* Copyright */}
                <div className="mt-4 md:mt-0 text-sm text-center text-gray-500">
                    &copy; {new Date().getFullYear()} PhoenixFirelight. All rights reserved.
                </div>
            </div>
            <div className="mb-1 pt-1 w-full flex justify-center border-none outline-none">
                <Link href={`/`}>
                    <Image src="/logo1-bg-less.png" alt="Phoenix Logo" width={160} height={160} priority={true}/>
                </Link>
            </div>
        </footer>
    );
}