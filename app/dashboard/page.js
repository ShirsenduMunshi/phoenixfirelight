"use client";
import DashboardSidebar from "@/components/DashboardSidebar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { getUserProfile } from "@/lib/auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
        setName(profile.name);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchUserProfile();
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        // console.log(data);
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div onClick={() => setIsSidebarOpen((prev) => !prev)}>
        <DashboardSidebar />
      </div>
      <main
        className={`min-h-screen pr-8 flex flex-col gap-6 transition-all ${
          isSidebarOpen ? "w-[77%] ml-[23%]" : "w-[80%] ml-[20%]"
        } `}
      >
        {/* Top Section - Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-[200px]" />
              ) : (
                <p className="text-2xl font-bold">
                  {dashboardData?.totalPosts || 0} Posts
                </p>
              )}

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-[200px]" />
              ) : (
                <p className="text-2xl font-bold">
                  {dashboardData?.activeUsers || 0} Users
                </p>
              )}

            </CardContent>
          </Card>
        </div>

        {/* Middle Section - Recent Posts Table */}
        <div className="bg-card rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Posts by current logged in user</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  </TableRow>
                ))
              ) : (
                dashboardData?.recentPosts?.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>
                      {new Date(post.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                  </TableRow>
                )) || (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No posts found
                    </TableCell>
                  </TableRow>
                )
              )}

            </TableBody>
          </Table>
        </div>

        {/* Bottom Section - Actions & Skeleton Loader */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/new-blog">
            <Button>New Post</Button>
          </Link>
          <Skeleton className="w-full sm:w-[300px] h-10 rounded-md" />
        </div>
      </main>
      <div className={`${isSidebarOpen ? "w-[77%] ml-[23%]" : "w-[80%] ml-[20%]"}`}>
        <Footer />
      </div>
    </>
  );
}
