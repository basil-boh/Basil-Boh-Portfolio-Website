import type { Metadata } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { CardFX } from "@/components/card-fx";
import { ScrollProgress } from "@/components/scroll-progress";
import { profile, projects } from "@/lib/data";
import { getAllArticles } from "@/lib/articles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Schibsted Grotesk — closest free stand-in for Aeonik Pro
const display = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://basilboh.dev"),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  url: "https://basilboh.dev",
  image: `https://basilboh.dev${profile.photo}`,
  email: `mailto:${profile.email}`,
  jobTitle: profile.role,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  alumniOf: { "@type": "CollegeOrUniversity", name: "National University of Singapore" },
  sameAs: profile.socials
    .filter((s) => s.href.startsWith("http"))
    .map((s) => s.href),
  knowsAbout: ["Full-Stack Engineering", "AI Engineering", "Payments", "TypeScript", "React", "Next.js"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${display.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ScrollProgress />
          <Nav />
          <main>{children}</main>
          <Footer />
          <CardFX />
          <CommandPalette
            projects={projects.map((p) => ({ slug: p.slug, title: p.title }))}
            articles={getAllArticles().map((a) => ({ slug: a.slug, title: a.title }))}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
