import type { NavLink } from "@/types";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Creators", href: "/creators/purepearl-studio" },
];

export const authNav = {
  signIn: { label: "Sign In", href: "/login" },
  signUp: { label: "Join Us", href: "/signup" },
} satisfies Record<string, NavLink>;

export const footerColumns: NavLink[][] = [
  [
    { label: "Featured Courses", href: "/courses" },
    { label: "Featured Categories", href: "/courses" },
    { label: "Business", href: "/courses" },
    { label: "IT", href: "/courses" },
    { label: "Design", href: "/courses" },
  ],
  [
    { label: "Development", href: "/courses" },
    { label: "Marketing", href: "/courses" },
    { label: "Photography", href: "/courses" },
    { label: "Finance", href: "/courses" },
    { label: "Sport", href: "/courses" },
  ],
  [
    { label: "Become a Creator", href: "/signup" },
    { label: "Affiliate Program", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Help", href: "#" },
    { label: "About", href: "#" },
  ],
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookies Settings", href: "#" },
];
