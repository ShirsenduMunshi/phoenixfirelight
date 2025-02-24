import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';


export async function GET(req) {
  const url = new URL(req.url);
  
  // Handle /api/dashboard/user-blogs endpoint
  if (url.pathname === '/api/dashboard/') { {/* user-blogs */}
    try {
      const { data: { user } } = await supabase.auth.getUser(); 
      console.log("User Data:", user); // Force log user object     
      if (!user) throw new Error('Not authenticated');
      
      const { data: blogs } = await supabase
      .from('blogs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
      // console.log('blogs', blogs);
      return Response.json(blogs);
    } catch (error) {
      return Response.json(
        { error: 'Failed to fetch user blogs' },
        { status: 500 }
      );
    }
  }

  try {
    // Fetch total posts count
    const { count: totalPosts } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true });

    // Fetch active users count
    const { count: activeUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Fetch recent posts
    const { data: recentPosts } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    return Response.json({
      totalPosts,
      activeUsers,
      recentPosts
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json(); // Get blog ID from request body

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    // Fetch the blog to get the image URL before deletion
    const { data: blog, error: fetchError } = await supabase
      .from("blogs")
      .select("image_url")
      .eq("id", id)
      .single();

    if (fetchError || !blog) {
      return NextResponse.json({ error: "Blog not found!" }, { status: 400 });
    }

    // Extract filename from image_url
    const imageUrl = blog.image_url;
    if (imageUrl) {
      const imageName = imageUrl.split("/").pop(); // Get file name

      // Delete the image from Supabase Storage
      const { error: deleteError } = await supabase
        .storage
        .from("blog-images") // Ensure this matches your bucket name
        .remove([imageName]);

      if (deleteError) {
        console.error("Image delete error:", deleteError);
      }
    }

    // Delete the blog from Supabase
    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function PATCH(req) {
//   try {
//     const { id, title, summary, image_url } = await req.json(); // Get updated fields

//     if (!id) {
//       return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
//     }

//     // Fetch the existing blog to get the old image URL
//     const { data: blog, error: fetchError } = await supabase
//       .from("blogs")
//       .select("image_url")
//       .eq("id", id)
//       .single();

//     if (fetchError || !blog) {
//       return NextResponse.json({ error: "Blog not found!" }, { status: 400 });
//     }

//     const oldImageUrl = blog.image_url;

//     // Delete old image if it exists and a new image is provided
//     if (oldImageUrl && image_url !== oldImageUrl) {
//       const oldImageName = oldImageUrl.split("/").pop(); // Extract old image filename

//       const { error: deleteError } = await supabase
//         .storage
//         .from("blog-images") // Ensure this matches your bucket name
//         .remove([oldImageName]);

//       if (deleteError) {
//         console.error("Old image delete error:", deleteError);
//       }
//     }

//     // Update the blog with new data
//     const { error } = await supabase
//       .from("blogs")
//       .update({ title, summary, image_url })
//       .eq("id", id);

//     if (error) {
//       throw error;
//     }

//     return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function PATCH(req) {
  try {
    const { id, title, category, summary, body, image_url } = await req.json(); // Get updated fields

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    // Fetch the existing blog to get the old image URL
    const { data: blog, error: fetchError } = await supabase
      .from("blogs")
      .select("image_url")
      .eq("id", id)
      .single();

    if (fetchError || !blog) {
      return NextResponse.json({ error: "Blog not found!" }, { status: 400 });
    }

    const oldImageUrl = blog.image_url;

    // Update the blog with new data first
    const { error: updateError } = await supabase
      .from("blogs")
      .update({ title, category, summary, body, image_url })
      .eq("id", id);

    if (updateError) {
      throw updateError;
    }

    // Only delete the old image if it's different from the new one
    if (oldImageUrl && image_url !== oldImageUrl) {
      const oldImageName = oldImageUrl.split("/").pop(); // Extract old image filename

      const { error: deleteError } = await supabase
        .storage
        .from("blog-images") // Ensure this matches your bucket name
        .remove([oldImageName]);

      if (deleteError) {
        console.error("Old image delete error:", deleteError);
      }
    }

    return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}