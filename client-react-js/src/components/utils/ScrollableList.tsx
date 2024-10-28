import React from 'react';
import '../../styles/UserComponent.css'

type ScrollableListComponent = {
  elements: string[]
};

export interface ScrollableListProps {
  scrollableList: ScrollableListComponent;
}

const ScrollableList: React.FC<ScrollableListComponent> = ({ elements }) => {
  return (
    <div className='scrollable-list'>
      <ul className='options'>
        {elements.map((el: string, index) =>
          <li key={index}>
            <a href='#'>{el}</a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ScrollableList;