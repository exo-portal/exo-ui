interface InstructionBadgeProps {
  number: number;
  title: string;
}

export default function InstructionBadge({
  number,
  title,
}: InstructionBadgeProps) {
  return (
    <div
      data-testid={`instruction-badge-wrapper-${number}`}
      className="flex gap-2 bg-[#B6C2D3]/40 p-6 rounded-4xl items-center"
    >
      <div className="flex items-center justify-center bg-neutral-50 w-6 h-6 rounded-full text-neutral-950 text-body-normal">
        {number}
      </div>
      <span
        data-testid={`instruction-badge-title-${number}`}
        className="text-neutral-50 text-body-normal"
      >
        {title}
      </span>
    </div>
  );
}
