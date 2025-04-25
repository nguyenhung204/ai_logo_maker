import FloatingBubblesLayer from "./_components/FloatingBubblesLayer";
import { Footer } from "./_components/Footer";
import Header from "./_components/Header";

// app/(main)/layout.jsx
export default function MainLayout({ children }) {
  return (
    <>
      <FloatingBubblesLayer />
      <Header />
      <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 my-12">{children}</div>
      <Footer />
    </>
  );
}
