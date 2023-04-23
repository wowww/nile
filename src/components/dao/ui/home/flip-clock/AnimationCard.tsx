const AnimatedCard = ({ animation, digit }: { animation: string; digit: string | number }) => {
  return (
    <div className={`flip-card ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

export default AnimatedCard;
