import DemoComponent from './DemoComponent';
import CodeComponent from './CodeComponent';

export const UseComponent = () => {
  return (
    <div className="use-action-state-demo">
      <h2 className="demo-subtitle">Что там с use?</h2>
      <div className="demo-row">
        <div className="demo-code">
          <CodeComponent />
        </div>
        <div className="demo-preview">
          <DemoComponent />
        </div>
      </div>
    </div>
  );
};