import { createContext } from "react";
import { db } from "@/config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const UserDetailContext = createContext();

// Hàm này sẽ luôn lấy dữ liệu mới nhất từ Firestore
export const fetchUserFromDB = async (userEmail) => {
  if (!userEmail) return null;
  
  try {
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No user found with this email");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Hàm tạo phiên bản bảo mật của dữ liệu người dùng (không thể chỉnh sửa trực tiếp)
export const createSecureUserData = (userData) => {
  if (!userData) return null;
  
  // Tạo bản sao của dữ liệu người dùng để tránh tham chiếu trực tiếp
  const secureData = JSON.parse(JSON.stringify(userData));
  
  // Đảm bảo credits không bị âm nếu có sự can thiệp
  if (secureData.credits < 0) secureData.credits = 0;
  
  // Đảm bảo role không bị thay đổi nếu có sự can thiệp
  if (!['admin', 'member'].includes(secureData.role)) {
    secureData.role = 'member';
  }
  
  return Object.freeze(secureData); // Đóng băng đối tượng để không thể thay đổi
};