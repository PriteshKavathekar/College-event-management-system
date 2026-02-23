import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({
  title,
  links,
  HeaderComponent,
  FooterComponent,
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* FULL WIDTH HEADER */}
      {HeaderComponent && <HeaderComponent />}

      {/* BODY */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <Sidebar title={title} links={links} />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>

      {/* FULL WIDTH FOOTER */}
      {FooterComponent && <FooterComponent />}
    </div>
  );
}
