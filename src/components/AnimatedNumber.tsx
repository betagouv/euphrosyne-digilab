import { useSpring, animated } from "react-spring";

export default function AnimatedNumber({ n }: { n: number }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    config: { mass: 1, tension: 200, friction: 50 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}
