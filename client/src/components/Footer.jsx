import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandLeetcode } from "react-icons/tb";
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 fixed bottom-0 w-full ">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center">
          <a
            href="https://shortit-nu.vercel.app//gerthTuE"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-3xl hover:text-blue-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://shortit-nu.vercel.app//FvgMbkcv"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-3xl hover:text-green-400"
          >
            <FaGithub />
          </a>
          <a
            href="https://shortit-nu.vercel.app//V_ZU55aR"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-3xl hover:text-red-400"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://shortit-nu.vercel.app//oBM-_kPs"
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
