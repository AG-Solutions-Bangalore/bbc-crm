import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { FaEdit } from "react-icons/fa";
import { HiOutlineSave } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button, 
  TextField 
} from "@mui/material";

const MissionVission = () => {
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  
  // Mission & Vision states
  const [openDialog, setOpenDialog] = useState(false);
  const [missionVision, setMissionVision] = useState({
    product_mission: "",
    product_vision: ""
  });
  const [missionVisionId, setMissionVisionId] = useState(null);
  const [hasMissionVision, setHasMissionVision] = useState(false);

  useEffect(() => {
    const fetchMissionVision = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-mission-vision`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Updated to match the actual API response structure
        if (response.data && response.data.mission_vision) {
          setMissionVision({
            product_mission: response.data.mission_vision.product_mission || "",
            product_vision: response.data.mission_vision.product_vision || ""
          });
          setMissionVisionId(response.data.mission_vision.id);
          setHasMissionVision(true);
        }
      } catch (error) {
        console.error("Error fetching mission & vision data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissionVision();
  }, [isPanelUp, navigate]);

  // Mission & Vision functions for dialog creation
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDialogInputChange = (e) => {
    setMissionVision({
      ...missionVision,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateMissionVision = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Create new mission & vision
      await axios.post(
        `${BASE_URL}/api/panel-create-mission-vision`,
        missionVision,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Mission & Vision Created Successfully");
      
      handleCloseDialog();
      
      // Refresh the data
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-mission-vision`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data && response.data.mission_vision) {
        setMissionVision({
          product_mission: response.data.mission_vision.product_mission || "",
          product_vision: response.data.mission_vision.product_vision || ""
        });
        setMissionVisionId(response.data.mission_vision.id);
        setHasMissionVision(true);
      }
    } catch (error) {
      console.error("Error creating mission & vision", error);
      toast.error("Error creating Mission & Vision");
    } finally {
      setLoading(false);
    }
  };

  // Direct page update functions (like in About component)
  const handleInputChange = (e) => {
    setMissionVision({
      ...missionVision,
      [e.target.name]: e.target.value
    });
    setIsUpdated(true);
  };

  const handleUpdateMissionVision = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      await axios.put(
        `${BASE_URL}/api/panel-update-mission-vision/${missionVisionId}`,
        missionVision,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("Mission & Vision Updated");
      setIsUpdated(false);
    } catch (error) {
      console.error("Error updating mission & vision", error);
      toast.error("Error updating Mission & Vision");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "white",
              marginTop: "48px",
              padding: "12px",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
              marginTop: "48px",
              padding: "12px",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Mission & Vision</h1>
            {!hasMissionVision && (
              <button
                onClick={handleOpenDialog}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                disabled={loading}
              >
                <FaTasks className="inline mr-2" />
                Create Mission & Vision
              </button>
            )}
          </div>

          {/* If mission/vision exists, show editable form directly on page */}
          {hasMissionVision && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mission
                </label>
                <textarea
                  name="product_mission"
                  value={missionVision.product_mission}
                  onChange={handleInputChange}
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none"
                  placeholder="Enter your company's mission"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vision
                </label>
                <textarea
                  name="product_vision"
                  value={missionVision.product_vision}
                  onChange={handleInputChange}
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none"
                  placeholder="Enter your company's vision"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleUpdateMissionVision}
                  disabled={!isUpdated || loading}
                  className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition flex items-center ${
                    !isUpdated || loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <HiOutlineSave className="mr-2" />
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => navigate("/home")}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                >
                <p className="flex flex-row gap-2">  <FaEdit className="" />
                <span> Cancel</span></p>
                </button>
              </div>
            </>
          )}
          
          {/* If no mission/vision exists, show a message */}
          {!hasMissionVision && !loading && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-600">No mission and vision statements have been created yet.</p>
              <p className="text-gray-600 mt-2">Click the "Create Mission & Vision" button to add them.</p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog ONLY for creating mission & vision */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Create Mission & Vision</DialogTitle>
        <DialogContent>
          <div className="mt-4">
            <TextField
              label="Mission"
              name="product_mission"
              value={missionVision.product_mission}
              onChange={handleDialogInputChange}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Vision"
              name="product_vision"
              value={missionVision.product_vision}
              onChange={handleDialogInputChange}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog} 
            color="secondary" 
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateMissionVision} 
            color="primary" 
            variant="contained"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default MissionVission;