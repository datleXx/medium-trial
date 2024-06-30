import Link from "next/link";
import { db } from "~/db"


export default async function Home() {
  const posts = await db.article.findMany(); 

  const renderedPosts = posts.map((article) => {
    return (
      <Link
          key={article.id}
          href={'/posts/'+article.id}
          className="flex justify-between items-center p-2 border rounded">
        <div>{article.title}</div>
        <div>view</div>
      </Link>
    )
  })
  return (
      <div>
        <div className="flex m-5 justify-between items-center">
          <h1 className="text-xl font-bold">Posts</h1>
          <Link href='/snippets/new'
            className="border p-3 rounded-full">New</Link>
        </div>
        <div className="flex flex-col gap-3">Post content!</div>
      </div>
  )
}