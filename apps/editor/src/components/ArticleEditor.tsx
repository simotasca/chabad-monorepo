"use client";

import { database as db } from "@chabad/types";
import { Database, Enums } from "@chabad/types/src/database";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dynamic from "next/dynamic";
import { FormEventHandler, Suspense, useEffect, useRef, useState } from "react";

const EditorComp = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});

interface Props {
  initArticle?: db.Tables<"articles">;
}

function ArticleEditor({ initArticle }: Props) {
  const editorReference = useRef<MDXEditorMethods>(null);
  const supabase = createClientComponentClient<Database>();

  const [ready, setReady] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const [title, setTitle] = useState(initArticle?.title);
  const [category, setCategory] = useState<
    Enums<"article_category"> | undefined
  >(initArticle?.category);

  const initEffect = async () => {
    const { data, error } = await supabase.rpc("enum_values", {
      name: "article_category",
    });
    if (error) throw new Error(error.message);
    setCategories(data);
    setReady(true);
  };

  useEffect(() => {
    initEffect();
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!editorReference.current) return;

    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("mdx", editorReference.current?.getMarkdown());

    console.log(formData);

    const data: any = {};
    formData.forEach((val, key) => {
      data[key] = val;
    });

    if (!data.title) {
      alert("Missing title!");
      return;
    }

    if (!category) {
      alert("Missing category!");
      return;
    }

    if (!Object.hasOwn(data, "mdx")) {
      alert("Missing body!");
      return;
    }

    if (initArticle) {
      // update
      supabase
        .from("articles")
        .update({
          ...initArticle,
          category,
          content: data.mdx,
          image: "https://picsum.photos/1200/800?c=" + Date.now(),
          title: data.title,
          preview:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium provident atque, vero sed et illo voluptatum est...",
        })
        .eq("id", initArticle.id)
        .then(({ error }) => {
          if (error) {
            alert(error.message);
          }
        });
    } else {
      supabase
        .from("articles")
        .insert({
          category: "torah",
          content: data.mdx,
          image: "https://picsum.photos/1200/800?c=" + Date.now(),
          title: data.title,
          preview:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium provident atque, vero sed et illo voluptatum est...",
        })
        .then(({ error }) => {
          if (error) {
            alert(error.message);
          }
        });
      // insert
    }
  };

  if(!ready) return <>Loading...</>

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Titolo</p>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <p>Category</p>
          <select
            name="category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as Enums<"article_category">)
            }>
            <option value={""}>---</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <Suspense fallback={<>Loading...</>}>
          <EditorComp
            editorRef={editorReference}
            markdown={initArticle?.content || "@ hello world"}
          />
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
