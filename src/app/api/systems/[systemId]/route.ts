import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// READ one system
export async function GET(
  _: Request,
  { params }: { params: { systemId: string } }
) {
  const system = await prisma.system.findUnique({
    where: {
      id: params.systemId,
    },
    include: {
      notes: true,
    },
  });
  return NextResponse.json(system);
}

// Update system
export async function PUT(
  req: Request,
  { params }: { params: { systemId: string } }
) {
  try {
    const { title, description, flowData } = await req.json();
    const updatedSystem = await prisma.system.update({
      where: {
        id: params.systemId,
      },
      data: {
        title,
        description,
        flowData,
      },
    });

    return NextResponse.json(updatedSystem);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!", realError: error },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  _: Request,
  { params }: { params: { systemId: string } }
) {
  try {
    await prisma.system.delete({ where: { id: params.systemId } });
    return NextResponse.json({ message: "System deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!", realError: error },
      { status: 500 }
    );
  }
}
