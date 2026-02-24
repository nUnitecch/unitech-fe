export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-xl mx-auto">{children}</div>
    </div>
  );
}
