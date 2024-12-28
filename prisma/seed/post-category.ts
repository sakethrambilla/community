// or use a direct import of PrismaClient
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const postCategory = [
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

const seedPostCategory = async () => {
  const response = await prisma.postCategory.createMany({
    data: postCategory,
  });
  console.log(response);
};

seedPostCategory();
