import { Metadata } from "next";

import { BaseSection } from "@/components/BaseSection";

export const metadata: Metadata = {
  title: "Legal Notice",
};

export default function LegalNoticePage() {
  return (
    <BaseSection>
      <h1 className="text-3xl font-bold mb-8">Legal Notice</h1>
      <div className="prose prose-lg max-w-none">
        <h3>Publisher</h3>
        <p>
          <a href="https://beta.gouv.fr/startups/?incubateur=culture">
            L&apos;atelier Numérique
          </a>{" "}
          of the Ministry of Culture (
          <a href="https://www.culture.gouv.fr">site</a>). 182 rue Saint-Honoré,
          75001 Paris.
        </p>

        <h3>Hosting</h3>
        <p>Scalingo. 15 avenue du Rhin, 67100 Strasbourg, France.</p>
      </div>
    </BaseSection>
  );
}
