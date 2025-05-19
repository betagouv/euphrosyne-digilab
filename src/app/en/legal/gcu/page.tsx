import { Metadata } from "next";

import { BaseSection } from "@/components/BaseSection";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function GCUPage() {
  return (
    <BaseSection>
      <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
      <div className="prose prose-lg max-w-none">
        <h3>Terms of Use</h3>
        <p>
          By accessing and using this site, you agree to be bound by these terms
          of use. If you do not agree to these terms, please do not use this
          site.
        </p>

        <h3>Site Usage</h3>
        <p>
          This site is intended to provide information about the Euphrosyne
          project. You agree to use this site only for lawful purposes and in a
          way that does not infringe the rights of others or restrict or inhibit
          anyone else&apos;s use and enjoyment of the site.
        </p>

        <h3>Intellectual Property</h3>
        <p>
          All content on this site, including but not limited to text, graphics,
          logos, icons, images, audio clips, digital downloads, and data
          compilations, is the property of L&apos;Atelier Numérique or its
          content suppliers and is protected by French and international
          copyright laws.
        </p>

        <h3>Limitation of Liability</h3>
        <p>
          L&apos;Atelier Numérique will not be liable for any damages of any
          kind arising from the use or inability to use this site, including but
          not limited to direct, indirect, incidental, consequential, or
          punitive damages.
        </p>

        <h3>Changes to Terms</h3>
        <p>
          L&apos;Atelier Numérique reserves the right to modify these terms of
          use at any time. Changes take effect upon posting to the site. Your
          continued use of the site after changes are posted constitutes your
          acceptance of the modified terms.
        </p>

        <h3>Governing Law</h3>
        <p>
          These terms of use are governed by and construed in accordance with
          French law. Any dispute relating to these terms shall be subject to
          the exclusive jurisdiction of the French courts.
        </p>
      </div>
    </BaseSection>
  );
}
