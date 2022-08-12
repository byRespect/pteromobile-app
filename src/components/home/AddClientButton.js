import { TouchableHighlight } from "react-native";
import { useDispatch } from "react-redux";
import { PlusIcon } from "../../assets/icons";
import { OpenAddClientPopup } from "../../redux/slices/appSlice";

function AddClientButton() {
  const dispatch = useDispatch();
  return (
    <TouchableHighlight
      onPress={() => {
        dispatch(OpenAddClientPopup());
      }}
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#3e4685",
        borderRadius: 50,
        padding: 10,
      }}
    >
      <PlusIcon fill={"#fff"} style={{ width: 30, height: 30 }} />
    </TouchableHighlight>
  );
}

export default AddClientButton;
