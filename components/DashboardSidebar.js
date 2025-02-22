"use client";
import React, { useEffect, useState } from "react";
import { getUserProfile, signOut, updateUserProfile } from "../lib/auth";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";


const DashboardSidebar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);
  const [avatarTimestamp, setAvatarTimestamp] = useState(Date.now());
  const [close, setClose] = useState(true);

  
  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUser(profile);
      setNewName(profile.name);
      setNewEmail(profile.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
        const { data: { user } } = await supabase.auth.getUser();
        await updateUserProfile(user.id, newName, newEmail, newProfilePhoto);
        setAvatarTimestamp(Date.now());
        await fetchUserProfile();
        setIsEditModalOpen(false);
    } catch (err) {
        setError(err.message);
    }
  };

    const handleLogout = async () => {
      await signOut();
      setIsLoggedIn(false);
      router.push("/login");
    };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

//   console.log(close);
//<div className="button absolute top-4 right-4 block z-50"> {/*  */}
//                  <Button className="font-bold text-xl" onClick={() => setClose((prev) => !prev)}>⇄</Button>
//              </div>
  return (
     <>
        <div className={`z-50 w-72 border-r-2 h-[70vh] fixed top-[12%] backdrop-blur bg-background/50 transition-all`}>
            <div className="flex flex-col items-center h-full p-4 relative">
                <div className="user-data w-[60%] left-[-15px] flex flex-col items-center relative ">
                    <div className="bg-black w-[10rem] h-[10rem] rounded-full mt-2 overflow-hidden border-4 relative border-[#328cbd]">
                        {user?.avatar_url ? (
                            <img
                            src={`${user.avatar_url}?t=${avatarTimestamp}`}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            />
                            ) : (<div className="w-full h-full flex items-center justify-center text-sm text-gray-200">
                                No Photo
                            </div>)}
                    </div>
                    <div className="text-xl mt-2 font-bold text-nowrap">
                        {user?.name || "User Name"}
                    </div>
                    {/* <div className="text-xl mt-2 font-bold text-nowrap">
                        {user?.id || "User id"}
                    </div> */}
                    <div className="text-[1rem] text-gray-500 dark:text-gray-300 mt-1">
                        {user?.email || "user@example.com"}
                    </div>
                    <div className="w-full">
                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogTrigger asChild>
                <Button className="text-[14px] mt-4 w-full font-bold">
                    Edit Profile
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEdit} className="space-y-4">
                    <Input
                    type="text"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    />
                    <Input
                    type="email"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    />
                    <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewProfilePhoto(e.target.files[0])}
                    />
                    <Button type="submit" className="w-full">
                    Save Changes
                    </Button>
                </form>
                </DialogContent>
            </Dialog>
                    </div>
                    <div className="w-full">
                        <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="text-[14px] mt-4 w-full font-bold">
                            Logout
                        </Button>
                    </div>
                </div>
                <Separator className="my-4"/>
                <div className="mt-2 flex flex-col items-center w-[60%] gap-4 space-y-4 relative left-[-15px]">
                    <Link href={"/dashboard"} className="w-40"><Button className="text-[14px] w-full font-bold">Dashboard</Button></Link>
                    <Link href="/dashboard/admin-posts">
                      <Button variant="outline">Manage Your Posts</Button>
                    </Link>
                    <Link href={"/new-blog"} className="w-40"><Button className="text-[14px] w-full font-bold" variant="destructive">New Post</Button></Link>
                </div>
            </div>
        </div>
    </>
  );
};

export default DashboardSidebar;