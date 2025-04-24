import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-[#1F0733] text-pink-100 py-12">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
            <div className="md:text-8xl font-extrabold text-[#FFA6D6] tracking-wide">IDEAIGNITE</div>
            <p className="text-sm md:text-base mt-2">
              Supporting entrepreneurs, creators, and communities since 2008.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex text-[#FFA6D6] space-x-6 text-lg">
            {["facebook-f", "twitter", "youtube", "instagram", "linkedin-in"].map((icon, idx) => (
              <a
                key={idx}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon}
                className="hover:text-pink-300 transition duration-300 transform hover:scale-125"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left mb-12">
          {[
            { title: "DISCOVER", links: ["Top-Funded Campaigns", "Tech & Innovation", "Creative Campaigns", "Community & Culture", "Blog"] },
            { title: "LAUNCH", links: ["Start A Campaign", "Experts Directory", "Enterprise", "China"] },
            { title: "LEARN", links: ["How It Works", "Education Center", "What is Crowdfunding?", "Trust & Safety"] },
            { title: "CONTACT", links: ["Help & Support", "Press", "Careers", "Get In Touch"] }
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="text-xl font-bold text-pink-200 mb-4">{section.title}</h4>
              {section.links.map((link, linkIdx) => (
                <a
                  key={linkIdx}
                  href="#"
                  className="block text-sm hover:text-pink-300 transition duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <button className="bg-purple-700 text-sm px-5 py-3 rounded-md hover:bg-purple-600 transition duration-300 mb-4 md:mb-0">
            SELECT CURRENCY
          </button>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-xs">
            {["Terms of Use", "Privacy Policy", "Cookie Policy", "Do Not Sell My Info"].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="hover:text-pink-300 transition duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <p className="text-xs text-center mt-6">© 2024 Indiegogo, Inc. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
