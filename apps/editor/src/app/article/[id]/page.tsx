import ArticleEditor from "@/components/ArticleEditor";
import { database as db } from "@chabad/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function Page({ params }: { params: { id: string } }) {
  const articleId = params.id;
  const supabase = createServerComponentClient<db.Database>({ cookies });

  let article: db.Tables<"articles"> | undefined;

  if (articleId !== "new") {
    await supabase
      .from("articles")
      .select()
      .eq("id", articleId)
      .single()
      .then(({ data, error }) => {
        if (error) throw new Error(error.message);
        article = data;
      });
  }

  

  return (
    <>
      <ArticleEditor initArticle={article} />
    </>
  );
}

export default Page;
