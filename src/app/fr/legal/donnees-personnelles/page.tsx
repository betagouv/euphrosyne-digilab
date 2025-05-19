import { BaseSection } from "@/components/BaseSection";
import { StartDsfrOnHydration } from "@/dsfr-bootstrap";

export default function PersonalDataPage() {
  return (
    <>
      <StartDsfrOnHydration />
      <BaseSection>
        <h1>Données personnelles et cookies</h1>

        <h2>Cookies déposés et opt-out</h2>
        <p>
          Ce site dépose un petit fichier texte (un &laquo; cookie &raquo;) sur
          votre ordinateur lorsque vous le consultez. Cela nous permet de
          mesurer le nombre de visites et de comprendre quelles sont les pages
          les plus consultées.
        </p>

        <h2>
          Ce site n&apos;affiche pas de bannière de consentement aux cookies,
          pourquoi ?
        </h2>
        <p>
          C&apos;est vrai, vous n&apos;avez pas eu à cliquer sur un bloc qui
          recouvre la moitié de la page pour dire que vous êtes d&apos;accord
          avec le dépôt de cookies — même si vous ne savez pas ce que ça veut
          dire !
        </p>
        <p>
          Rien d&apos;exceptionnel, pas de passe-droit lié à un .gouv.fr. Nous
          respectons simplement la loi, qui dit que certains outils de suivi
          d&apos;audience, correctement configurés pour respecter la vie privée,
          sont exemptés d&apos;autorisation préalable.
        </p>
        <p>
          Nous utilisons pour cela Matomo, un outil libre, paramétré pour être
          en conformité avec la recommandation &laquo; Cookies &raquo; de la
          CNIL. Cela signifie que votre adresse IP, par exemple, est anonymisée
          avant d&apos;être enregistrée. Il est donc impossible d&apos;associer
          vos visites sur ce site à votre personne.
        </p>

        <h2>Je contribue à enrichir vos données, puis-je y accéder ?</h2>
        <p>
          Bien sûr ! Les statistiques d&apos;usage de la majorité de nos
          produits, dont beta.gouv.fr, sont disponibles en accès libre sur{" "}
          <a
            href="https://stats.data.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            stats.data.gouv.fr
          </a>
          .
        </p>
      </BaseSection>
    </>
  );
}
