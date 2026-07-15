import type { ReactNode } from "react";

export type FooterLink = { label: string; href: string };

export type FooterColumn = { title: string; links: FooterLink[] };

export type SocialLink = { label: string; href: string; icon: ReactNode };
