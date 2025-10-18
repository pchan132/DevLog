import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ModeToggle } from "@/components/ui/mode-toggle";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col w-full">
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
              <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6 ">
                <SidebarTrigger />
                <ModeToggle />
              </div>
            </header>
            <main className="flex-1 p-4">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
