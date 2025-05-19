import { BaseSection } from "@/components/BaseSection";
import { StartDsfrOnHydration } from "@/dsfr-bootstrap";

export default function PersonalDataPage() {
  return (
    <>
      <StartDsfrOnHydration />
      <BaseSection>
        <h1>Personal data and cookies</h1>

        <h2>Cookies placed and opt-out</h2>
        <p>
          This site places a small text file (a &ldquo;cookie&rdquo;) on your
          computer when you visit it. This allows us to measure the number of
          visits and understand which pages are most viewed.
        </p>

        <h2>This site does not display a cookie consent banner, why?</h2>
        <p>
          That&apos;s right, you didn&apos;t have to click on a block that
          covers half the page to say that you agree with the placement of
          cookies — even if you don&apos;t know what that means!
        </p>
        <p>
          Nothing exceptional, no special privilege related to a .gouv.fr. We
          simply respect the law, which says that some audience tracking tools,
          correctly configured to respect privacy, are exempt from prior
          authorization.
        </p>
        <p>
          For this, we use Matomo, a free tool, set up to comply with the
          &ldquo;Cookies&rdquo; recommendation of the CNIL. This means that your
          IP address, for example, is anonymized before being recorded. It is
          therefore impossible to associate your visits to this site with your
          person.
        </p>

        <h2>I contribute to enriching your data, can I access it?</h2>
        <p>
          Of course! Usage statistics for the majority of our products,
          including beta.gouv.fr, are freely accessible on{" "}
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
