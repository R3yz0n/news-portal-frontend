import React from "react";
import { FaTwitter } from "react-icons/fa";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialMedia = ({ socialMedia }) => {
  return (
    <Link
      to={socialMedia.social_media_link}
      target="_blank"
      title={socialMedia.name}
      className="h-7 sm:h-9 w-7 sm:w-9 items-center justify-center flex rounded-full bg-blue-700 bg-opacity-75 shadow-md"
    >
      {socialMedia?.social_media_link?.includes("facebook") && (
        <FaFacebookF className="text-sm sm:text-base md:text-lg cursor-pointer  hover:rotate-12 duration-300" />
      )}
      {socialMedia?.social_media_link?.includes("twitter") && (
        <FaTwitter className="text-sm sm:text-base md:text-lg cursor-pointer hover:rotate-12 duration-300" />
      )}
      {socialMedia?.social_media_link?.includes("linkedin") && (
        <FaLinkedinIn className="text-sm sm:text-base md:text-lg cursor-pointer hover:rotate-12 duration-300" />
      )}
      {socialMedia?.social_media_link?.includes("instagram") && (
        <FaInstagram className="text-sm sm:text-base md:text-lg cursor-pointer hover:rotate-12 duration-300" />
      )}
      {socialMedia?.social_media_link?.includes("youtube") && (
        <FaYoutube className="text-sm sm:text-base md:text-lg cursor-pointer hover:rotate-12 duration-300" />
      )}
      {socialMedia?.social_media_link?.includes("tiktok") && (
        <FaTiktok className="text-sm sm:text-base md:text-lg cursor-pointer hover:rotate-12 duration-300" />
      )}
    </Link>
  );
};

export default SocialMedia;
