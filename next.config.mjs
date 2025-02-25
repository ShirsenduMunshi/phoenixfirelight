/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Supabase storage uses HTTPS
        hostname: 'xrphzaqjvmvjzxsgtmcl.supabase.co',
        port: '',
        pathname: '**', // Allows all paths within the domain
      },
    ],
  },
};

export default nextConfig;