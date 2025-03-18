import React, { useContext, useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import {
  Card,
  CardBody,
  CardHeader,

  Typography,

} from "@material-tailwind/react";
import { ButtonConfig } from "../../config/ButtonConfig";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const resposne = await axios.get(
          `${BASE_URL}/api/panel-fetch-feedback`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFeedbackData(resposne?.data?.feedback);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
    setLoading(false);
  }, []);

  const columns = useMemo(
    () => [
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
        name: "feedback_name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "feedback_type",
        label: "Type",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "feedback_mobile",
        label: "Mobile",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "feedback_subject",
        label: "Subject",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "feedback_description",
        label: "Message",
        options: {
          filter: true,
          sort: false,
        },
      },
    ],
    [feedbackData]
  );

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    responsive: "standard",
    viewColumns: false,
    download: false,
    print: false,
  };

  const data = useMemo(
    () => (feedbackData ? feedbackData : []),
    [feedbackData]
  );

  return (
    <Layout>
      <div className="container mx-auto mt-5">
     <Card className={`p-8 bg-gradient-to-r  px-8 py-5 border  ${ButtonConfig.borderCard} hover:shadow-2xl transition-shadow duration-300`}>
              <CardHeader className={`text-center border ${ButtonConfig.borderCard} rounded-lg shadow-lg p-0 mb-6`}>
            <Typography variant="h4" color={ButtonConfig.typographyColor} className="font-bold">
            Feedback List
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
          <MUIDataTable
          // title={"Feedback List"}
          data={data}
          columns={columns}
          options={options}
        />
          </CardBody>
        </Card>
      </div>

    </Layout>
  );
};

export default Feedback;
