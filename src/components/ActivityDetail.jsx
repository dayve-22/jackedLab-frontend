import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityDetail } from "../services/api";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

const ActivityDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        console.log("Fetching activity detail for ID:", id);
        const response = await getActivityDetail(id);
        console.log("Activity detail response:", response.data);
        setDetail(response.data);
      } catch (error) {
        console.error("Error fetching activity detail:", error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (!detail) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Activity Detasils
          </Typography>
          <Typography>Activity Type: {detail.activityType}</Typography>
          <Typography>
            Date: {new Date(detail.createdAt).toLocaleString()}
          </Typography>
          <Typography>User ID: {detail.userId}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            AI Recommendation
          </Typography>

          <Typography variant="h6">Analysis</Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {detail.analysis}
          </Typography>

          {detail.improvements?.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Improvements</Typography>
              {detail.improvements.map((item, i) => (
                <Typography key={i} paragraph>
                  • {item}
                </Typography>
              ))}
            </>
          )}

          {detail.suggestions?.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Suggestions</Typography>
              {detail.suggestions.map((item, i) => (
                <Typography key={i} paragraph>
                  • {item}
                </Typography>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityDetail;
