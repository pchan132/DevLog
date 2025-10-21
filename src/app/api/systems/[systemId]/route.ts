import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// READ one system
export async function GET(
  _: Request,
  { params }: { params: { systemId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const system = await prisma.system.findFirst({
      where: {
        id: params.systemId,
        project: {
          userId: session.user.id,
        },
      },
      include: {
        notes: true,
      },
    });

    if (!system) {
      return NextResponse.json({ error: "System not found" }, { status: 404 });
    }

    return NextResponse.json(system);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error to fetch One system",
      },
      {
        status: 500,
      }
    );
  }
}

// Update system
export async function PUT(
  req: Request,
  { params }: { params: { systemId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ตรวจสอบว่าผู้ใช้เป็นเจ้าของ system หรือไม่
    const system = await prisma.system.findFirst({
      where: {
        id: params.systemId,
        project: {
          userId: session.user.id,
        },
      },
    });

    if (!system) {
      return NextResponse.json({ error: "System not found" }, { status: 404 });
    }

    const { title, description, status, flowData } = await req.json();
    const updatedSystem = await prisma.system.update({
      where: {
        id: params.systemId,
      },
      data: {
        title,
        description,
        status,
        flowData,
      },
    });

    return NextResponse.json(updatedSystem);
  } catch (error) {
    return NextResponse.json(
      { error: "Error to Update system", detail: error },
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
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ตรวจสอบว่าผู้ใช้เป็นเจ้าของ system หรือไม่
    const system = await prisma.system.findFirst({
      where: {
        id: params.systemId,
        project: {
          userId: session.user.id,
        },
      },
    });

    if (!system) {
      return NextResponse.json({ error: "System not found" }, { status: 404 });
    }

    await prisma.system.delete({ where: { id: params.systemId } });
    return NextResponse.json({ message: "System deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error to Delete system", detail: error },
      { status: 500 }
    );
  }
}
