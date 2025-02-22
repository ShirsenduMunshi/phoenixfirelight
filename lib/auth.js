import { supabase } from "./supabase";

// Upload profile image function
const uploadProfileImage = async (file, userId) => {
    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`profile_${userId}`, file, {
            cacheControl: "3600",
            upsert: true,
        });

    if (error) throw error;

    // Get the public URL of the uploaded image
    const { data: publicURL } = supabase.storage.from("avatars").getPublicUrl(data.path);
    return publicURL.publicUrl;
};

// Sign up function
export const signUp = async (email, password, name, file) => {
    // Create user in authentication
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) throw authError;

    const user = authData.user;

    // Upload profile photo
    let avatarUrl = "";
    if (file) {
        avatarUrl = await uploadProfileImage(file, user.id);
    }

    // Save name and avatar URL in "profiles" table
    const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: user.id, email, name, avatar_url: avatarUrl }]);

    if (profileError) throw profileError;

    return authData;
};


export const getUserProfile = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.user.id)
        .single();

    if (error) throw error;
    return profile;
};

// Log out function
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    localStorage.clear();
    if (error) throw error;
};

// Log in function
export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
};

export const updateUserProfile = async (userId, name, email, file) => {
    // Upload new profile photo if provided
    let avatarUrl = "";
    if (file) {
        avatarUrl = await uploadProfileImage(file, userId);
    }

    // Update profile in profiles table
    const { data, error } = await supabase
        .from("profiles")
        .update({ 
            name,
            email,
            ...(avatarUrl && { avatar_url: avatarUrl })
        })
        .eq("id", userId);

    if (error) throw error;
    return data;
};