export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ position: 'fixed', inset: 0, zIndex: '100' }}>{children}</div>;
}
