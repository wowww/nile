const StaticCard = ({ position, digit }: { position: string; digit: number | string }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

export default StaticCard;
