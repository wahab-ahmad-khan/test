import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import Edit from "../assets/Edit.svg";
import Trash from "../assets/Trash.svg";
import AddNew from "../assets/add-new.png";
import { Link } from "react-router-dom";

const ProjectsListing = () => {
  const [filterText, setFilterText] = useState("");

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: false,
      filterable: true,
      className: "header-col",
      format: (d) => (d.name ? d.name : "N/A"),
      width: "40%",
    },
    {
      name: "Date Added",
      selector: "dateAdded",
      sortable: false,
      className: "header-col",
      format: (d) => (d.dateAdded ? d.dateAdded : "N/A"),
      width: "40%",
    },
    {
      name: "Action",
      selector: "action",
      sortable: false,
      className: "header-col",
      format: (d) => (
        <div className="d-flex align-items-center">
          <Link to="/project-detail">
            <img className="cursor-pointer" src={Edit} alt="" />
          </Link>
          <img className="ml-1 cursor-pointer" src={Trash} alt="" />
        </div>
      ),
      width: "20%",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        fontSize: "18px",
      },
    },
  };

  const data = [
    {
      name: "Actionable Insight",
      dateAdded: "Apr 02,2020",
    },
    {
      name: "mpartial",
      dateAdded: "Apr 03,2020",
    },
    {
      name: "GCC",
      dateAdded: "Apr 04,2020",
    },
    {
      name: "Get Insights",
      dateAdded: "Apr 5,2020",
    },
  ];

  const filteredItems = data?.filter(
    (item) =>
      JSON.stringify(item)?.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );

  return (
    <>
      <div className="wrapper">
        <SideBar />
        <div className="default-sidebar-margin mt-3">
          <div className="w-100 d-flex justify-content-between align-items-center mb-3">
            <div className="search-bar">
              <span className="search-icon">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <Link to="/project-detail">
              <button className="btn ml-2">
                <img className="mr-2" src={AddNew} alt="add-new" />
                Create new project{" "}
              </button>
            </Link>
          </div>
          <div className="inner-wrapper w-100 mt-3">
            {data.length > 0 ? (
              <DataTable
                columns={columns}
                data={filteredItems}
                responsive={true}
                customStyles={customStyles}
                divContainerClassName="custom-table-container"
              />
            ) : (
              <div className="w-100 text-center p-3">
                <p className="text-style fade-black">No data found!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsListing;
