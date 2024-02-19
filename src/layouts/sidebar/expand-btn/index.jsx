import { KeyboardArrowUpOutlined } from "@mui/icons-material";

const ExpandBtn = ({ onClick }) => {
  return (
    <button className="sidebar__expand-btn" onClick={onClick}>
      <span className="expand__icon">
        <KeyboardArrowUpOutlined />
      </span>
      <span className="link__text">More</span>
    </button>
  );
};

export default ExpandBtn;
