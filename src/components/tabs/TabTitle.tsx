import React from 'react';

type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  active?: boolean;
};

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index, active }) => {
  return (
    <div className="tabs-list">
      <button onClick={() => setSelectedTab(index)}>{title}</button>
    </div>
  );
};

export default TabTitle;
