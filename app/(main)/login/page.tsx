import SignInWithEmail from "@/components/page/main/login/signin-with-email";
import SignInWithGithub from "@/components/page/main/login/signin-with-github";
import SignInWithGoogle from "@/components/page/main/login/signin-with-google";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex h-fit min-h-screen w-full items-start justify-center gap-4 overflow-hidden px-8 py-28">
      {/* Image Placeholder */}
      <Image
        src="https://images.unsplash.com/photo-1634855105161-2f328c473638?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Login Placeholder"
        width={500}
        height={500}
        className="hidden h-full max-h-screen rounded-2xl border-2 border-foreground object-cover md:flex md:w-1/3 lg:w-1/2"
      />

      {/* Login Form */}
      <div className="flex h-full w-full flex-col items-start justify-start gap-4 pt-8 md:w-2/3 lg:w-1/2 lg:gap-8 lg:px-8 lg:pt-16">
        <div className="flex flex-col gap-2">
          <h3 className="md:text-lg lg:text-xl">Login/Register to continue</h3>
          <h2 className="font-nippo text-5xl md:text-6xl lg:text-6xl">
            Join the community and start growing your career
          </h2>
        </div>

        {/* Sign In With Google and Github */}
        <div className="flex w-full items-center justify-between gap-4">
          <SignInWithGoogle />
          <SignInWithGithub />
        </div>

        <div className="flex w-full items-center justify-center gap-4 overflow-hidden">
          <Separator className="w-1/2" />
          <span className="font-nippo md:text-lg lg:text-xl">OR</span>
          <Separator className="w-1/2" />
        </div>

        {/* Sign in With Email Magic Link  */}
        <SignInWithEmail />
      </div>
    </main>
  );
}
