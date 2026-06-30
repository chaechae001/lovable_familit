type Props = {
  size?: number;
  className?: string;
  /** Background fill for the rounded card. Defaults to primary green. */
  cardFill?: string;
  /** Check & dots color (on the card). Defaults to ivory. */
  markColor?: string;
  /** Color of the 3 family dots that sit above the card. */
  dotColor?: string;
};

/**
 * Familit brand symbol — "Care Card Check".
 * A rounded family-task card with a soft check inside, and three
 * connected family dots above representing parent · child · sibling.
 * Avoids generic icons (heart / house / calendar / shield) per brand brief.
 */
export function FamilitLogo({
  size = 32,
  className,
  cardFill = "var(--primary)",
  markColor = "var(--primary-foreground)",
  dotColor = "var(--accent)",
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Familit"
    >
      {/* Family dots — connected by a soft arc */}
      <path
        d="M9 9.5 Q 20 3.5 31 9.5"
        stroke={cardFill}
        strokeOpacity="0.35"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="9" cy="9.5" r="2.6" fill={dotColor} />
      <circle cx="20" cy="6" r="2.6" fill={cardFill} />
      <circle cx="31" cy="9.5" r="2.6" fill={dotColor} />

      {/* Rounded family-task card */}
      <rect x="5.5" y="14" width="29" height="22" rx="6.5" fill={cardFill} />

      {/* Check mark */}
      <path
        d="M13.5 25.5 L18 30 L27 20.5"
        stroke={markColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default FamilitLogo;
