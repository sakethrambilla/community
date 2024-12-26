import SignInWithEmail from "@/components/page/main/login/signin-with-email";
import SignInWithGithub from "@/components/page/main/login/signin-with-github";
import SignInWithGoogle from "@/components/page/main/login/signin-with-google";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex items-start justify-center gap-4 h-fit min-h-screen w-full px-8  py-28 overflow-hidden">
      {/* Image Placeholder */}
      <Image
        src="https://images.unsplash.com/photo-1634855105161-2f328c473638?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Login Placeholder"
        width={500}
        height={500}
        className="h-full hidden md:flex max-h-screen object-cover md:w-1/3 lg:w-1/2 rounded-2xl border-2 border-foreground"
      />

      {/* Login Form */}
      <div className="flex flex-col items-start justify-start lg:px-8 pt-8 lg:pt-24 w-full  gap-4 lg:gap-8 md:w-2/3 lg:w-1/2 h-full">
        <h3 className="md:text-lg lg:text-xl ">Login/Register to continue</h3>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-nippo">
          Join the community and start growing your career
        </h2>

        {/* Sign In With Google and Github */}
        <div className="flex w-full items-center gap-4 justify-between">
          <SignInWithGoogle />
          <SignInWithGithub />
        </div>

        <div className="flex w-full gap-4 items-center justify-center overflow-hidden">
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
