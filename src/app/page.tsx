import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  let user = null;
  let posts: any[] = [];
  let dbUserId = null;

  try {
    user = await currentUser();
  } catch (err) {
    console.error("Error fetching currentUser:", err);
  }

  try {
    posts = (await getPosts()) || [];
  } catch (err) {
    console.error("Error fetching posts:", err);
  }

  try {
    dbUserId = await getDbUserId();
  } catch (err) {
    console.error("Error fetching DB user ID:", err);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}

        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId} />
            ))
          ) : (
            <p className="text-gray-500">No posts to show.</p>
          )}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}
  
