"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useGetUserDetailsQuery } from "@/redux/user-details/api";
import { createUserDetailSchema, CreateUserDetailSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUploadIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

export default function UserDetailsForm() {
  const { data: session } = useSession();
  const { data: userDetails } = useGetUserDetailsQuery(session?.user.id || "");

  const defaultValues = {
    userId: session?.user.id || "",
    phoneNumber: userDetails?.phoneNumber || "",
    profession: userDetails?.profession || "",
    resume: userDetails?.resume || "",
    linkedin: userDetails?.linkedin || "",
    github: userDetails?.github || "",
    twitter: userDetails?.twitter || "",
    youtube: userDetails?.youtube || "",
  };
  const form = useForm<CreateUserDetailSchema>({
    resolver: zodResolver(createUserDetailSchema),
    defaultValues,
  });

  const onDrop = (acceptedFiles: File[]) => {
    // Handle file upload logic here
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function onSubmit(values: CreateUserDetailSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h3 className="text-4xl">User Details</h3>

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full flex-col md:flex-row lg:gap-12">
                <div className="flex w-1/3 flex-col gap-1">
                  <FormLabel className="text-xl">Phone Number</FormLabel>
                  <FormDescription>Your phone number will not</FormDescription>
                </div>
                <div className="flex w-2/3">
                  <FormControl>
                    <Input
                      placeholder="xxx xxxx xxxx"
                      {...field}
                      className="w-fit min-w-[30vw]"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <Separator className="w-full" />

        <div className="flex flex-col gap-8">
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full flex-col md:flex-row lg:gap-12">
                  <div className="flex w-1/3 flex-col gap-1">
                    <FormLabel className="text-xl">Profession</FormLabel>
                    <FormDescription className="">
                      Your profession will be a short summary of your skills and
                      expertise.
                    </FormDescription>
                  </div>
                  <div className="flex w-2/3">
                    <FormControl>
                      <Textarea
                        placeholder="Your profession"
                        {...field}
                        className="w-fit min-w-[30vw]"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />

          {/* Resume */}
          <FormField
            control={form.control}
            name="resume"
            render={({}) => (
              <FormItem>
                <div className="flex w-full flex-col md:flex-row lg:gap-12">
                  <div className="flex w-1/3 flex-col gap-1">
                    <FormLabel className="text-xl">Resume</FormLabel>
                    <FormDescription className="">
                      Attach your resume to your profile.
                    </FormDescription>
                  </div>
                  <div className="flex w-2/3">
                    <div
                      {...getRootProps()}
                      className="flex w-full max-w-[30vw] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-4"
                    >
                      <CloudUploadIcon className="h-8 w-8" />
                      <input {...getInputProps()} />
                      <p className="w-2/3 text-center text-sm text-muted-foreground">
                        <span className="cursor-pointer font-bold underline">
                          Click to upload
                        </span>{" "}
                        or drag and drop your resume here (max size 10MB)
                      </p>
                    </div>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Separator className="w-full" />

        <div className="flex w-full flex-col gap-4 md:flex-row lg:gap-12">
          <h3 className="w-1/3 text-3xl">Social Links</h3>
          <div className="flex w-2/3 flex-col gap-4">
            {/* LinkedIn */}
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex max-w-[500px] rounded-lg border">
                      <div className="flex h-full w-fit items-center justify-center rounded-l-lg border-r bg-muted px-2 py-2 text-sm">
                        Linkedin.com/in/
                      </div>
                      <Input
                        placeholder="sakethrambilla"
                        {...field}
                        className="w-fit min-w-[30vw] border-none text-sm focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GitHub */}
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex max-w-[500px] rounded-lg border">
                      <div className="flex h-full w-fit items-center justify-center rounded-l-lg border-r bg-muted px-2 py-2 text-sm">
                        Github.com/
                      </div>
                      <Input
                        placeholder="sakethrambilla"
                        {...field}
                        className="w-fit min-w-[30vw] border-none text-sm focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Twitter */}
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex max-w-[500px] rounded-lg border">
                      <div className="flex h-full w-fit items-center justify-center rounded-l-lg border-r bg-muted px-2 py-2 text-sm">
                        X.com/
                      </div>
                      <Input
                        placeholder="sakethrambilla"
                        {...field}
                        className="w-fit min-w-[30vw] border-none text-sm focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* YouTube */}
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex max-w-[500px] rounded-lg border">
                      <div className="flex h-full w-fit items-center justify-center rounded-l-lg border-r bg-muted px-2 py-2 text-sm">
                        Youtube.com/@
                      </div>
                      <Input
                        placeholder="sakethrambilla"
                        {...field}
                        className="w-fit min-w-[30vw] border-none text-sm focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" size={"lg"}>
          Update
        </Button>
      </form>
    </Form>
  );
}
