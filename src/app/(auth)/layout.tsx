
import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-grid-pattern">
        <div className="absolute top-8 left-8">
        <Logo />
        </div>
        <div className="w-full max-w-md">
        {children}
        </div>
    </div>
  )
}
