import EditSnipperForm from "@/components/EditSnipperForm";
import { prisma } from "@/lib/prisma";
import React from "react";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  if (!snippet) {
    return <div>Snippet not found.</div>;
  }
  return (
    <div>
      <EditSnipperForm snippet={snippet} />
    </div>
  );
};

export default Page;
