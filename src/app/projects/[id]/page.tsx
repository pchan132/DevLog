import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      systems: true,
    },
  });

  if (!project) {
    notFound();
  }

  return <div></div>;
}
