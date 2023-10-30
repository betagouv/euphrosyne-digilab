import { fr } from "@codegouvfr/react-dsfr";
import { Interpolation, Theme } from "@emotion/react";
import { animated, useSpring } from "react-spring";

export default function FadeInDiv({
  children,
  className,
  css,
}: {
  children: React.ReactNode;
  className?: string;
  css?: Interpolation<Theme>;
}) {
  const style = useSpring({
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
  });
  return (
    <animated.div style={style} className={className} css={css}>
      {children}
    </animated.div>
  );
}
