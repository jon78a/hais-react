export const BaseContainer = ({ children }: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div>
      {children}
    </div>
  );
}
