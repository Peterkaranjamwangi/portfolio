// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaGoogle,
//   FaLinkedin,
//   FaInstagram,
// } from "react-icons/fa";

// interface ProfileCardProps {
//   name: string;
//   title: string;
//   description: string;
//   imageUrl: string;
// }

// const ProfileCard: React.FC<ProfileCardProps> = ({
//   name,
//   title,
//   description,
//   imageUrl,
// }) => {
//   return (
//     <Card className="w-[360px] h-[400px] relative group overflow-hidden bg-black">
//       <div className="w-full h-full overflow-hidden">
//         <img
//           src={imageUrl}
//           alt={name}
//           className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-50 group-hover:translate-x-[30%]"
//         />
//       </div>
//       <CardContent className="absolute top-0 left-0 w-[70%] h-full bg-yellow-400 transition-all duration-500 origin-left transform perspective-2000 -rotate-y-90 group-hover:rotate-y-0">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-5 text-center bg-white">
//           <h1 className="text-xl font-bold text-red-500 uppercase">
//             {name}
//             <span className="block text-sm text-gray-800 normal-case">
//               {title}
//             </span>
//           </h1>
//           <p className="mt-2 text-sm text-gray-800">{description}</p>
//           <div className="flex justify-center mt-4 space-x-2">
//             {[FaFacebook, FaTwitter, FaGoogle, FaLinkedin, FaInstagram].map(
//               (Icon, index) => (
//                 <Button
//                   key={index}
//                   size="icon"
//                   variant="outline"
//                   className="w-8 h-8 p-0 bg-gray-800 text-white hover:bg-red-500"
//                 >
//                   <Icon className="w-4 h-4" />
//                 </Button>
//               )
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProfileCard;

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

interface ProfileCardProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  description,
  imageUrl,
}) => {
  return (
    <Card className="w-[360px] h-[400px] relative group overflow-hidden bg-black">
      <style jsx>{`
        .details {
          transition: 0.5s;
          transform-origin: left;
          transform: perspective(2000px) rotateY(-90deg);
        }
        .group:hover .details {
          transform: perspective(2000px) rotateY(0deg);
        }
      `}</style>
      <div className="w-full h-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-50 group-hover:translate-x-[30%]"
        />
      </div>
      <CardContent className="details absolute top-0 left-0 w-[70%] h-full bg-yellow-400">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-5 text-center bg-white">
          <h1 className="text-xl font-bold text-red-500 uppercase">
            {name}
            <span className="block text-sm text-gray-800 normal-case">
              {title}
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-800">{description}</p>
          <div className="flex justify-center mt-4 space-x-2">
            {[FaFacebook, FaTwitter, FaGoogle, FaLinkedin, FaInstagram].map(
              (Icon, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="outline"
                  className="w-8 h-8 p-0 bg-gray-800 text-white hover:bg-red-500"
                >
                  <Icon className="w-4 h-4" />
                </Button>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
