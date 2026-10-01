import { Aperture, Component, Globe, Sun, Zap } from "lucide-react";
import type { Stat, Testimonial } from "@/types";
import { media } from "./media";

export const partners = [
  { name: "Logoipsum", icon: Aperture },
  { name: "Logoipsum", icon: Sun },
  { name: "Logoipsum", icon: Zap },
  { name: "Logoipsum", icon: Component },
  { name: "Logoipsum", icon: Globe },
];

export const highlightTopic = {
  title: "UI/UX Design",
  courses: "200 Courses",
  students: "1000+ Students",
};

export const happyStudents = {
  rating: 4.5,
  reviews: 240,
  total: "2K+",
};

export const learningProgress = 55;

export const growthStats: Stat[] = [
  { value: 12, suffix: "K", label: "Students" },
  { value: 70, suffix: "+", label: "Courses" },
  { value: 16, label: "Creators" },
];

export const revenue = {
  total: { label: "Total Revenue", period: "Jan 11–23", amount: "$120.29", progress: 70 },
  yearToDate: { label: "Year to Date", period: "2023", amount: "$1,200.38", change: "+2.5%" },
};

export const creatorBenefits = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: media.avatars.sarah,
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    avatar: media.avatars.james,
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: media.avatars.alex,
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
  },
];
