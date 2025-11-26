import { defaultLocale } from "@/src/i18n/config";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(`/${defaultLocale}`);
}
