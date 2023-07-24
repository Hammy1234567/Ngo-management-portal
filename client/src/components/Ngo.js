import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
function Ngo({ ngo }) {
  const navigate = useNavigate();
  return (
    <Card
      className="ant-card"
      sx={{
        maxWidth: 345,
        marginBottom: "20px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#E96479" }} aria-label="recipe">
            {ngo.name[0]}
          </Avatar>
        }
        style={{ fontFamily: "Oswald, sans-serif", fontWeight: "bold" }}
        title={ngo.name}

        // subheader={ngo.timings[0] + "-" + ngo.timings[1]}
      />
      <CardMedia
        component="img"
        height="200"
        image={ngo.logo}
        style={{ objectFit: "contain" }}
        alt="Logo"
      />

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "18px",
            boxShadow: "0 3px 3px 3px 0 rgb(172, 171, 171)",
            borderRadius: "0",
          }}
          className="typography"
        >
          <b>NAME : </b>
          <span className="ngo_heading">{ngo.name}</span>
          <br></br>
          <b>TYPE : </b>
          <span className="ngo_heading">{ngo.type}</span>
          <br></br>
          <b>WEBSITE : </b>
          <span className="ngo_heading">{ngo.website}</span>
          <br></br>
          <b>EXPERIENCE : </b>
          <span className="ngo_heading">{ngo.experience}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => navigate(`/view-ngo-data/${ngo._id}`)}
        >
          <Button class="button">
            <span class="button_lg">
              <span class="button_sl"></span>
              <span class="button_text">Expand</span>
            </span>
          </Button>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Ngo;
