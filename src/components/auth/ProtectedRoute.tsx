import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export async function ProtectedRoute({ 
  children, 
  fallbackUrl = "/sign-in" 
}: ProtectedRouteProps) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect(fallbackUrl);
  }
  
  return <>{children}</>;
}
