export const ErosLink = ({ c2rmfId }: { c2rmfId: string }) => {
  return (
    <a
      href={`https://data.culture.gouv.fr/explore/dataset/notices-d-oeuvres-du-c2rmf/table/?disjunctive.collection_patrimoniale&disjunctive.domaine&sort=numero_de_reference_c2rmf&q=${c2rmfId}`}
      target="_blank"
    >
      Fiche objet Eros
    </a>
  );
};
