export default function Container({ children, className = "", as: Tag = "div" }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[var(--content-max)] px-[var(--gutter)] ${className}`}
    >
      {children}
    </Tag>
  );
}
