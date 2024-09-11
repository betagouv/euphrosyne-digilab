import slugify from "slugify";

export function buildObjectPath({
  label,
  id,
}: {
  label: string;
  id: string;
}): string {
  const slug = slugify(label, { lower: true }).replaceAll("'", "-");
  return `/object/${slug}-${id}`;
}

export function buildProjectPath({ slug }: { slug: string }): string {
  return `/project/${slug}`;
}
