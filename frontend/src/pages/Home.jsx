import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import NewsGrid from "@/components/NewsGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 container mx-auto px-4 py-6 gap-4">
        {/* Sidebar Izquierdo */}
        <div className="w-1/4 hidden lg:block">
          <SidebarLeft />
        </div>

        {/* Contenido Central */}
        <main className="w-full lg:w-1/2">
          <NewsGrid />
        </main>

        {/* Sidebar Derecho */}
        <div className="w-1/4 hidden lg:block">
          <SidebarRight />
        </div>
      </div>

      <Footer />
    </div>
  );
}
