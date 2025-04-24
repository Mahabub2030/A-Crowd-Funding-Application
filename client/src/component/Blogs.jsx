import React from "react";

const Blogs = () => {
  return (
    <section className="bg-[#1F0733] text-white py-16">
      <div className="container mx-auto px-6 border-b border-purple-800 pb-16">
        <h2 className="text-center text-4xl font-extrabold mb-12 tracking-wider">
          Latest from the Blog
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left - Main Highlight */}
          <div className="lg:col-span-2 bg-[#2A133D] rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300">
            <img
              src="https://go.indiegogo.com/wp-content/uploads/2024/11/top-gift-picks-1-736x386.png"
              alt="Main Blog Highlight"
              className="w-full h-80 object-cover"
            />
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-4 text-white">
                Holiday Gift Guides
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Crowdfunded and ready to ship: Unique and innovative gifts for
                your whole list.
              </p>
              <a
                href="#"
                className="inline-block text-lg text-green-400 font-semibold hover:underline"
              >
                Explore Now →
              </a>
            </div>
          </div>

          {/* Right - Blog List */}
          <div className="space-y-8">
            {[
              {
                title:
                  "Stocking Stuffer Gift Guide: Small but mighty gifts shipping now.",
                link: "#",
              },
              {
                title:
                  "Top Gift Picks: Gifts so unique, you saw them first here.",
                link: "#",
              },
              {
                title:
                  "The BIG Gift: Gifts sure to impress and ready to ship.",
                link: "#",
              },
            ].map((blog, index) => (
              <div
                key={index}
                className="flex items-center bg-purple-800 p-6 rounded-lg shadow-lg hover:bg-purple-700 transform hover:translate-x-2 transition duration-300"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <div className="ml-6">
                  <a
                    href={blog.link}
                    className="text-lg font-medium text-green-400 hover:underline"
                  >
                    {blog.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block bg-green-500 hover:bg-green-400 text-white py-3 px-8 rounded-lg font-bold text-xl shadow-lg transform hover:scale-105 transition duration-300"
          >
            Explore the Blog
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
