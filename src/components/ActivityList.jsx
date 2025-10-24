import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material"; // ✅ use Grid instead of Grid2
import { useNavigate } from "react-router-dom"; // ✅ should come from react-router-dom, not react-router
import { getActivities } from "../services/api";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Grid container spacing={2}>
      {activities.map((activity) => (
        <Grid
          item
          key={activity.id}
          xs={12}
          sm={6}
          md={4}
          onClick={() => navigate(`/activities/${activity.id}`)}
        >
          <Card sx={{ cursor: "pointer" }}>
            <CardContent>
              <Typography variant="h6">{activity.type}</Typography>
              <Typography>Duration: {activity.duration}</Typography>
              <Typography>Calories: {activity.caloriesBurned}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;
