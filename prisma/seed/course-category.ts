import { prisma } from "@/lib/db";

const courseCategory = [
  {
    name: "Frontend Development",
    slug: "frontend-development",
  },
  {
    name: "Backend Development",
    slug: "backend-development",
  },
  {
    name: "Fullstack Development",
    slug: "fullstack-development",
  },
  {
    name: "DevOps",
    slug: "devops",
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
  },
  {
    name: "Data Science",
    slug: "data-science",
  },
  {
    name: "AI",
    slug: "ai",
  },
  {
    name: "Deep Learning",
    slug: "deep-learning",
  },
  {
    name: "Computer Vision",
    slug: "computer-vision",
  },
  {
    name: "Natural Language Processing",
    slug: "natural-language-processing",
  },
  {
    name: "Blockchain",
    slug: "blockchain",
  },
];

const seedCourseCategory = async () => {
  const response = await prisma.courseCategory.createMany({
    data: courseCategory,
  });
  console.log(response);
};

seedCourseCategory();
