import avatarDefault from "../assets/user.png";
import loveReaction from "../assets/reactions-img/love.png";
import hahaReaction from "../assets/reactions-img/haha.png";
import wowReaction from "../assets/reactions-img/wow.png";
import sadReaction from "../assets/reactions-img/sad.png";
import likeReaction from "../assets/reactions-img/like.png";
import angryReaction from "../assets/reactions-img/angry.png";

export const IMAGE_PROXY = (url: string) =>
  `https://apoqrsgtqq.cloudimg.io/${url}`;
export const AVATAR_DEFAULT = avatarDefault;

export const THEMES = [
  "#0D90F3",
  "#EB3A2A",
  "#0AD4EB",
  "#643ECB",
  "#93BF34",
  "#E84FCF",
  "#B43F3F",
  "#E6A50A",
  "#69C90C",
];

export const REACTIONS_IMG = [
  loveReaction,
  hahaReaction,
  wowReaction,
  sadReaction,
  angryReaction,
  likeReaction,
];
