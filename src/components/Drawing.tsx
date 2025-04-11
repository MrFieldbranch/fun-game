const BEAM_1 = <div className="beam-1" />;
const BEAM_2 = <div className="beam-2" />;
const BEAM_3 = <div className="beam-3" />;
const BEAM_4 = <div className="beam-4" />;
const HEAD = <div className="head" />;
const UPPER_BODY = <div className="upper-body" />;
const LEFT_ARM = <div className="left-arm" />;
const RIGHT_ARM = <div className="right-arm" />;
const LEFT_LEG = <div className="left-leg" />;
const RIGHT_LEG = <div className="right-leg" />;

const ALL_PARTS = [
  BEAM_1,
  BEAM_2,
  BEAM_3,
  BEAM_4,
  HEAD,
  UPPER_BODY,
  LEFT_ARM,
  RIGHT_ARM,
  LEFT_LEG,
  RIGHT_LEG,
];

type DrawingProps = {
  numberOfIncorrectGuesses: number;
};

const Drawing = ({ numberOfIncorrectGuesses }: DrawingProps) => {
  return (
    <div className="drawing">
      {ALL_PARTS.slice(0, numberOfIncorrectGuesses)}
    </div>
  );
};

export default Drawing;
