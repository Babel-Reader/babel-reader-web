import React, { useContext } from 'react';
import PageInput from './page-input/PageInput';

import './Footer.scss';
import Slider from '@material-ui/core/Slider';
import { BookContext } from 'App';

const PageScaleSlider = ({ pageScale, setPageScale }) => {
  return (
    <Slider
      className="page-scale-slider"
      value={Math.round(pageScale * 100)}
      step={1}
      min={1}
      max={200}
      valueLabelDisplay="auto"
      onChange={(event, value) => {
        setPageScale(value / 100);
      }}
    />
  );
};

export default () => {
  const { pageNb, setPageNb, pageCount, pageScale, setPageScale } = useContext(
    BookContext
  );

  return (
    <footer className="home-footer">
      <PageScaleSlider
        {...{
          pageScale,
          setPageScale,
        }}
      />

      <PageInput
        {...{
          pageNb,
          setPageNb,
          pageCount,
        }}
      />
    </footer>
  );
};
