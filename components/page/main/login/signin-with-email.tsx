"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, EmailSchema } from "@/schema";
import { useForm } from "react-hook-form";
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

export default function SignInWithEmail() {
  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: EmailSchema) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-xl">Email</FormLabel>
              <FormControl>
                <Input
                  className="w-full md:text-lg px-4 py-3 "
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm">
                Enter your email to login or register
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size={"lg"}
          type="submit"
          className="w-1/2 py-6 lg:py-7  lg:text-lg"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
