"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getUserProfile } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const AdminPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  // Fetch blogs from Supabase
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const profile = await getUserProfile();
      setUser(profile);
      setUserId(profile.id);
      // console.log("Fetched user profile:", profile); // Log the fetched user profile
      console.log("User ID:", profile.id); // Log the fetched user profile
    } catch (err) {
      setError(err.message);
      console.error("Error fetching user profile:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userId) {
      // Ensure userId is available before fetching blogs
      fetchBlogs();
    }
  }, [userId]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/dashboard/");
      const data = await res.json();
      console.log("Fetched dashboard data:", data);
      console.log("Fetched dashboard data recentPosts:", data.recentPosts);

      if (userId && data.recentPosts) {
        const userBlogs = data.recentPosts.filter(
          (post) => post.user_id === userId
        );
        console.log("Filtered blogs for user:", userBlogs);
        setBlogs(userBlogs);
      } else {
        setBlogs([]);
        console.log("No blogs for current user or no posts data.");
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh blogs after update
  const refreshBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("blogs").select("*");

    if (!error) setBlogs(data);
    setLoading(false);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Blog Posts</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && blogs.length === 0 && <p>No blogs found.</p>}

      <div className="grid gap-4">
        {blogs.map((blog, index) => (
          <div
            key={blog.id || index}
            className="p-4 border rounded-md shadow-md"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-sm ">{blog.category}</p>
            <p>{blog.summary}</p>

            <Button
              className="mt-2 px-4 py-2 rounded"
              onClick={() => setSelectedBlog(blog)}
            >
              Edit
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(blog.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          onUpdate={refreshBlogs}
        />
      )}
    </div>
  );
};

// 📌 Edit Blog Modal (Inside the same file)

const EditBlogModal = ({ blog, onClose, onUpdate }) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [category, setCategory] = useState(blog?.category || "");
  const [summary, setSummary] = useState(blog?.summary || "");
  const [body, setBody] = useState(blog?.body || "");
  const [imageUrl, setImageUrl] = useState(blog?.image_url || ""); // Existing image URL
  const [newImage, setNewImage] = useState(null); // New image file
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isBodyChanged, setIsBodyChanged] = useState(false); // Track changes

  // Detect changes in body
  useEffect(() => {
    setIsBodyChanged(body !== blog?.body);
  }, [body]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImageUrl(URL.createObjectURL(file)); // Preview new image
    }
  };

  //   const handleUpdate = async () => {
  //     setLoading(true);
  //     setError("");

  //     try {
  //       if (!blog?.id) {
  //         setError("Blog ID is missing.");
  //         return;
  //       }

  //       let updatedImageUrl = imageUrl; // Keep the old image unless a new one is uploaded

  //       if (newImage) {
  //         // Delete the old image from Supabase if it exists
  //         if (blog?.image_url) {
  //           // Extract relative path after '/storage/v1/object/public/blog-images/'
  //           const basePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/`;
  //           const oldImagePath = blog.image_url.replace(basePath, ""); // Remove base URL

  //           if (oldImagePath) {
  //             const { error: deleteError } = await supabase.storage
  //               .from("blog-images")
  //               .remove([oldImagePath]);
  //             if (deleteError)
  //               console.error("Error deleting old image:", deleteError.message);
  //             else console.log("Old image deleted successfully:", oldImagePath);
  //           }
  //         }

  //         // Upload new image
  //         const { data, error: uploadError } = await supabase.storage
  //           .from("blog-images")
  //           .upload(`blog_${blog.id}_${Date.now()}`, newImage);

  //         if (uploadError) throw uploadError;

  //         // Get new image URL
  //         const { data: publicUrl } = supabase.storage
  //           .from("blog-images")
  //           .getPublicUrl(data.path);

  //         updatedImageUrl = publicUrl.publicUrl;
  //       }

  //       // Update blog with new image URL (if changed)
  //       const { error } = await supabase
  //         .from("blogs")
  //         .update({
  //           title,
  //           category,
  //           summary,
  //           body: body,
  //           image_url: updatedImageUrl,
  //         })
  //         .eq("id", blog.id);

  //       if (error) throw error;

  //       onUpdate();
  //       onClose();
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleUpdate = async () => {
    setLoading(true);
    setError("");

    try {
      if (!blog?.id) {
        setError("Blog ID is missing.");
        return;
      }

      let updatedImageUrl = imageUrl;

      if (newImage) {
        if (blog?.image_url) {
          const basePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/`;
          const oldImagePath = blog.image_url.replace(basePath, "");

          if (oldImagePath) {
            const { error: deleteError } = await supabase.storage
              .from("blog-images")
              .remove([oldImagePath]);

            if (deleteError)
              console.error("Error deleting old image:", deleteError.message);
            else console.log("Old image deleted successfully:", oldImagePath);
          }
        }

        const { data, error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(`blog_${blog.id}_${Date.now()}`, newImage);

        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage
          .from("blog-images")
          .getPublicUrl(data.path);

        updatedImageUrl = publicUrl.publicUrl;
      }

      // Construct update payload dynamically
      const updatePayload = {
        title,
        category,
        summary,
        image_url: updatedImageUrl,
      };

      if (isBodyChanged) {
        updatePayload.body = body; // Update only if the user modified the body
      }

      // Update blog in Supabase
      const { error } = await supabase
        .from("blogs")
        .update(updatePayload)
        .eq("id", blog.id);

      if (error) throw error;

      onUpdate();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Card className="p-6 rounded-lg shadow-lg w-96 h-[600px] overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
        {error && <p className="text-red-500">{error}</p>}

        {/* Image Preview */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Blog Preview"
            className="w-full h-32 object-cover rounded-md mb-2"
          />
        )}

        <Label htmlFor="image">Upload New Image (Optional)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />

        <Label htmlFor="title">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2"
        />

        <Label htmlFor="category">Category</Label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-2"
        />

        <Label htmlFor="summary">Summary</Label>
        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full mb-2"
        ></Textarea>

        <Label htmlFor="body">Content</Label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full mb-2"
        ></Textarea>

        <div className="flex justify-end space-x-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminPosts;
