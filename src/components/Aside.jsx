import { MainNode } from "./MainNode";

export const Aside = () => {
  return (
    <div
      id="aside"
      style={{ width: "20rem", maxHeight: "90vh", overflow: "auto" }}
    >
      <MainNode />
    </div>
  );
};
