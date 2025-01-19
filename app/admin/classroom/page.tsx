import CourseForm from "@/components/page/admin/classroom/course-form";
import CourseList from "@/components/page/admin/classroom/course-list";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ClassroomPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-8 p-8">
      <h1 className="text-3xl">Classroom</h1>
      {/* Course Form */}
      <Dialog>
        <DialogTrigger className="flex h-24 w-64 items-center justify-center rounded-xl bg-primary text-white">
          Create Course
        </DialogTrigger>
        <DialogContent className="min-w-[60vw]">
          <DialogTitle>Create Course</DialogTitle>
          <CourseForm />
        </DialogContent>
      </Dialog>

      {/* Course List */}
      <CourseList />
    </main>
  );
}
