//import { animated, useSpring } from "react-spring";
import { Css } from "tss-react";

export default function FadeInDiv({
  children,
  className,
  css,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  css?: Css;
} & React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={className + " " + css} {...props}>
      {children}
    </div>
  );
  /*
  const style = useSpring({
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
  });
  return (
    <animated.div style={style} className={className} css={css} {...props}>
      {children}
    </animated.div>
  );
  */
}
