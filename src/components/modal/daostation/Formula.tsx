import cn from 'classnames';

const Formula = () => {
  return (
    <>
      <strong>배분공식</strong>
      <div className={cn('formula-wrap')}>
        <div className={cn('total')}>Wonder 획득량 =</div>
        <div className={cn('fraction')}>
          <div>
            모집 총액 <span className={cn('unit')}>(WEMIX)</span>
          </div>
          <span className={cn('a11y')}>나누기</span>
          <div>
            참역 금액 <span className={cn('unit')}>(WEMIX)</span>
          </div>
        </div>
        x (총 Wonder 발행량 x 0.9)
      </div>
    </>
  );
};

export default Formula;
