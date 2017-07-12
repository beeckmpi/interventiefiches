// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment-es6';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// imports
import { Fiches } from '../../../api/fiches/fiches';
import Images from '../../../api/files/files';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Send from 'material-ui/svg-icons/content/send';
import Save from 'material-ui/svg-icons/content/save';
import Back from 'material-ui/svg-icons/navigation/arrow-back';

import Provinciaal from '../../components/view/Provinciaal';
import Vaststelling from '../../components/edit/vaststelling';
import Beslissing from '../../components/edit/Beslissing';
import Tijdstippen from '../../components/edit/Tijdstippen';
import Bijkomende from '../../components/edit/Bijkomende';
import Bijlages from '../../components/edit/Bijlages';

//styles
const itemStyle = {fontSize:"smaller", margin:'15px 0px 6px 0px'};
const arrowDownStyles = {height:"40px", position:"absolute", "right": "5px", "top": "18px", width:"40px"};
const paperStyle = {position:"relative", transition: "max-height 0.6s ease-in-out", padding:"5px 15px", width: "95%", margin: '20px auto'};
const closedStyle = {height: "30pt"}
const openStyle = {height: "auto"}

class EditFiche extends Component {
  constructor(props) {
    super(props);
    const data = {};
    this.state = {
      provinciaal_: 'open',
      provinciaalC: 'parentP open',
      vaststelling_: 'closed',
      vaststellingC: 'parentP closed',
      beslissing_: 'closed',
      beslissingC: 'parentP closed',
      tijdstippen_: 'closed',
      tijdstippenC: 'parentP closed',
      bijkomende_: 'closed',
      bijkomendeC: 'parentP closed',
      bijlages_: 'closed',
      bijlagesC: 'parentP closed',
      afmelding_: 'closed',
      afmeldingC: 'parentP closed',
    };
  }

  showHide = (parent, id, status) => {
    if (status == 'closed'){
      this.setState({[parent]:'parentP open'});
      this.setState({[id]:'open'});
    } else {
      this.setState({[parent]:'parentP closed'});
      this.setState({[id]:'closed'});
    }
  }

  render() {
    const { loading, fiche, imageFiles, docsReadyYet } = this.props;
    if(!this.props.loading){
      const edit_link = "/fiches/view/"+fiche._id;
      const { provinciaal_, provinciaalC, vaststelling_, vaststellingC, beslissingC, beslissing_, tijdstippenC, tijdstippen_, bijkomendeC, bijkomende_, bijlagesC, bijlages_, afmeldingC, afmelding_ }= this.state;
      return (
        <div className="container" style={{margin:"10px 30px 40px 230px", padding:"5px 8px 15px 8px"}}>
          <div style={{position: "absolute", right: "67px", top:"22px"}}>
            <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} labelPosition="before" primary={true} label="Alles bewaren" icon={<Save />} />
            <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} labelPosition="before" secondary={true} label="Alles bewaren en doorsturen" icon={<Send />} />
          </div>
          <h3 style={{color:"#fff", margin:"0pt 20pt 5pt 20pt"}}>
            <IconButton tooltip="Terug" touch={true} tooltipPosition="bottom-center" iconStyle={{color:"#FFFFFF", marginBottom: '-3pt'}} containerElement={<Link to={edit_link} />}>
              <Back />
            </IconButton>Fiche Bewerken {loading ? fiche.data.fichenummer : ' ' }
          </h3>
          <Paper id="content" style={{padding:"1px 15px 15px 15px", position: "relative"}} className={provinciaalC} >
            <div className="clickBox" onTouchTap={() => this.showHide('provinciaalC', 'provinciaal_', provinciaal_)}></div>
            { (provinciaal_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <div className="catTitle">Gegeven Provinciaal Coördinator</div>
            <div><Provinciaal className={provinciaal_} fiche={fiche} /></div>
          </Paper>
          <Paper style={paperStyle} className={vaststellingC}>
            <div className="clickBox" onTouchTap={() => this.showHide('vaststellingC', 'vaststelling_', vaststelling_)}></div>
            { (vaststelling_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <div className="catTitle">Vaststelling</div>
            <div><Vaststelling classNameProp={vaststelling_} fiche={fiche.vaststellingen} ficheId={fiche._id} key={'vaststelling_'+fiche._id} /></div>
          </Paper>
          <Paper style={paperStyle} className={beslissingC}>
            <div className="clickBox" onTouchTap={() => this.showHide('beslissingC', 'beslissing_', beslissing_)}></div>
            { (beslissing_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <div className="catTitle">Beslissing oproep bijstand</div>
            <div><Beslissing  classNameProp={beslissing_} fiche={fiche.beslissingen} ficheId={fiche._id} key={'beslissing_'+fiche._id} /></div>
          </Paper>
          <Paper style={paperStyle} className={tijdstippenC}>
            <div className="clickBox" onTouchTap={() => this.showHide('tijdstippenC', 'tijdstippen_', tijdstippen_)}></div>
            { (tijdstippen_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <div className="catTitle">Tijdstippen + Middelen uitvoering</div>
            <div className={tijdstippen_}><Tijdstippen fiche={fiche.tijdstippen} ficheId={fiche._id} key={'tijdstippen_'+fiche._id} /></div>
          </Paper>
          <Paper style={paperStyle} className={bijkomendeC}>
            <div className="clickBox" onTouchTap={() => this.showHide('bijkomendeC', 'bijkomende_', bijkomende_)}></div>
            { (bijkomende_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <div className="catTitle">Bijkomende details vaststellingen</div>
            <div className={bijkomende_}><Bijkomende fiche={fiche} key={'bijkomende_'+fiche._id} /></div>
          </Paper>
          <Paper style={paperStyle} className={bijlagesC}>
            <div className="clickBox" onTouchTap={() => this.showHide('bijlagesC', 'bijlages_', bijlages_)}></div>
            { (bijlages_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <div className="catTitle">Bijlages</div>
            <div className={bijlages_}><Bijlages key={fiche._id} ficheId={fiche._id} fiche={fiche} imageFiles={imageFiles}  /></div>
          </Paper>
          <Paper style={paperStyle} className={afmeldingC}>
            <div className="clickBox" onTouchTap={() => this.showHide('afmeldingC', 'afmelding_', afmelding_)}></div>
            { (afmelding_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <div className="catTitle">Afmelding</div>
          </Paper>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }
}
EditFiche.propTypes = {
  fiche: PropTypes.object,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  docsReadyYet: PropTypes.bool,
  imageFiles: PropTypes.array,
};

export default createContainer(({ match }) => {
  const postHandle = Meteor.subscribe('fiches');
  var handle = Meteor.subscribe('files.images.all');
  const _id = match.params.ficheId;
  const loading = !postHandle.ready();
  const fiche = Fiches.findOne({'_id': _id});
  return {
    loading,
    fiche,
    docsReadyYet: handle.ready(),
    imageFiles: Images.find().fetch() // Collection is UserFiles
  };
}, EditFiche);
