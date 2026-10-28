import type { CSSProperties } from "react";
import { MoonLoader } from "react-spinners";

const override: CSSProperties = {
  display: "flex",
  margin: "0 auto 50px auto",
};

export default function Spinner({ color = "#22d3ee", size = "150px" }) {
  return (
    <div>
      <MoonLoader
        color={color}
        size={size}
        cssOverride={override}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
