
import React, { ReactElement, useState } from "react"
import TabTitle from "./TabTitle"

type Props = {
  children: ReactElement[];
}

const TabsWrap: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="tabs-nav-wrap">
      <nav className="tabs-nav">
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
          />
        ))}
        <hr />
      </nav>
      {children[selectedTab]}
    </div>
  )
}

export default TabsWrap;