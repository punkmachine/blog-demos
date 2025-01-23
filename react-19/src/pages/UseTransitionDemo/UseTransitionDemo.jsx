import { React18Code } from './React18Code';
import { React18View } from './React18View';
import { React19Code } from './React19Code';
import { React19View } from './React19View';

export const UseTransitionDemo = () => {
  return (
    <div className="use-transition-demo">
      <h2 className="demo-subtitle">Как было в React 18?</h2>
      <div className="demo-row">
        <div className="demo-code">
          <React18Code />
        </div>
        <div className="demo-preview">
          <React18View />
        </div>
      </div>

      <h2 className="demo-subtitle">Как стало в React 19?</h2>
      <div className="demo-row">
        <div className="demo-code">
          <React19Code />
        </div>
        <div className="demo-preview">
          <React19View />
        </div>
      </div>

      <h2 className="demo-subtitle">Сравним код</h2>
      <div className="demo-row">
        <div className="demo-code">
          <React18Code />
        </div>
        <div className="demo-preview">
          <React19Code />
        </div>
      </div>
    </div>
  );
};