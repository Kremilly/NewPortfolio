
interface LambdaProps {
  className?: string;
}

export function Lambda({ className }: LambdaProps) {
  return (
    <div className={className}>
      <span className="text-xl font-bold">λ</span>
    </div>
  );
}
