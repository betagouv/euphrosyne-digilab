import Image from "next/image";

interface ImagePlaceholderProps {
  image?: string;
  objectGroupLabel: string;
  alt?: string;
}

export default function ImagePlaceholder({
  image,
  alt = "",
}: ImagePlaceholderProps) {
  const className = `fr-mb-3w fr-mt-mb-0`;
  const props = {
    className,
  };
  return image ? (
    <Image src={image} alt={alt} fill {...props} />
  ) : (
    <Image
      src="../../images/objectgroup-placeholder.svg"
      alt={alt}
      className={className}
    />
  );
}
