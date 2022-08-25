import React from 'react';
import {getData} from "../actions/api";
import {Card, InputLabel, MenuItem, Grid, TextField, Button, CardContent,Typography} from "@mui/material";
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
const MenuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    }
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCurrency: [],
          isLoading: true
        };
    }
  componentDidMount() {
    getData().then(
      result => {
        this.setState({
          allCurrency: result,
          isLoading: false,
          convertFrom: 1,
          convertTo: null,
          amount: 1,
          worth: undefined
        })
      }
    );
  }
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };
  handleAmount = event => {
    this.setState({amount: event.target.value});
  };
  calculate = (convertFrom,convertTo, amount) =>{
    if(!convertFrom || !convertTo || !amount){
      this.setState({worth: "vul alles in"});
      return
    } 
    var waarde = (amount * convertTo  / convertFrom).toFixed(2);
    this.setState({worth: waarde}, () => {
      console.log(this.state.worth);
   });
  }
  getImg = (name) =>{
      let image = 'http://dion.bjornhorst.com/' + name.toLowerCase() + '.png'; //get the images
      return image
  }
  switchButton = (fromCur, toCur) => {
    this.setState({convertFrom: toCur});
    this.setState({convertTo: fromCur});
  }
    render() {
        const {
            allCurrency,
            isLoading,
        } = this.state;
        if (isLoading) {
            return null;
        }

        return (
          <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          style={{backgroundColor: "#D6D7D6"}}
          >
            <Card elevation={5} className="Card">
              <Typography gutterBottom variant="h5" component="div">
                Currecy converter
              </Typography>
              <CardContent>
                <Grid container>
                  <Grid item md={5} xs={12}>
                    <Grid container>
                      <Grid item md={12}>
                        <InputLabel className='firstSelect'>Van</InputLabel>
                        <Select
                          label="Van"
                          value={this.state.convertFrom}
                          onChange={this.handleChange}
                          className='inputFields'
                          inputProps={{
                            name: "convertFrom",
                          }}
                          MenuProps={MenuProps}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {Object.entries(allCurrency.rates).map(([ratesName, ratesValue]) =>{
                            return (
                              <MenuItem key={ratesName} value={ratesValue}>
                                <img className='image' alt={ratesName + "_logo -"} src={this.getImg(ratesName)}/>
                                <Typography display="inline">- {ratesName}</Typography>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>
                      <Grid item md={12} className="amountContainer">
                        <InputLabel>Hoeveelheid</InputLabel>
                        <TextField type="number" className='amountField' onChange={this.handleAmount} value={this.state.amount}></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Button className='switchButton' onClick={() => this.switchButton(this.state.convertFrom, this.state.convertTo)}variant='outlined'><SwapHorizIcon/></Button>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <Grid container className=''>
                      <Grid item md={12}>
                        <InputLabel>Naar</InputLabel>
                        <Select
                          value={this.state.convertTo}
                          onChange={this.handleChange}
                          className='inputFields'
                          inputProps={{
                            name: "convertTo",
                          }}
                          MenuProps={MenuProps}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {Object.entries(allCurrency.rates).map(([ratesName, ratesValue]) =>{
                            return (
                              <MenuItem key={ratesName} value={ratesValue}>
                                <img className='image' alt={ratesName + "_logo -"}  src={this.getImg(ratesName)}/>
                                <Typography display="inline">- {ratesName}</Typography>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>
                      <Grid item md={12} className="amountContainer">
                        <InputLabel>Hoeveelheid</InputLabel>
                        <TextField   inputProps={{style: {fontWeight: "bold", color: 'black'}}}  className='amountField' disabled value={this.state.worth}></TextField>
                      </Grid>

                    </Grid>

                  </Grid>
                  <Grid item md={12} className='calculateButton'>
                      <Button  sx={{mt:5}} onClick={() => this.calculate(this.state.convertFrom, this.state.convertTo, this.state.amount)}variant='contained'>Bereken</Button>
                    </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );
    }
}
export default Home;