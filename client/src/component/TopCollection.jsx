import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Fade } from "react-awesome-reveal";  // Import the desired animation

// Reusable Button Component
const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const TopCollections = () => {

  const { isDarkMode } = useContext(AuthContext);

  const collections = [
    {
      title: "Cozy Anti-Anxiety Portable Den for Small Pets",
      price: "$50",
      oldPrice: "$79 USD",
      discount: "36% OFF",
      raised: "$2,878 raised",
      funded: "146% funded",
      image: "https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,h_312,w_648/ktbxuwfmgcosv0xkftpj",
    },
    {
      title: "Kneeflow: Knee pain relief in less than 15 minutes",
      price: "$119",
      oldPrice: "$249 USD",
      discount: "52% OFF",
      raised: "$403,288 raised",
      funded: "474% funded",
      image: "https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,h_312,w_312/wjsqezzcrgsvit9oylot",
    },
    {
      title: "Finder TW2: Redefining Astrophotography",
      price: "$229",
      oldPrice: "$499 USD",
      discount: "47% OFF",
      raised: "$439,508 raised",
      funded: "2031% funded",
      image: "https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,h_312,w_312/cf0w74pzzykwufv7e51w",
    },
    {
      title: "BionicGym: Weight Loss in a Box!",
      price: "$649",
      oldPrice: "$999 USD",
      discount: "35% OFF",
      raised: "$4,031,125 raised",
      funded: "1997% funded",
      image: "https://c2.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,h_312,w_312/ic7xdnmfat9gyv3umz9x",
    },
    {
      title: "Deeper Connect Air: World's Best VPN Router",
      price: "$139",
      oldPrice: "$274 USD",
      discount: "49% OFF",
      raised: "$1,140,402 raised",
      funded: "1150% funded",
      image: "https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,h_312,w_312/zfi4dmxus7utwaj9aefb",
    },
    {
      title: "4D Pack Plus: Triple your luggage capacity",
      price: "$49",
      oldPrice: "$99 USD",
      discount: "50% OFF",
      raised: "$513,458 raised",
      funded: "1292% funded",
      image: "https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,h_312,w_312/frd0auouhtqbsospdz3j",
    },
  ];

  return (
   <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
     <div className="py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore our top collections
        </h2>
        <div className="flex justify-center space-x-6 text-sm text-gray-600 mb-6">
          {["TOP GIFTS", "COOL & CLEVER FINDS", "TEAM FAVORITES", "FUN & GAMES", "CREATIVE SPOTLIGHT"].map((category, index) => (
            <button key={index} className="hover:text-purple-600">
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((item, index) => (
            <Fade key={index} triggerOnce direction="up"> {/* Add Fade animation */}
              <div
                className="relative rounded-lg shadow-md overflow-hidden h-72" // Fixed height
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col  p-4 text-white">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-300">
                    {item.price} <span className="line-through">{item.oldPrice}</span>{" "}
                    <span className="text-green-600">{item.discount}</span>
                  </p>
                  <p className="text-sm text-gray-200">
                    {item.raised} • {item.funded}
                  </p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button>View Entire Collection</Button>
        </div>
      </div>
    </div>
   </div>
  );
};

export default TopCollections;
