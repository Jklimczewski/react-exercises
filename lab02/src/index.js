import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

function tick() {
  const element = (
    <div>
      <h1>Witaj świecie!</h1>
      <h2>
        Aktualny czas: {new Date().toLocaleTimeString()}.
      </h2>
    </div>
  );
  root.render(element);
}
setInterval(tick,1000)

