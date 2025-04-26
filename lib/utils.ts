import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWithDashes(
  string: string | undefined
): string | undefined {
  if (!string) return;
  //abort if string doesnt have a space
  if (!string.includes(" ")) return string;
  //split string with spaces into array
  const words = string.split(" ");
  //join words together with -
  const stringWithDashes = words.join("-");
  return stringWithDashes;
}
