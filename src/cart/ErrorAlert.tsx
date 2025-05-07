export default function ErrorAlert({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  return (
    <div className="fr-alert fr-alert--error fr-my-1w">
      <h3 className="fr-alert__title">{title}</h3>
      {body && <p>{body}</p>}
    </div>
  );
}
