import QuestionForm from "@/components/page/user/ask-anything/question-form";
import QuestionList from "@/components/page/user/ask-anything/question-list";

export default function AskMeAnythingPage() {
  return (
    <main className="flex h-full w-full flex-col items-start justify-start gap-4 p-2 md:p-4 lg:py-8 xl:gap-6">
      <h1 className="font-nippo text-2xl lg:text-4xl">Community Posts</h1>

      {/* Question Form */}
      <QuestionForm />

      {/* Question List */}
      <QuestionList />
    </main>
  );
}
