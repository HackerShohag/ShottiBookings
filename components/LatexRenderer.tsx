import { useEffect } from 'react';

const LatexRenderer = ({ latexCode }) => {
  useEffect(() => {
    // Load MathJax
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
    script.onload = () => {
      const scriptMathJax = document.createElement('script');
      scriptMathJax.type = 'text/javascript';
      scriptMathJax.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
      document.head.appendChild(scriptMathJax);
    };
    document.head.appendChild(script);

    // Render LaTeX code using MathJax
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$']],
      },
      svg: {
        fontCache: 'global',
      },
    };

    const scriptMathJax2 = document.createElement('script');
    scriptMathJax2.type = 'text/javascript';
    scriptMathJax2.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
    document.head.appendChild(scriptMathJax2);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.innerHTML = `
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$']],
          displayMath: [['$$', '$$']],
        },
        svg: {
          fontCache: 'global',
        },
      };
      MathJax.typeset();
    `;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
      document.head.removeChild(scriptMathJax2);
    };
  }, [latexCode]);

  return <div id="latex-container">{latexCode}</div>;
};

export default LatexRenderer;

