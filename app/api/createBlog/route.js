import { supabase } from "@/lib/supabase";

// export async function POST(req) {
//   try {
//     const fromBody = await req.json();
//     const { title, category, summary, author, body, imageFile } = fromBody;

//     if (!title || !category || !summary || !author || !imageFile || !body) {
//       return Response.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Convert base64 to file buffer
//     const fileBuffer = Buffer.from(imageFile.split(",")[1], "base64");

//     // Unique file name
//     const fileName = `blog_${Date.now()}.jpg`;

//     // Upload image to Supabase Storage
//     const { data: imageData, error: uploadError } = await supabase.storage
//       .from("blog-images")
//       .upload(fileName, fileBuffer, { contentType: "image/jpeg" });

//     if (uploadError) throw uploadError;

//     // Get the public URL of the uploaded image
//     const imageUrl = supabase.storage.from('blog-images').getPublicUrl(fileName);
//         // console.log('Fixed Image URL:', imageUrl);

//     // Insert blog data into Supabase DB
//     const { data, error: insertError } = await supabase
//       .from("blogs")
//       .insert([
//         { title, category, summary, author, body, image_url: imageUrl },
//       ]);

//     if (insertError) throw insertError;

//     return Response.json(
//       { message: "Blog created successfully", blog: data },
//       { status: 201 }
//     );
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

export async function POST(req) {
  try {
    const fromBody = await req.json();
    const { title, category, summary, body, imageFile, userId } = fromBody;

    if (!title || !category || !summary || !imageFile || !body || !userId) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert base64 to file buffer
    const fileBuffer = Buffer.from(imageFile.split(",")[1], "base64");

    // Unique file name
    const fileName = `blog_${Date.now()}.jpg`;

    // Upload image to Supabase Storage
    const { data: imageData, error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(fileName, fileBuffer, { contentType: "image/jpeg" });

    if (uploadError) throw uploadError;

    // Get the public URL of the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    // Insert blog data into Supabase DB
    const { data, error: insertError } = await supabase
      .from("blogs")
      .insert([
        { 
          title, 
          category, 
          summary, 
          body, 
          image_url: publicUrl,
          user_id: userId 
        },
      ]);

    if (insertError) throw insertError;

    return Response.json(
      { message: "Blog created successfully", blog: data },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
