//create a get method that will take id from the context, search for the id from prisma if found return the
// data record.

import { PrismaClient } from "@prisma/client";

export async function GET(request: Request, context: any) {
  const { id } = context.params;

  const prisma = new PrismaClient();

  const person = await prisma.person.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!person) {
    return new Response("Not found", {
      status: 404,
    })
  }
  return new Response(JSON.stringify(person),{
    status: 200,
    headers: {
        'Content-Type': 'application/json',
    },
  })
}

export async function PUT(request: Request, context: any) {
  const { id } = context.params;

  // Parse the request body as JSON
  const body = await request.json();

  const prisma = new PrismaClient();

  try {
    // Use Prisma to update the person record
    const updatedPerson = await prisma.person.update({
      where: {
        id: parseInt(id),
      },
      data: {
        // Specify the fields you want to update from the request body
        firstname: body.firstname,
        lastname: body.lastname,
        phone: body.phone,
      },
    });

    return new Response(JSON.stringify(updatedPerson), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating person:", error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  } finally {
    // Close the Prisma client to release the connection
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request, context: any) {
  const { id } = context.params;

  const prisma = new PrismaClient();

  try {
    // Use Prisma to delete the person record
    const deletedPerson = await prisma.person.delete({
      where: {
        id: parseInt(id),
      },
    });

    return new Response(JSON.stringify(deletedPerson), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting person:", error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  } finally {
    // Close the Prisma client to release the connection
    await prisma.$disconnect();
  }
}

