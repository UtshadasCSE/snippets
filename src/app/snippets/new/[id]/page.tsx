import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Delete, Edit, SkipBack } from "lucide-react";
import React from "react";
import Link from "next/link";
import { deleteSnippet } from "@/actions";
import NotFound from "../not-found";

type snippetDetailsProps = {
  params: Promise<{ id: string }>;
};

const Page: React.FC<snippetDetailsProps> = async ({ params }) => {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  if (!snippet) {
    return <NotFound />;
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold uppercase tracking-widest">
          {snippet.title}
        </h1>
        <div className="flex gap-2">
          <Link href={`/snippets/new/${snippet.id}/edit`}>
            <Button className="cursor-pointer">
              <Edit />
              Edit
            </Button>
          </Link>
          <form action={deleteSnippetAction}>
            <Button variant={"destructive"} className="cursor-pointer">
              <Delete />
              Delete
            </Button>
          </form>
        </div>
      </div>
      <div className="py-3">
        <pre className="p-3 bg-gray-100 rounded-sm ">
          <code>{snippet?.code}</code>
        </pre>
      </div>
      <Link href={"/"}>
        <Button className="w-full cursor-pointer">
          <SkipBack />
          Go Back
        </Button>
      </Link>
    </div>
  );
};

export default Page;
