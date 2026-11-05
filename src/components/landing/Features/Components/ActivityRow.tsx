type ActivityRowProps = {
  text: string;
  when: string;
};

export function ActivityRow({ text, when }: ActivityRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-foreground">
      <span>{text}</span>

      <span className="shrink-0 font-mono text-xs text-muted-foreground">
        {when}
      </span>
    </div>
  );
}
