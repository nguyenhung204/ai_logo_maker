"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../../_context/UserDetailContext";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { db } from "@/config/FirebaseConfig";
import { useRouter } from "next/navigation";

function LogoList() {
  const { userDetail } = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    userDetail && GetUserLogos();
  }, [userDetail]);

  const GetUserLogos = async () => {
    const querySnapShot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    );
    setLogoList([]);
    querySnapShot.forEach((doc) => {
      setLogoList((prev) => [...prev, doc.data()]);
    });
  };

  const ViewLogo = (image) => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src = "${image}" alt ="Base64 Image"/>`);
  };

  const downloadImage = (imageUrl, title) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    
    // Limit title length for download filename
    let downloadName = title || "logo";
    
    // If title is too long, use only the first 2-3 words
    if (title && title.length > 20) {
      const words = title.split(' ');
      // Take first 2 words if available, or just the first word if only one exists
      downloadName = words.slice(0, Math.min(3, words.length)).join('_');
    }
    
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditLogo = (imageBase64) => {
    localStorage.setItem("editImage", imageBase64);
    router.push("/tools/edit");
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {logoList.length > 0
          ? logoList.map((logo, index) => (
              <div
                key={index}
                className="hover:scale-105 transition-all cursor-pointer"
              >
                <Image
                  src={logo?.image}
                  alt={logo?.title}
                  width={400}
                  height={200}
                  className="w-full rounded-xl shadow-lg mb-4"
                  onClick={() => ViewLogo(logo?.image)}
                />
                <h2 className="text-center text-lg font-medium mt-2 truncate mx-2" title={logo?.title}>
                  {logo?.title}
                </h2>
                <p className="text-sm text-gray-500 text-center truncate mx-auto px-2" title={logo?.desc}>
                  {logo?.desc}
                </p>

                <div className="flex flex-col space-y-4 my-2">
                  <button
                    onClick={() => downloadImage(logo?.image, logo?.title)}
                    className="text-sm text-white bg-primary px-3 rounded-lg py-2 w-2/3 mx-auto"
                  >
                    Download
                  </button>

                  <button
                    onClick={() => handleEditLogo(logo?.image)}
                    className="text-sm text-white bg-blue-500 px-3 rounded-lg py-2 w-2/3 mx-auto"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 animate-pulse rounded-xl w-full h-[200px]"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default LogoList;
