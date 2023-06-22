import { useContext } from "react";
import { GlobalDispatchContext } from "../../context/userContextProvider";

const HeaderIcon = ({ Icon, name }) => {
  const dispatch = useContext(GlobalDispatchContext);

  const handleClick = () => {
    if (name === "Add") {
      dispatch({ type: "IS_MODALOPEN", isModalOpen: true });
    }
  };
  return (
    <div
      className="p-2 text-black transition rounded cursor-pointer hover:bg-black hover:text-white"
      onClick={handleClick}
    >
      <Icon className="" size={25} />
    </div>
  );
};

export default HeaderIcon;
