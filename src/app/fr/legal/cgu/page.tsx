import { Metadata } from "next";

import { BaseSection } from "@/components/BaseSection";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
};

export default function CGUPage() {
  return (
    <BaseSection>
      <h1 className="text-3xl font-bold mb-8">Conditions d&apos;utilisation</h1>
      <div className="prose prose-lg max-w-none">
        <h3>Conditions d&apos;utilisation</h3>
        <p>
          En accédant et en utilisant ce site, vous acceptez d&apos;être lié par
          les présentes conditions d&apos;utilisation. Si vous n&apos;acceptez
          pas ces conditions, veuillez ne pas utiliser ce site.
        </p>

        <h3>Utilisation du site</h3>
        <p>
          Ce site est destiné à fournir des informations sur le projet
          Euphrosyne. Vous acceptez d&apos;utiliser ce site uniquement à des
          fins légales et d&apos;une manière qui ne porte pas atteinte aux
          droits des autres ou qui ne restreint ou n&apos;inhibe pas
          l&apos;utilisation et la jouissance du site par quiconque.
        </p>

        <h3>Propriété intellectuelle</h3>
        <p>
          Tout le contenu présent sur ce site, y compris mais sans s&apos;y
          limiter, le texte, les graphiques, les logos, les icônes, les images,
          les clips audio, les téléchargements numériques et les compilations de
          données, est la propriété de L&apos;Atelier Numérique ou de ses
          fournisseurs de contenu et est protégé par les lois françaises et
          internationales sur le droit d&apos;auteur.
        </p>

        <h3>Limitation de responsabilité</h3>
        <p>
          L&apos;Atelier Numérique ne sera pas responsable des dommages de
          quelque nature que ce soit résultant de l&apos;utilisation ou de
          l&apos;impossibilité d&apos;utiliser ce site, y compris, mais sans
          s&apos;y limiter, les dommages directs, indirects, accessoires,
          consécutifs ou punitifs.
        </p>

        <h3>Modifications des conditions</h3>
        <p>
          L&apos;Atelier Numérique se réserve le droit de modifier ces
          conditions d&apos;utilisation à tout moment. Les modifications entrent
          en vigueur dès leur publication sur le site. Votre utilisation
          continue du site après la publication des modifications constitue
          votre acceptation des conditions modifiées.
        </p>

        <h3>Droit applicable</h3>
        <p>
          Ces conditions d&apos;utilisation sont régies et interprétées
          conformément aux lois françaises. Tout litige relatif à ces conditions
          sera soumis à la juridiction exclusive des tribunaux français.
        </p>
      </div>
    </BaseSection>
  );
}
