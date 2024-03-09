import React from 'react';
import { SideBarDatas } from "./SideBarDatas.js";
import "./SideBar.css";

function SideBar({ selectedItem, setSelectedItem }) {
    return (
      <div className='SideBar'>
        <h3>Hello Admin!!</h3>
        <ul className="SideBarList">
          {SideBarDatas.map((val, key) => {
            return (
              <li key={key}
                className="row"
                id={selectedItem === val.title ? "active" : ""}
                onClick={() => setSelectedItem(val.title)}
              >
                <div id="icon">
                  {val.icon}
                </div>
                <div id="title">
                  {val.title}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  

export default SideBar;
