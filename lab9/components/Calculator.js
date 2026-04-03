import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');

  const handleButtonClick = (value) => {
    if (display === '0' && value !== 'C' && value !== '=') {
      setDisplay(value);
    } else if (value === 'C') {
      setDisplay('0');
    } else if (value === '=') {
      try {
        const result = eval(display);
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <div style={{ width: '200px', margin: 'auto', textAlign: 'center' }}>
      <input
        type="text"
        value={display}
        readOnly
        style={{ width: '100%', marginBottom: '10px', fontSize: '20px' }}
      />
      <div>
        {[7, 8, 9, '/'].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn.toString())} style={{ width: '40px', height: '40px', margin: '2px' }}>
            {btn}
          </button>
        ))}
      </div>
      <div>
        {[4, 5, 6, '*'].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn.toString())} style={{ width: '40px', height: '40px', margin: '2px' }}>
            {btn}
          </button>
        ))}
      </div>
      <div>
        {[1, 2, 3, '-'].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn.toString())} style={{ width: '40px', height: '40px', margin: '2px' }}>
            {btn}
          </button>
        ))}
      </div>
      <div>
        {[0, 'C', '=', '+'].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn.toString())} style={{ width: '40px', height: '40px', margin: '2px' }}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}