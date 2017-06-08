// Client entry point, imports all client code

/*import '/imports/startup/client';
import '/imports/startup/both';*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


//Material-ui components
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import HomeIcon from 'material-ui/svg-icons/action/home';
import RaisedButton from 'material-ui/RaisedButton';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import '../imports/startup/accounts-config.js';

//routes
import Home from '../imports/ui/pages/Home/Home';
import SignIn from '../imports/ui/pages/user/AuthPageSignIn';
import Join from '../imports/ui/pages/user/AuthPageJoin';
import MijnFiches from '../imports/ui/pages/Fiches/MijnFiches';
import ToevoegenFiche from '../imports/ui/pages/Fiches/Toevoegen';
import ViewFiche from '../imports/ui/pages/Fiches/View';
import EditFiche from '../imports/ui/pages/Fiches/bewerken';

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
                <div style={{marginBottom: "15px"}}>
                  <img src="/img/Entiteitslogo2_AWV.jpg" style={{maxWidth:"160px", maxHeight:"80px"}} />
                </div>
                <RaisedButton
                  href="/"
                  label="Fiche Toevoegen"
                  primary={true}
                  containerElement={<Link to="/fiches/Toevoegen" title="Mijn Fiches" />}
                />
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
              <Route exact path="/registeren" component={Join} />
              <Route exact path="/aanmelden" component={SignIn} />
              <Route exact path="/mijnFiches" component={MijnFiches}/>
              <Route exact path="/fiches/Toevoegen" component={ToevoegenFiche}/>
              <Route exact path="/fiches/view/:ficheId" component={ViewFiche}/>
              <Route exact path="/fiches/edit/:ficheId" component={EditFiche}/>
            </div>
          </section>
        </MuiThemeProvider>
      </Router>
  , document.getElementById('app'));
});
