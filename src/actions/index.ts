"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const saveSnippet = async (id: number, code: string) => {
  await prisma.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  redirect(`/snippets/new/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await prisma.snippet.delete({
    where: {
      id,
    },
  });
  redirect("/");
};

export async function createSnipper(
  prevState: { message: string },
  formData: FormData
) {
  const title = formData.get("title");
  const code = formData.get("code");
  if (typeof title !== "string" || title.length <= 4) {
    return { message: "Title must be string and more longer" };
  }
  if (typeof code !== "string" || code.length <= 4) {
    return { message: "Code must be sting and more longer" };
  }

  const snippet = await prisma.snippet.create({
    data: {
      title,
      code,
    },
  });

  console.log(snippet);
  redirect("/");
}
