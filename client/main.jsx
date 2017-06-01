// Client entry point, imports all client code

/*import '/imports/startup/client';
import '/imports/startup/both';*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


//Material-ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

//routes
import Home from '../imports/ui/pages/Home/Home';
import MijnFiches from '../imports/ui/pages/Fiches/MijnFiches';
import ToevoegenFiche from '../imports/ui/pages/Fiches/Toevoegen';

// App component - represents the whole app
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

Meteor.startup(() => {
  ReactDOM.render(
      <Router>
        <MuiThemeProvider>
          <section>
            <div id="sideMenu" style={{position:"fixed", left:"0px", top:"0px", bottom: "0px", minWidth: "160pt", paddingTop: "20px", paddingLeft:"10px", zIndex:"120", background:"#263238" }}>
              <div id="top">
                <Menu style={{paddingLeft: "0px"}}>
                  <MenuItem  style={{color: "#ffffff"}} containerElement={<Link to="/mijnFiches" title="Mijn Fiches" />} primaryText="Mijn Fiches" />
                  <MenuItem  style={{color: "#ffffff"}} containerElement={<Link to="/ontvangenFiches" title="Ontvangen Fiches" />} primaryText="Ontvangen Fiches" />
                  <MenuItem  style={{color: "#ffffff"}} containerElement={<Link to="/alleFiches" title="Alle Fiches" />} primaryText="Alle Fiches" />
                </Menu>
              </div>
              <div id="bottom" style={{position: "fixed", bottom:"30px"}}>
                <MenuItem  style={{color: "#ffffff"}} containerElement={<Link to="/account" title="Account instellingen" />} primaryText="Account instellingen" rightIcon={<AccountCircleIcon style={{color:"#fff"}} />} />
                <MenuItem  style={{color: "#ffffff"}} containerElement={<Link to="/settings" title="Instellingen" />} primaryText="Instellingen" rightIcon={<SettingsIcon style={{color:"#fff"}} />} />
              </div>
            </div>
            <div>
              <Route exact path="/" component={Home}/>
              <Route exact path="/mijnFiches" component={MijnFiches}/>
              <Route exact path="/fiches/Toevoegen" component={ToevoegenFiche}/>
            </div>
          </section>
        </MuiThemeProvider>
      </Router>
  , document.getElementById('app'));
});
