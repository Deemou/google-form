interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div aria-label="Layout" className="layout">
      {children}
    </div>
  );
}
