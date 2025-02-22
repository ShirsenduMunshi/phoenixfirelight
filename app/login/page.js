"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            await signIn(email, password);
            router.push("/dashboard");
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-fit mt-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="p-6 rounded shadow-md w-full max-w-sm" id="login-form">
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mb-4" />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mb-4" />
                <Button type="submit" className="w-full">{loading ? "...." : "Login"}</Button>
            </form>
            <p className="mt-4">Don't have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link></p>
        </div>
    );
}