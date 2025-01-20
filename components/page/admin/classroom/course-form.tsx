"use client";

import ImageUpload from "@/components/common/image-upload";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useGetCourseCategoryQuery } from "@/redux/features/shared/course-category/api";
import { CreateCourseSchema, createCourseSchema } from "@/schema/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccessType } from "@prisma/client";
import { useForm } from "react-hook-form";

const initialValues = {
  title: "",
  description: "",
  coverImage: "",
  categoryId: "",
  accessType: AccessType.FREE,
  published: false,
};

export default function CourseForm() {
  const { toast } = useToast();
  const { data: courseCategories } = useGetCourseCategoryQuery();

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: CreateCourseSchema) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <Input className="w-full" placeholder="Course Title" {...field} />
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <Textarea
              className="min-h-40 w-full"
              placeholder="Course Description"
              {...field}
            />
          )}
        />

        <div className="flex flex-row items-center justify-start gap-8">
          <div className="flex w-1/2 flex-col gap-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex w-fit flex-wrap items-center gap-4 px-4">
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-fit gap-4 px-4">
                      <SelectValue
                        className="text-sm lg:text-base"
                        placeholder="Select Category"
                      />
                    </SelectTrigger>
                    <SelectContent className="">
                      {courseCategories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accessType"
              render={({ field }) => (
                <FormItem className="flex w-fit flex-wrap items-center gap-4 px-4">
                  <FormLabel>Access Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-fit gap-4 px-4">
                      <SelectValue
                        className="text-sm lg:text-base"
                        placeholder="Select Access Type"
                      />
                    </SelectTrigger>
                    <SelectContent className="">
                      {Object.values(AccessType).map((accessType) => (
                        <SelectItem key={accessType} value={accessType}>
                          {accessType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex w-fit flex-wrap items-center gap-4 px-4">
                  <FormLabel>Published</FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={cn(
                      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary",
                    )}
                  />
                </FormItem>
              )}
            />
          </div>
          {/* Image Upload   */}

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem className="flex w-1/2 flex-wrap items-center gap-2 px-4">
                <FormLabel>Cover Image</FormLabel>
                <ImageUpload onChange={field.onChange} value={field.value} />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-fit">
          Create Course
        </Button>
      </form>
    </Form>
  );
}
