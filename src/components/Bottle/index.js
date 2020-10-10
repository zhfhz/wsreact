import React from 'react';

export default ({ key, startColor, stopColor, bgColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="98"
      viewBox="0 0 98 204"
    >
      <defs>
        <linearGradient
          id={`lg-${key}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color={startColor} opacity={0.8} />
          <stop offset="100%" stop-color={stopColor} opacity={1} />
        </linearGradient>
        <filter id="filter" filterUnits="userSpaceOnUse">
          <feOffset result="offset" in="SourceAlpha" />
          <feGaussianBlur result="blur" stdDeviation="2.449" />
          <feFlood result="flood" flood-color="#dcdcdc" flood-opacity="0.2" />
          <feComposite result="composite" operator="in" in2="blur" />
          <feBlend result="blend" in="SourceGraphic" />
        </filter>
        <style>
          {`
          .cls-${key}-1 {
            filter: url(#filter);
          }
          .cls-${key}-2 {
            fill: ${bgColor || '#e7f5ff'};
          }
          .cls-${key}-3 {
            fill: none;
            stroke-width: 3px;
            fill-rule: evenodd;
            stroke: ${bgColor || '#e7f5ff'}};
            }
          .progress-${key} {
            fill: url(#lg-${key});
            fill-rule: evenodd;
            filter: url(#filter);
          }
          `}
        </style>
      </defs>
      <g id="progressBar">
        <path
          id="矩形_15"
          className={`cls-${key}-2`}
          d="M 20 24.1 H 78 a 20 20 0 0 1 20 20 v 146 a 14 14 0 0 1 -14 14 H 14 a 14 14 0 0 1 -14 -14 v -146 A 20 20 0 0 1 20 24.1 Z"
        />
        <path
          id="矩形_16_拷贝"
          className={`cls-${key}-2`}
          d="M 35.8 17.3 h 27.4 a 4 4 0 0 1 4 4 v 1.8 a 2 2 0 0 1 -2 2 H 33.8 a 2 2 0 0 1 -2 -2 V 21.3 A 4 4 0 0 1 35.8 17.3 Z"
        />
        <path
          id="矩形_16_拷贝_2"
          className={`cls-${key}-2`}
          d="M 43 11.6 H 54.9 a 4 4 0 0 1 4 4 V 16.9 a 2 2 0 0 1 -2 2 H 41 a 2 2 0 0 1 -2 -2 V 15.6 A 4 4 0 0 1 43 11.6 Z"
        />
        <path
          id="矩形_16"
          className={`cls-${key}-3`}
          d="M 61.7 2.3 h 3.4 c 4.5 0 8.1 2.6 8.1 5.8 v 11.7 c 0 3.2 -3.6 5.8 -8.1 5.8 h -32.5 c -4.5 0 -8.1 -2.6 -8.1 -5.8 v -11.7 c 0 -3.2 3.6 -5.8 8.1 -5.8 h 3.4"
        />
        <rect
          id="矩形_27"
          className={`cls-${key}-2`}
          x="16.6"
          width="64.3"
          height="7.8"
          rx="3.5"
          ry="3.5"
        />
        <path
          id="progress"
          className={`progress-${key}`}
          ng-attr-d={`m 6 188 a 10 10 1 0 0 10 10 h 66 a 10 10 0 0 0 10 -10 v -${value} s -14 10 -45 0 s -41 0 -41 0 z`}
        >
          <animate
            begin="1.2s"
            attributeName="d"
            ng-attr-values={`m 6 188 a 10 10 1 0 0 10 10 h 66 a 10 10 0 0 0 10 -10 v -{{value}} s -14 10 -45 0 s -41 0 -41 0 z;m 6 188 a 10 10 1 0 0 10 10 h 66 a 10 10 0 0 0 10 -10 v -${value} s -14 -10 -45 0 s -41 0 -41 0 z;m 6 188 a 10 10 1 0 0 10 10 h 66 a 10 10 0 0 0 10 -10 v -${value} s -14 10 -45 0 s -41 0 -41 0 z`}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            begin="0.2s"
            attributeName="d"
            ng-attr-values={`m 6 188 a 10 10 1 0 0 10 10 h 66 a 10 10 0 0 0 10 -10 v -0 s -14 0 -45 0 s -41 0 -41 0 z;m 6 188 a 10 10 1 0 0 10 10 h 66 a 10 10 0 0 0 10 -10 v -${value} s -14 0 -45 0 s -41 0 -41 0 z`}
            dur="1s"
            repeatCount="1"
          />
          <animate
            begin="0s"
            attributeName="d"
            ng-attr-values="m 6 188 a 10 10 1 0 0 10 10 h 66 a 10 10 0 0 0 10 -10 v -0 s -14 0 -45 0 s -41 0 -41 0 z;m 6 188 a 10 10 1 0 0 10 10 h 66 a 10 10 0 0 0 10 -10 v 0 s -14 0 -45 0 s -41 0 -41 0 z"
            dur="0.2s"
            repeatCount="1"
          />
        </path>
      </g>
    </svg>
  );
};
