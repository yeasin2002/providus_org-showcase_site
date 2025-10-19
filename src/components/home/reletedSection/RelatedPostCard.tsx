import Image, { StaticImageData } from "next/image";
interface Post {
  image: StaticImageData;
  title: string;
  description: string;
  author: string;
  avatar: string;
  date: string;
}

export function RelatedPostCard({ post }: { post: Post }) {
  return (
    <article className="group cursor-pointer">
      <a
        href="#"
        className="flex flex-col md:flex-row gap-6 hover:opacity-90 transition-opacity"
      >
        {/* Image */}
        <div className="w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Title */}
          <h3 className="text-xl md:text-[40px] font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-[#737373] text-[18px] md:text-base leading-relaxed mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Author and Date */}
          <div className="flex items-center gap-3">
            <img
              src={post.avatar}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex gap-3">
              <p className="text-gray-900 font-medium text-sm">{post.author}</p>
              <time className="text-gray-500 text-sm">{post.date}</time>
            </div>
          </div>
        </div>
      </a>
      <h3 className="border border-b my-6 border-[#D9D9D9]"></h3>
    </article>
  );
}
