import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("about");

  return (
    <div>
      <p>Hello</p>
      <div>
        <h1>text: </h1>
        <p>{t("title")}</p>
      </div>
    </div>
  );
}
