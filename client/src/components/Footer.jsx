import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandLeetcode } from "react-icons/tb";
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center">
          <a
            href="https://www.linkedin.com/in/pranav-kokate/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-3xl hover:text-blue-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Pranav141"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-3xl hover:text-green-400"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/PranavKokate121"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-3xl hover:text-red-400"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://leetcode.com/u/Pranavkokate121/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-3xl hover:text-yellow-400 "
          >
            <TbBrandLeetcode />
          </a>
        </div>
        <p className="text-gray-400 pt-2">&copy; Made with ❤ by Pranav Kokate.😎 </p>
      </div>
    </footer>
  );
}

export default Footer;
