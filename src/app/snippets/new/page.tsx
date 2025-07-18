"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { Plus, StepBack } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useActionState } from "react";
import * as action from "@/actions";

const Page = () => {
  const [formStateData, xyz] = useActionState(action.createSnipper, {
    message: "",
  });

  return (
    <div>
      <div className="flex justify-end">
        <Link href={"/"}>
          <Button variant={"ghost"} className="cursor-pointer">
            <StepBack />
            Go Back
          </Button>
        </Link>
      </div>
      <form action={xyz}>
        <div className="flex flex-col gap-3">
          <Label>Title</Label>
          <Input type="text" name="title" id="title" />
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <Label>Code</Label>
          <Textarea name="code" id="code" />
        </div>
        {formStateData.message && (
          <div className="my-2 p-2 border-2 rounded-md border-red-600 bg-red-500 text-white font-semibold">
            {formStateData.message}
          </div>
        )}
        <Button type="submit" className="my-4 w-full">
          <Plus /> Add
        </Button>
      </form>
    </div>
  );
};

export default Page;
