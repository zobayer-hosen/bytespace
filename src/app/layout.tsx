import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ByteSpace — Learn from hundreds of courses",
    template: "%s · ByteSpace",
  },
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with ByteSpace's wide range of courses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/*
          Reload: other pages go to /; on / the page starts at the hero. Chrome restores the old scroll position
          while the page loads (animated, because of `scroll-behavior: smooth`), so make that restore instant and
          undo it on the next scroll event, until load or the first user input. history.scrollRestoration is left
          alone so Back/Forward keep their positions.
        */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{
  var n=performance.getEntriesByType("navigation")[0];
  if(!n||n.type!=="reload")return;
  if(location.pathname!=="/"){location.replace("/");return;}
  if(location.hash)history.replaceState(null,"","/");
  var s=document.createElement("style");s.textContent="html{scroll-behavior:auto!important}";document.head.appendChild(s);
  var top=function(){if(window.scrollY!==0)window.scrollTo(0,0);};
  var input=["wheel","touchstart","keydown","pointerdown"];
  var stop=function(){removeEventListener("scroll",top);input.forEach(function(t){removeEventListener(t,stop,true);});s.remove();};
  addEventListener("scroll",top);
  input.forEach(function(t){addEventListener(t,stop,{capture:true,passive:true});});
  addEventListener("load",function(){setTimeout(function(){top();stop();});},{once:true});
}catch(e){}})();` }} />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
