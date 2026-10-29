import React from "react";
const paths = {
  arrow: (
    <>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </>
  ),
  diagonal: (
    <>
      <path d="M5 19 19 5M5 5h14v14" />
    </>
  ),
  chevron: <path d="m7 10 5 5 5-5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  scales: (
    <>
      <path d="M12 3v18M7 21h10M4 6h16M5 6l-3 8h6L5 6Zm14 0-3 8h6l-3-8Z" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  document: (
    <>
      <path d="M14 3H5v18h14V8l-5-5Z" />
      <path d="M14 3v6h5M8 13h8M8 17h6" />
    </>
  ),
  route: (
    <>
      <circle cx="5" cy="18" r="2" />
      <path d="M7 18h8a4 4 0 0 0 0-8H9a3 3 0 0 1 0-6h9M15 1l3 3-3 3" />
    </>
  ),
  talk: (
    <>
      <path d="M21 11a8 8 0 0 1-8 8H7l-4 3v-7a8 8 0 1 1 18-4Z" />
      <path d="M8 10h8M8 14h5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.3A8.5 8.5 0 1 1 20 11.5Z" />
      <path d="M8 7c-2 3 3 8 6 7l1-2-2-1-1 1-2-2 1-1-1-2H8Z" />
    </>
  ),
  pause: (
    <>
      <path d="M9 5v14M15 5v14" />
    </>
  ),
  play: <path d="m8 5 11 7-11 7V5Z" />,
};
export default function Icon({ name = "arrow", ...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
