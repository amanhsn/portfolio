export type Social = {
  label: string;
  href: string;
  icon: "linkedin" | "behance" | "cv" | "spotify";
};

export const socials: Social[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/amanhsn",
    icon: "linkedin",
  },
  {
    label: "Behance",
    href: "https://behance.net/amanhsn",
    icon: "behance",
  },
  {
    label: "CV",
    href: "https://aman-resume.vercel.app",
    icon: "cv",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/pibcpyd0xmdn1wo1xq5kzow9y",
    icon: "spotify",
  },
];
