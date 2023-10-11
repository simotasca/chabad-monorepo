"use client";

import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { FormEventHandler, Suspense, useRef } from "react";

const EditorComp = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});

const initialMarkdown = `
# Hello world!
lorem ipsum

## liste:

- uno
- due
- tre
`;

function ArticleEditor() {
  const editorReference = useRef<MDXEditorMethods>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!editorReference.current) return;

    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("mdx", editorReference.current?.getMarkdown());

    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Titolo</p>
          <input type="text" name="title" />
        </label>

        <Suspense fallback={<>Loading...</>}>
          <EditorComp editorRef={editorReference} markdown={initialMarkdown} />
        </Suspense>

        <button
          className="fixed bottom-8 right-8 bg-red-600 text-white px-4 text-lg font-bold aspect-square w-fit rounded-full cursor-pointer"
          type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
}

export default ArticleEditor;
