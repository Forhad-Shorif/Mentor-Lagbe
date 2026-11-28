import Navbar from "@/components/SheareHome/Navbar";
import Footer from "@/components/SheareHome/Footer/Footer";

// (home) route group: sudhu home/marketing page gulor jonno.
// Dashboard/Auth page e ei layout apply hobe na, tai navbar o dekhbe na.
//
// NOTE: <html> ar <body> shudhu root layout (src/app/layout.tsx) e thake.
// Ei layout e abar <html>/<body> dile nested html hoye hydration error dey.
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
