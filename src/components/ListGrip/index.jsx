export function ListGrip(gripProps) {
    const {
        children,
        gridTemplateColumns,
        justifyItems,
        gap
      } = gripProps
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns,
          justifyItems,
          gap
        }}
      >
        {children}
      </div>
    );
  }
  