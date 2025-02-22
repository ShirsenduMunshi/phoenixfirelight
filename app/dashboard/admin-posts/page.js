// "use client";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import DashboardSidebar from "@/components/DashboardSidebar";
// import { createClient } from "@supabase/supabase-js";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function AdminPostsPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Edit Modal States
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [editData, setEditData] = useState({
//     id: "",
//     title: "",
//     category: "",
//     summary: "",
//     content: "",
//     image_url: "",
//   });
//   const [newImage, setNewImage] = useState(null);

//   const fetchBlogs = async () => {
//     try {
//       const res = await fetch("/api/dashboard/");
//       const data = await res.json();
//       setBlogs(data.recentPosts);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // DELETE FUNCTION (Works as expected)
//   const handleDelete = async (id) => {
//     try {
//       const confirmDelete = prompt(
//         "Are you sure you want to delete this blog post? Type 'yes' to confirm."
//       );
//       if (confirmDelete === null || confirmDelete.toLowerCase() !== "yes") {
//         return;
//       }
      
//       const res = await fetch("/api/dashboard", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (res.ok) {
//         fetchBlogs();
//       } else {
//         const data = await res.json();
//         console.error("Error deleting blog:", data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // OPEN EDIT MODAL
//   const openEditModal = (blog) => {
//     setEditData(blog); // Set blog data in state
//     setNewImage(null); // Reset image selection
//     setIsEditOpen(true); // Open modal
//   };

//   // HANDLE INPUT CHANGE
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // HANDLE IMAGE SELECTION
//   const handleImageChange = (e) => {
//     setNewImage(e.target.files[0]); // Store selected file
//   };

//   // UPLOAD IMAGE TO SUPABASE
//   const uploadImageToSupabase = async (file, oldImageUrl) => {
//     if (!file) return oldImageUrl; // Keep old image if no new one
  
//     const fileExt = file.name.split(".").pop();
//     const fileName = `${Date.now()}.${fileExt}`;
//     const filePath = `${fileName}`;
  
//     // Convert file to Blob
//     const fileBlob = new Blob([file], { type: file.type });
  
//     // Upload new image
//     const { data, error } = await supabase.storage
//       .from("blog-images")
//       .upload(filePath, fileBlob, { upsert: true });
  
//     if (error) {
//       console.error("Image upload error:", error);
//       return oldImageUrl; // Keep old image if upload fails
//     }
  
//     // Get the new public URL
//     const { data: publicURLData } = supabase.storage
//       .from("blog-images")
//       .getPublicUrl(filePath);
  
//     const newImageUrl = publicURLData.publicUrl;
  
//     // Delete old image from Supabase
//     if (oldImageUrl) {
//       const oldImagePath = oldImageUrl.split("/").pop(); // Extract filename
//       await supabase.storage.from("blog-images").remove([`blogs/${oldImagePath}`]);
//     }
  
//     return newImageUrl;
//   };

//   // UPDATE FUNCTION
//   const handleUpdate = async () => {
//     try {
//       const updatedImageUrl = await uploadImageToSupabase(
//         newImage,
//         editData.image_url
//       );

//       const updatedBlog = { ...editData, image_url: updatedImageUrl };

//       const res = await fetch("/api/dashboard", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedBlog),
//       });

//       if (res.ok) {
//         fetchBlogs(); // Refresh blog list after update
//         setIsEditOpen(false); // Close modal
//       } else {
//         const data = await res.json();
//         console.error("Error updating blog:", data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   return (
//     <>
//       <div onClick={() => setIsSidebarOpen((prev) => !prev)}>
//         <DashboardSidebar />
//       </div>

//       {/* BLOG LIST */}
//       <div
//         className={`container mx-auto p-4 transition-all ${
//           isSidebarOpen ? "w-[77%] ml-[23%]" : "w-[80%] ml-[20%]"
//         }`}
//       >
//         <h1 className="text-2xl font-bold mb-4">Your Blog Posts</h1>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="space-y-4">
//             {blogs.map((blog) => (
//               <div key={blog.id} className="border p-4 rounded-lg">
//                 <img
//                   src={blog.image_url ? blog.image_url : ""}
//                   alt="blog-image"
//                   className="w-full h-32 object-cover rounded-lg"
//                 />
//                 <h2 className="text-xl font-semibold">{blog.title}</h2>
//                 <p className="">{blog.summary}</p>
//                 <div className="mt-2 space-x-2">
//                   <Button variant="outline" onClick={() => openEditModal(blog)}>
//                     Edit
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     onClick={() => handleDelete(blog.id)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* EDIT MODAL */}
//       {isEditOpen && (
//         <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
//           <Card className="p-6 rounded-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Edit Blog Post</h2>
//             <Label htmlFor="title">Title</Label>
//             <input
//               type="text"
//               name="title"
//               value={editData.title}
//               onChange={handleEditChange}
//               className="w-full p-2 border rounded mb-2"
//               placeholder="Title"
//             />
//             <Label htmlFor="category">Category</Label>
//             <input
//               type="text"
//               name="category"
//               value={editData.category}
//               onChange={handleEditChange}
//               className="w-full p-2 border rounded mb-2"
//               placeholder="Category"
//             />
//             <Label htmlFor="summary">Summary</Label>
//             <textarea
//               name="summary"
//               value={editData.summary}
//               onChange={handleEditChange}
//               className="w-full p-2 border rounded mb-2"
//               placeholder="Summary"
//             />
//             <Label htmlFor="content">Content</Label>
//             <textarea
//               name="content"
//               value={editData.content}
//               onChange={handleEditChange}
//               className="w-full p-2 border rounded mb-2"
//               placeholder="Content"
//             />
//             <Label htmlFor="image">Image</Label>
//             <input type="file" onChange={handleImageChange} className="mb-2" />
//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={() => setIsEditOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleUpdate}>Save</Button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import { createClient } from "@supabase/supabase-js";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getUserProfile } from "@/lib/auth"; // Import getUserProfile

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPostsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null); // State to store user profile
    const [userId, setUserId] = useState(""); // State to store user ID
    const [error, setError] = useState(null); // State to store errors

    // Edit Modal States
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editData, setEditData] = useState({
        id: "",
        title: "",
        category: "",
        summary: "",
        content: "",
        image_url: "",
    });
    const [newImage, setNewImage] = useState(null);

    const fetchUserProfile = async () => {
        try {
            const profile = await getUserProfile();
            setUser(profile);
            setUserId(profile.id);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching user profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/dashboard/");
            const data = await res.json();
            // console.log("Fetched dashboard data:", data); // Log the fetched data

            if (userId && data.recentPosts) {
                const userBlogs = data.recentPosts.filter(post => post.user_id === userId);
                setBlogs(userBlogs);
                // console.log("Filtered blogs for user:", userBlogs); // Log filtered blogs
            } else {
                setBlogs([]); // Set blogs to empty array if no user or posts
                // console.log("No blogs for current user or no posts data.");
            }
        } catch (error) {
            setError(error);
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };


    // DELETE FUNCTION (Works as expected)
    const handleDelete = async (id) => {
        try {
            const confirmDelete = prompt(
                "Are you sure you want to delete this blog post? Type 'yes' to confirm."
            );
            if (confirmDelete === null || confirmDelete.toLowerCase() !== "yes") {
                return;
            }

            const res = await fetch("/api/dashboard", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (res.ok) {
                fetchBlogs();
            } else {
                const data = await res.json();
                console.error("Error deleting blog:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // OPEN EDIT MODAL
    const openEditModal = (blog) => {
        setEditData(blog); // Set blog data in state
        setNewImage(null); // Reset image selection
        setIsEditOpen(true); // Open modal
    };

    // HANDLE INPUT CHANGE
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // HANDLE IMAGE SELECTION
    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]); // Store selected file
    };

    // UPLOAD IMAGE TO SUPABASE
    const uploadImageToSupabase = async (file, oldImageUrl) => {
        if (!file) return oldImageUrl; // Keep old image if no new one

        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        // Convert file to Blob
        const fileBlob = new Blob([file], { type: file.type });

        // Upload new image
        const { data, error } = await supabase.storage
            .from("blog-images")
            .upload(filePath, fileBlob, { upsert: true });

        if (error) {
            console.error("Image upload error:", error);
            return oldImageUrl; // Keep old image if upload fails
        }

        // Get the new public URL
        const { data: publicURLData } = supabase.storage
            .from("blog-images")
            .getPublicUrl(filePath);

        const newImageUrl = publicURLData.publicUrl;

        // Delete old image from Supabase
        if (oldImageUrl) {
            const oldImagePath = oldImageUrl.split("/").pop(); // Extract filename
            await supabase.storage.from("blog-images").remove([`blogs/${oldImagePath}`]);
        }

        return newImageUrl;
    };

    // UPDATE FUNCTION
    const handleUpdate = async () => {
        try {
            const updatedImageUrl = await uploadImageToSupabase(
                newImage,
                editData.image_url
            );

            const updatedBlog = { ...editData, image_url: updatedImageUrl };

            const res = await fetch("/api/dashboard", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBlog),
            });

            if (res.ok) {
                fetchBlogs(); // Refresh blog list after update
                setIsEditOpen(false); // Close modal
            } else {
                const data = await res.json();
                console.error("Error updating blog:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchBlogs();
        }
    }, [userId]);


    return (
        <>
            <div onClick={() => setIsSidebarOpen((prev) => !prev)}>
                <DashboardSidebar />
            </div>

            {/* BLOG LIST */}
            <div
                className={`container mx-auto p-4 transition-all ${
                    isSidebarOpen ? "w-[77%] ml-[23%]" : "w-[80%] ml-[20%]"
                }`}
            >
                <h1 className="text-2xl font-bold mb-4">Your Blog Posts</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="space-y-4">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <div key={blog.id} className="border p-4 rounded-lg">
                                    <img
                                        src={blog.image_url ? blog.image_url : ""}
                                        alt="blog-image"
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <h2 className="text-xl font-semibold">{blog.title}</h2>
                                    <p className="">{blog.summary}</p>
                                    <div className="mt-2 space-x-2">
                                        <Button variant="outline" onClick={() => openEditModal(blog)}>
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(blog.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No blog posts found for the current user.</p>
                        )}
                    </div>
                )}
            </div>

            {/* EDIT MODAL */}
            {isEditOpen && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
                    <Card className="p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Blog Post</h2>
                        <Label htmlFor="title">Title</Label>
                        <input
                            type="text"
                            name="title"
                            value={editData.title}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Title"
                        />
                        <Label htmlFor="category">Category</Label>
                        <input
                            type="text"
                            name="category"
                            value={editData.category}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Category"
                        />
                        <Label htmlFor="summary">Summary</Label>
                        <textarea
                            name="summary"
                            value={editData.summary}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Summary"
                        />
                        <Label htmlFor="content">Content</Label>
                        <textarea
                            name="content"
                            value={editData.content}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Content"
                        />
                        <Label htmlFor="image">Image</Label>
                        <input type="file" onChange={handleImageChange} className="mb-2" />
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpdate}>Save</Button>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}