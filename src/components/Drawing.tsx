type DrawingProps = {
  numberOfIncorrectGuesses: number;
};

const ALL_PART_CLASSES = [
  "beam-1",
  "beam-2",
  "beam-3",
  "beam-4",
  "head",
  "upper-body",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg",
];

const Drawing = ({ numberOfIncorrectGuesses }: DrawingProps) => {
  return (
    <div className="drawing">
      {ALL_PART_CLASSES.slice(0, numberOfIncorrectGuesses).map((className) => (
        <div className={className} key={className} />
      ))}
    </div>
  );
};

export default Drawing;
