import React, { useContext, useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import MUIDataTable from "mui-datatables";
import {
  Card,
  CardBody,
  CardHeader,

  Typography,

} from "@material-tailwind/react";
import { ButtonConfig } from "../../config/ButtonConfig";

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const resposne = await axios.get(
          `${BASE_URL}/api/panel-fetch-contact`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setContactData(resposne?.data?.contact);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
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
        name: "contact_name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "contact_email",
        label: "Email",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "contact_mobile",
        label: "Mobile",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "contact_message",
        label: "Message",
        options: {
          filter: true,
          sort: false,
        },
      },
    ],
    [contactData]
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

  const data = useMemo(() => (contactData ? contactData : []), [contactData]);

  return (
    <Layout>
        <div className="container mx-auto mt-5">
        <Card className={`p-8 bg-gradient-to-r  px-8 py-5 border  ${ButtonConfig.borderCard} hover:shadow-2xl transition-shadow duration-300`}>
                 <CardHeader className={`text-center border ${ButtonConfig.borderCard} rounded-lg shadow-lg p-0 mb-6`}>
            <Typography variant="h4" color={ButtonConfig.typographyColor}  className="font-bold">
            Contact List from Website
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
          <MUIDataTable
          // title={"Contact List from Website"}
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

export default Contact;

// panel-fetch-contact
