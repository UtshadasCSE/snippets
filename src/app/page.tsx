import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="p-2">
      <h1 className="font-bold text-4xl">Home</h1>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-medium tracking-[0.3rem] -mt-4">
          EZYSnippets
        </h1>
        <Link href={"/snippets/new"}>
          <Button className="cursor-pointer">New</Button>
        </Link>
      </div>
      <div className="grid gap-1 py-4">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="flex justify-between bg-gray-300 gap-1 p-2 rounded-sm items-center"
          >
            <h1>{snippet.title}</h1>
            <Link href={`/snippets/new/${snippet.id}`}>
              <Button variant={"link"} className="cursor-pointer">
                View
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
