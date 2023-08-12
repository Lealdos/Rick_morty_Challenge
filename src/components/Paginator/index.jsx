import styles from "./index.module.css";
const noOp = () => null;

export function Paginator(paginatorProps) {
    const {
        disablePrev = false,
        disableNext = false,
        handleNextClick = noOp,
        handlePrevClick = noOp
      } = paginatorProps
  return (
    <div className={styles.container}>
      <button onClick={handlePrevClick} disabled={disablePrev}>
        Prev
      </button>
      <button onClick={handleNextClick} disabled={disableNext}>
        Next
      </button>
    </div>
  );
}
