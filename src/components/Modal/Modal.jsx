import {
  Modal as ModalBody,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import "./style/index.css";
import { useEffect, useState } from "react";
import { NotificationMessage } from "../Notifications/Notifications";
import { PersonPin } from "@mui/icons-material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, md: 500 },
  maxHeight: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const steps = ["¿Cual es el inicio?", "¿Cual es tu destino?"];

const Modal = ({
  openModal,
  handleModal,
  addRoute,
  deleteRoute,
  center: { lat, lon },
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [fromTxt, setFromTxt] = useState("");
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [toTxt, setToTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  function agregarRuta() {
    if (from.length === 0 || to.length === 0) {
      NotificationMessage("warning", "Debe completar los campos solicitados.");
      return;
    } else {
      deleteRoute();
      addRoute(from, to);
      handleModal();
    }
  }

  function handleNext() {
    if (from.length <= 0)
      NotificationMessage("warning", "No ha indicado una dirección válida.");
    else if (activeStep >= 1) setActiveStep(activeStep - 1);
    else setActiveStep(activeStep + 1);
  }

  async function getFrom() {
    if (lat !== 0 || lon !== 0) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      await axios.get(url).then(({ data: { lat, lon, display_name } }) => {
        setFromTxt(display_name);
        setFrom([lat, lon]);
      });
    }
  }

  function searchCity({ target: { value } }) {
    setLoading(true);
    activeStep <= 0 ? setFromTxt(value) : setToTxt(value);
    axios
      .get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)
      .then(({ data }) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getFrom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center">
      <ModalBody
        open={openModal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardContent>
            <Typography variant="h5" component="div">
              Inicio
            </Typography>
            <Stepper activeStep={activeStep}>
              {steps.map((label, i) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={i} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Grid content>
              <Grid item>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    {activeStep === 0
                      ? "¿Desde donde inicia el recorrido?"
                      : "¿Hasta donde llega el recorrido?"}
                  </InputLabel>
                  <OutlinedInput
                    id="from"
                    type={"test"}
                    value={activeStep === 0 ? fromTxt : toTxt}
                    onChange={(e) => searchCity(e)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          //   onClick={handleClickShowPassword}
                          //   onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          <PersonPin />
                        </IconButton>
                      </InputAdornment>
                    }
                    label={
                      activeStep === 0
                        ? "¿Desde donde inicia el recorrido?"
                        : "¿Hasta donde llega el recorrido?"
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{ maxHeight: { xs: 150, md: 300 }, overflow: "scroll" }}
            >
              {loading ? (
                <Grid item xs={12} textAlign={"center"}>
                  <CircularProgress />
                </Grid>
              ) : (
                places.map((vals, i) => (
                  <Grid
                    key={i}
                    item
                    xs={12}
                    textAlign={"left"}
                    className="item"
                    onClick={() => {
                      const data = { lat: vals.lat, lon: vals.lon };
                      activeStep === 0 ? setFrom(data) : setTo(data);
                      activeStep === 0
                        ? setFromTxt(vals.display_name)
                        : setToTxt(vals.display_name);
                      setPlaces([]);
                      setActiveStep(activeStep + 1);
                    }}
                  >
                    {vals.display_name}
                  </Grid>
                ))
              )}
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleModal}>
              Cerrar
            </Button>
            {activeStep === 0 ? (
              <Button size="small" onClick={handleNext}>
                Siguiente
              </Button>
            ) : (
              <>
                <Button size="small" onClick={handleNext}>
                  Atrás
                </Button>
                <Button size="small" onClick={agregarRuta}>
                  Mostrar
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </ModalBody>
    </div>
  );
};

export default Modal;
