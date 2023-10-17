import { Database } from "@chabad/types/src/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies: cookies });

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title");

  if (error) throw new Error(error.message);

  return (
    <>
      <a href="/article/new">
        <button className="cursor-pointer text-lg font-bold px-2 mb-4 rounded border border-green-900 text-white bg-green-700">
          new
        </button>
      </a>
      <div className="bg-neutral-600 w-fit">
        <div className="grid grid-cols-[auto_1fr]  p-px [&_[data-cell]]:bg-white gap-px [&_[data-cell]]:p-4">
          {articles.map((a) => (
            <a href={`/article/${a.id}`} className="contents">
              <div data-cell>{a.id}</div>
              <div data-cell>{a.title}</div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
