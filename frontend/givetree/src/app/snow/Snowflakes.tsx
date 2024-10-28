import { snowflake } from './snow.css';

const Snowflakes = () => {
  const snowflakes = Array.from({ length: 50 }).map((_, index) => (
    <div
      key={index}
      className={snowflake}
      style={{
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 3 + 2}s, ${Math.random() * 5 + 5}s`,
      }}
    />
  ));

  return <>{snowflakes}</>;
};

export default Snowflakes;
