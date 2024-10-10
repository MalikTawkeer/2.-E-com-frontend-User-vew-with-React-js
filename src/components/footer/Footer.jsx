import React from "react";
import { Link } from "react-router-dom";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = () => {
  // Company items
  const navItems1 = [
    { path: "", name: "About" },
    { path: "", name: "Careers" },
    { path: "", name: "Blog" },
  ];
  // Help center
  const navItems2 = [
    { path: "", name: "Discord Server" },
    { path: "", name: "Twitter" },
    { path: "", name: "Facebook" },
    { path: "", name: "Contact Us" },
  ];
  // Legal
  const navItems3 = [
    { path: "", name: "Privacy Policy" },
    { path: "", name: "Licensing" },
    { path: "", name: "Terms & Conditions" },
  ];

  // Download
  const navItems4 = [
    { path: "", name: "iOS" },
    { path: "", name: "Android" },
    { path: "", name: "Windows" },
    { path: "", name: "MacOs" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Company
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              {navItems1.map((item) => (
                <li className="mb-4" key={item.name}>
                  <Link href="#" className=" hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help center */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Help center
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              {navItems2.map((item) => (
                <li className="mb-4" key={item.name}>
                  <Link to={item.path} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              {navItems3.map((item) => (
                <li key={item.name} className="mb-4">
                  <Link to={item.path} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download  */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Download
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              {navItems4.map((item) => (
                <li className="mb-4" key={item.name}>
                  <Link href="#" className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2024 <Link to="/">Kashmirbazar.com</Link>. All Rights Reserved.
          </span>

          {/* Social media Links */}
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
