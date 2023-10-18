import { PiPoliceCar } from "react-icons/pi";

const Logo = () => {
  return (
    <>
      <div
        className="
            flex
            gap-1
            items-center
            text-lg font-medium
            text-orange-600
            hover:text-orange-400
            transition
        "
      >
        <PiPoliceCar />
        <p>Repair</p>
      </div>
    </>
  );
};

export default Logo;
