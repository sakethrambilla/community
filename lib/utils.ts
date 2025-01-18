import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function htmlToText(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}

type Error = {
  data: {
    message: string;
  };
};
export function errorMessage(error: Error): string {
  return error.data.message || "Unknown error";
}
