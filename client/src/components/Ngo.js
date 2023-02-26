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
    // <div
    //   className="card p-2 cursor-pointer"
    //   onClick={() => navigate(`/view-ngo-data/${ngo._id}`)}
    // >
    //   <h1 className="card-title">{ngo.name}</h1>
    //   <hr />
    //   <p>
    //     <b>Type : </b>
    //     {ngo.type}
    //   </p>
    //   <p>
    //     <b>Phone Number : </b>
    //     {ngo.phoneNumber}
    //   </p>
    //   <p>
    //     <b>Address : </b>
    //     {ngo.address}
    //   </p>
    //   <p>
    //     <b>Timings : </b>
    //     {ngo.timings[0]} - {ngo.timings[1]}
    //   </p>
    // </div>
    <Card
      className="ant-card"
      sx={{
        maxWidth: 345,
        marginBottom: "20px",
      }}
      // style={{
      //   boxShadow: "rgba(151, 65, 252, 0.2) 0 15px 30px -5px",
      //   backgroundImage: "linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB)",
      // }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#bab86c" }} aria-label="recipe">
            {ngo.name[0]}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={ngo.name}

        // subheader={ngo.timings[0] + "-" + ngo.timings[1]}
      />
      <CardMedia component="img" height="200" image={ngo.logo} alt="Logo" />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "18px",
            boxShadow: "2px 2px 2px rgb(172, 171, 171)",
            borderRadius: "0",
          }}
        >
          <b>NAME : </b>
          {ngo.name}
          <br></br>
          <b>TYPE : </b>
          {ngo.type}
          <br></br>
          <b>WEBSITE : </b>
          {ngo.website}
          <br></br>
          <b>EXPERIENCE : </b>
          {ngo.experience}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => navigate(`/view-ngo-data/${ngo._id}`)}
        >
          {/* <Button
            className="expand-btn"
            variant="contained"
            style={{
              backgroundColor: "#bab86c",
              fontFamily: "Oswald, sans-serif",
              fontSize: "17px",
              display: "inline-block",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid",
              boxShadow: "10px",
              fontWeight: "lighter",
              letterSpacing: "2px",
              padding: "10px 20px",
              marginRight: "0px",
            }}
          >
            Expand
          </Button> */}

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
