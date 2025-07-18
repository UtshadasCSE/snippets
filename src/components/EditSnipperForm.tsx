"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import type { Snippet } from "@/generated/prisma";
import { Button } from "./ui/button";
import { SkipBack, Upload } from "lucide-react";
import Link from "next/link";
import { saveSnippet, deleteSnippet } from "@/actions";
import toast from "react-hot-toast";

const EditSnipperForm = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState(snippet.code);

  const chnageEventHandler = (value: string = "") => {
    toast.success("Successfully updated!");
    setCode(value);
  };

  const saveSnippetAction = saveSnippet.bind(null, snippet.id, code);


  return (
    <div>
      <div className="flex justify-between items-center py-2">
        <h2 className="font-semibold text-lg uppercase tracking-widest">
          Your code editor
        </h2>
        <form action={saveSnippetAction}>
          <Button type="submit" className="cursor-pointer">
            <Upload />
            Update
          </Button>
        </form>
      </div>
      <div>
        <Editor
          height="35vh"
          defaultLanguage="javascript"
          theme="vs-dark"
          defaultValue={code}
          onChange={chnageEventHandler}
        />
      </div>
      <div className="py-3">
        <Link href={"/"}>
          <Button className="w-full cursor-pointer">
            <SkipBack />
            Go back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditSnipperForm;
