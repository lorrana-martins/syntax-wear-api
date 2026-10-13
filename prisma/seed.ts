import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL nao esta definida.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Camiseta Syntax Essential",
    slug: "camiseta-syntax-essential",
    description: "Camiseta de algodao com modelagem classica para o dia a dia.",
    price: 89.9,
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#171717" },
      { name: "Branco", hex: "#F5F5F5" },
    ],
    stock: 40,
  },
  {
    name: "Camiseta Oversized Code",
    slug: "camiseta-oversized-code",
    description: "Camiseta oversized de toque macio e caimento amplo.",
    price: 119.9,
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#171717" },
      { name: "Cinza", hex: "#777777" },
    ],
    stock: 28,
  },
  {
    name: "Moletom Syntax Hoodie",
    slug: "moletom-syntax-hoodie",
    description: "Moletom com capuz, bolso canguru e interior flanelado.",
    price: 229.9,
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#171717" },
      { name: "Verde", hex: "#405A46" },
    ],
    stock: 18,
  },
  {
    name: "Calca Cargo Utility",
    slug: "calca-cargo-utility",
    description: "Calca cargo de sarja com bolsos funcionais e ajuste confortavel.",
    price: 249.9,
    sizes: ["38", "40", "42", "44", "46"],
    colors: [
      { name: "Preto", hex: "#171717" },
      { name: "Areia", hex: "#C4B69C" },
    ],
    stock: 14,
  },
  {
    name: "Jaqueta Workwear",
    slug: "jaqueta-workwear",
    description: "Jaqueta resistente de inspiracao utilitaria com bolsos frontais.",
    price: 319.9,
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Caramelo", hex: "#9A6542" },
      { name: "Preto", hex: "#171717" },
    ],
    stock: 12,
  },
  {
    name: "Camisa Oxford Daily",
    slug: "camisa-oxford-daily",
    description: "Camisa Oxford versatil com fechamento por botoes.",
    price: 179.9,
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Azul", hex: "#526F91" },
      { name: "Branco", hex: "#F5F5F5" },
    ],
    stock: 20,
  },
  {
    name: "Bermuda Relaxed Fit",
    slug: "bermuda-relaxed-fit",
    description: "Bermuda de caimento relaxed com cintura ajustavel.",
    price: 139.9,
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#171717" },
      { name: "Azul marinho", hex: "#27364A" },
    ],
    stock: 24,
  },
  {
    name: "Regata Minimal",
    slug: "regata-minimal",
    description: "Regata leve de algodao com visual minimalista.",
    price: 69.9,
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Branco", hex: "#F5F5F5" },
      { name: "Verde", hex: "#405A46" },
    ],
    stock: 32,
  },
  {
    name: "Calca Jogger Tech",
    slug: "calca-jogger-tech",
    description: "Calca jogger leve com bolsos laterais e punhos elasticos.",
    price: 199.9,
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Grafite", hex: "#414141" },
      { name: "Preto", hex: "#171717" },
    ],
    stock: 16,
  },
  {
    name: "Bone Six Panel",
    slug: "bone-six-panel",
    description: "Bone de seis gomos com fecho ajustavel na parte traseira.",
    price: 79.9,
    sizes: ["Unico"],
    colors: [
      { name: "Preto", hex: "#171717" },
      { name: "Verde", hex: "#405A46" },
      { name: "Vinho", hex: "#713B45" },
    ],
    stock: 26,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      create: product,
      update: product,
    });
  }

  console.log(`${products.length} produtos inseridos ou atualizados.`);
}

main()
  .catch((error: unknown) => {
    console.error("Erro ao executar o seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });