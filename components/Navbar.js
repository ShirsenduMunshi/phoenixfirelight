// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { Button } from "./ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
// import { Menu } from "lucide-react";
// import Link from "next/link";
// import { ModeToggle } from "./theme-btn";
// import { signOut } from "@/lib/auth";
// import { supabase } from "@/lib/supabase";

// export default function Navbar() {
//   const pathName = usePathname();
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [login, setLogin] = useState(false);

//   useEffect(() => {
//     if (pathName === "/login" || pathName === "/signup") {
//       setLogin(false);
//     } else {
//       setLogin(true);
//     }
//   }, [pathName]);

//   useEffect(() => {
//     const checkUser = async () => {
//       // setLogin(false);
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       setIsLoggedIn(!!user);
//     };

//     // Check user on mount
//     checkUser();

//     // Set up auth state listener
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       // console.log("event", event);
//       // console.log("session", session);
//       setIsLoggedIn(!!session?.user);
//     });

//     // Cleanup listener on unmount
//     return () => subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut();
//     setIsLoggedIn(false);
//     router.push("/login");
//   };

//   return (
//     <nav className="w-full shadow-sm z-50 py-3">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Brand Logo */}
//           <div className="flex-shrink-0">
//             <Link
//               href="/"
//               className="text-xl font-bold flex flex-col items-center justify-center"
//             >
//               <img
//                 src="/logo1-bg-less.png"
//                 alt="logo"
//                 className="w-[80px] bg-transparent"
//               />
//               <p className="">
//                 <span className="text-[#338fc1] font1">P</span>hoenix Fireligh
//                 <span className="text-[#338fc1] font1">t</span>
//               </p>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link
//               href="/"
//               className="px-3 py-2 rounded-md text-[14px] font-bold"
//             >
//               Home
//             </Link>
//             <Link
//               href="/blogs"
//               className="px-3 py-2 rounded-md text-[14px] font-bold"
//             >
//               Blogs
//             </Link>
//             <Link
//               href="/about"
//               className="px-3 py-2 rounded-md text-[14px] font-bold"
//             >
//               About
//             </Link>
//             <Link
//               href="/contact"
//               className="px-3 py-2 rounded-md text-[14px] font-bold"
//             >
//               Contact
//             </Link>

//             {login ? (
//               isLoggedIn ? (
//                 <>
//                   <Link
//                     href="/dashboard"
//                     className="px-3 py-2 rounded-md text-[14px] font-bold"
//                   >
//                     <Button>Dashboard</Button>
//                   </Link>
//                   <Button
//                     variant="destructive"
//                     onClick={handleLogout}
//                     className="text-[14px] font-bold"
//                   >
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     href="/login"
//                     className="px-3 py-2 rounded-md text-[14px] font-bold"
//                   >
//                     <Button>Login</Button>
//                   </Link>
//                   <Link
//                     href="/signup"
//                     className="px-3 py-2 rounded-md text-[14px] font-bold"
//                   >
//                     <Button
//                       variant="destructive"
//                       className="text-[14px] font-bold"
//                     >
//                       Signup
//                     </Button>
//                   </Link>
//                 </>
//               )
//             ) : null}
//             <ModeToggle />
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden">
//             <ModeToggle />
//             <Sheet>
//               <SheetTrigger>
//                 <Menu className="h-6 w-6" />
//               </SheetTrigger>
//               <SheetContent side="left">
//                 <div className="flex flex-col space-y-3 mt-6">
//                   <Link
//                     href="/"
//                     className="px-3 py-2 rounded-md text-[14px] font-bold"
//                   >
//                     Home
//                   </Link>
//                   <Link
//                     href="/blogs"
//                     className="px-3 py-2 rounded-md text-[14px] font-bold"
//                   >
//                     Blogs
//                   </Link>
//                   <Link
//                     href="/about"
//                     className="px-3 py-2 rounded-md text-[14px] font-bold"
//                   >
//                     About
//                   </Link>
//                   <Link
//                     href="/contact"
//                     className="px-3 py-2 rounded-md text-[14px] font-bold"
//                   >
//                     Contact
//                   </Link>

//                   {login ? (
//                     isLoggedIn ? (
//                       <>
//                         <Link
//                           href="/dashboard"
//                           className="px-3 py-2 rounded-md text-[14px] font-bold"
//                         >
//                           <Button className="w-full">Dashboard</Button>
//                         </Link>
//                         <Button
//                           variant="destructive"
//                           onClick={handleLogout}
//                           className="text-[14px] font-bold"
//                         >
//                           Logout
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         <Link
//                           href="/login"
//                           className="px-3 py-2 rounded-md text-[14px] font-bold"
//                         >
//                           <Button className="w-full">Login</Button>
//                         </Link>
//                         <Link
//                           href="/signup"
//                           className="px-3 py-2 rounded-md text-[14px] font-bold"
//                         >
//                           <Button
//                             variant="destructive"
//                             className="text-[14px] font-bold w-full"
//                           >
//                             Signup
//                           </Button>
//                         </Link>
//                       </>
//                     )
//                   ) : null}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-btn";
import { signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Card } from "./ui/card";

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    setLogin(!(pathName === "/login" || pathName === "/signup"));
  }, [pathName]);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsLoggedIn(false);
    router.push("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="w-full shadow-sm z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold flex flex-col items-center justify-center">
              <img src="/logo1-bg-less.png" alt="logo" className="w-[80px] bg-transparent" />
              <p>
                <span className="text-[#338fc1] font1">P</span>hoenix Fireligh
                <span className="text-[#338fc1] font1">t</span>
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            {login && (
              isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button className="font-bold">Dashboard</Button>
                  </Link>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button>Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="destructive">Signup</Button>
                  </Link>
                </>
              )
            )}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <ModeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Sliding from Left) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <Card className="flex flex-col space-y-4 p-6 ">
          {/* Close Button */}
          <button onClick={() => setMenuOpen(false)} className="self-end">
            <X className="h-6 w-6" />
          </button>

          <NavLinks onClick={() => setMenuOpen(false)} />

          {login && (
            isLoggedIn ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full font-bold">Dashboard</Button>
                </Link>
                <Button variant="destructive" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)}>
                  <Button variant="destructive" className="w-full">
                    Signup
                  </Button>
                </Link>
              </>
            )
          )}
        </Card>
      </div>
    </nav>
  );
}

function NavLinks({ onClick }) {
  return (
    <>
      <Link href="/" className="px-3 py-2 text-[14px] font-bold" onClick={onClick}>
        Home
      </Link>
      <Link href="/blogs" className="px-3 py-2 text-[14px] font-bold" onClick={onClick}>
        Blogs
      </Link>
      <Link href="/about" className="px-3 py-2 text-[14px] font-bold" onClick={onClick}>
        About
      </Link>
      <Link href="/contact" className="px-3 py-2 text-[14px] font-bold" onClick={onClick}>
        Contact
      </Link>
    </>
  );
}
