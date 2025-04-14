import slugify from "slugify";

export function buildObjectPath({
  label,
  id,
}: {
  label: string;
  id: string;
}): string {
  return `/object/${slugify(label, { lower: true }).replaceAll(
    "'",
    "-",
  )}-${id}`;
}

export function buildProjectPath({ slug }: { slug: string }): string {
  return `/project/${slug}`;
}
