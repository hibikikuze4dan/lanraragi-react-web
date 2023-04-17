import { Casino, MenuBook } from "@mui/icons-material";
import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getSectionVisibilityObjectForSideNavbar } from "../../../app/selectors";
import { updateSectionVisibility } from "../../../app/slice";

export const SideNavbar = () => {
  const dispatch = useDispatch();
  const sectionVisibility = useSelector(
    getSectionVisibilityObjectForSideNavbar
  );
  const icons = {
    random: <Casino />,
    images: <MenuBook />,
  };

  return (
    <Sidebar style={{ height: window.innerHeight }} defaultCollapsed>
      <Menu>
        {sectionVisibility.map(({ id, label }) => {
          const onClick = () => {
            const allFalse = sectionVisibility.reduce(
              (acc, sec) => ({ ...acc, [sec.id]: false }),
              {}
            );
            dispatch(updateSectionVisibility({ allFalse, [id]: true }));
          };
          return (
            <MenuItem onClick={onClick} icon={icons[id]} key={id}>
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};
