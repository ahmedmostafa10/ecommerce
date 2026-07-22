import type { FooterColumn, SocialLink } from "./types";
import TwitterIcon from "../../assets/icons/TwitterIcon";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import GitHubIcon from "../../assets/icons/GitHubIcon";

export const COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Features", href: "#" },
      { label: "Works", href: "#" },
      { label: "Career", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Customer Support", href: "#" },
      { label: "Delivery Details", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", href: "#" },
      { label: "Manage Deliveries", href: "#" },
      { label: "Orders", href: "#" },
      { label: "Payments", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free eBooks", href: "#" },
      { label: "Development Tutorial", href: "#" },
      { label: "How to - Blog", href: "#" },
      { label: "Youtube Playlist", href: "#" },
    ],
  },
];

export const SOCIALS: SocialLink[] = [
  {
    label: "Twitter",
    href: "#",
    icon: <TwitterIcon className="h-3.5 w-3.5" />,
  },
  {
    label: "Facebook",
    href: "#",
    icon: <FacebookIcon className="h-3.5 w-3.5" />,
  },
  {
    label: "Instagram",
    href: "#",
    icon: <InstagramIcon className="h-3.5 w-3.5" />,
  },
  {
    label: "GitHub",
    href: "#",
    icon: <GitHubIcon className="h-3.5 w-3.5" />,
  },
];

export const PAYMENTS = [
  "Visa",
  "MasterCard",
  "PayPal",
  "ApplePay",
  "GooglePay",
];
