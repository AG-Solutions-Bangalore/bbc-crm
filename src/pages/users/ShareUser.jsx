import React, { useContext, useEffect, useState } from "react";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import MUIDataTable from "mui-datatables";

const ShareUser = () => {
  const [shareData, setShareData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  const columns = [
    {
      name: "slNo",
      label: "SL No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "no_of_counts",
      label: "Views",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    responsive: "standard",
    viewColumns: false,
  };

  useEffect(() => {
    const fetchShareUser = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const resposne = await axios.get(
          `${BASE_URL}/api/panel-fetch-share-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setShareData(resposne.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShareUser();
    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="mt-5 ">
        <MUIDataTable
          title={"Share User List"}
          data={shareData ? shareData?.new_user : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default ShareUser;
