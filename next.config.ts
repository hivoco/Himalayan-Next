import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
        remotePatterns: [
          {
            protocol: 'https', // or 'http' if applicable
            hostname: 'qcbucket-971565583415-ap-south-1.s3.ap-south-1.amazonaws.com', // Replace with the actual domain of your images
           
    
          },
      
        ],
      },
};

export default nextConfig;
