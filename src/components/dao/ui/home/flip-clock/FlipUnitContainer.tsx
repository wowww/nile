import StaticCard from './StaticCard';
import AnimatedCard from './AnimationCard';

const FlipUnitContainer = ({ digit, shuffle, unit }: { digit: number; shuffle: boolean; unit: string }) => {
  // assign digit values
  let currentDigit: string | number = digit;
  let previousDigit: string | number = digit + 1;

  // to prevent a negative value
  if (unit !== 'hours') {
    previousDigit = previousDigit === 60 ? 0 : previousDigit;
  } else {
    previousDigit = previousDigit === 24 ? 0 : previousDigit;
  }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digits
  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  // shuffle animations
  const animation1 = shuffle ? 'unfold' : 'fold';
  const animation2 = !shuffle ? 'unfold' : 'fold';

  return (
    <div className={'flip-unit-container'}>
      <StaticCard position={'upper-card'} digit={currentDigit} />
      <StaticCard position={'lower-card'} digit={previousDigit} />
      <AnimatedCard digit={digit2} animation={animation1} />
      <AnimatedCard digit={digit1} animation={animation2} />
    </div>
  );
};

export default FlipUnitContainer;
