import { ReactNode, useRef, SetStateAction, Dispatch, Children, useState, useEffect } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { Tabs } from 'antd';

import useScrollPositionListener from '@/hook/useScrollPositionListener';

declare const LifeKind: 'lus' | 'tangled' | 'son' | 'snkrz' | 'con' | 'kari' | 'bagc';
type LifeLayoutProps = {
  lifeName: typeof LifeKind;
  hasFloatingBar?: boolean;
  children?: ReactNode;
};

const LifeLayout = ({ lifeName, hasFloatingBar = false, children }: LifeLayoutProps) => {
  return (
    <>
      <Helmet>
        <body className={cn(hasFloatingBar && 'has-floating', `life-page-${lifeName}`)} />
      </Helmet>
      <div className={cn('life-layout-wrap', `life-${lifeName}`)}>{children}</div>
    </>
  );
};

const LifeHero = ({
  lifeName,
  children,
  hasFloatingBar = false,
  setShowFloating,
}: {
  lifeName: typeof LifeKind;
  children: ReactNode;
  hasFloatingBar?: boolean;
  setShowFloating?: Dispatch<SetStateAction<boolean>>;
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  if (hasFloatingBar) {
    const heroOffsetTop = heroRef.current?.offsetTop as number;
    const heroHeight = heroRef.current?.scrollHeight as number;
    useScrollPositionListener(
      (scrollPosition) => {
        if (scrollPosition.y > heroOffsetTop + heroHeight) {
          setShowFloating !== undefined && setShowFloating(true);
        } else {
          setShowFloating !== undefined && setShowFloating(false);
        }
      },
      [heroOffsetTop, heroHeight],
    );
  }
  return (
    <div className={cn('life-detail-hero-wrap', `life-hero-${lifeName}`)} ref={heroRef}>
      {children}
    </div>
  );
};

type LifeContainerProps = {
  type?: 'tab' | 'normal';
  children?: ReactNode;
  tabItems?: {
    label: string;
    key: string;
    children: ReactNode;
  }[];
  lifeName: typeof LifeKind;
  activeTab?: string;
  paddingTop?: {
    pc: number;
    tablet: number;
    mobile: number;
  };
};

const LifeContainer = ({
  type = 'tab',
  children,
  tabItems,
  lifeName,
  activeTab = undefined,
  paddingTop = {
    pc: 80,
    tablet: 60,
    mobile: 40,
  },
}: LifeContainerProps) => {
  const [currentTab, setCurrentTab] = useState<string | undefined>(activeTab);

  /* 23.04.05 수정 start: currentTab useEffect 추가 */
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);
  /* 23.04.05 수정 end: currentTab useEffect 추가 */

  return (
    <div
      className={cn('life-detail-container', `life-${lifeName}-bottom-section`)}
      style={
        {
          '--paddingTopP': `${paddingTop.pc}px`,
          '--paddingTopT': `${paddingTop.tablet}px`,
          '--paddingTopM': `${paddingTop.mobile}px`,
        } as React.CSSProperties
      }
    >
      {type === 'normal' ? (
        children
      ) : (
        <>
          <Tabs
            destroyInactiveTabPane
            activeKey={currentTab}
            className={cn('tab-type tab-lg tab-full')}
            items={tabItems}
            onTabClick={(key: string) => {
              setCurrentTab(key);
            }}
          />
          {children}
        </>
      )}
    </div>
  );
};

export { LifeLayout, LifeHero, LifeContainer };
