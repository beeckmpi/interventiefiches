// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment-es6';
import PropTypes from 'prop-types';

// imports
import { Fiches } from '../../../api/fiches/fiches';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import Vaststelling from '../../components/vaststelling';
import Beslissing from '../../components/Beslissing';
import Tijdstippen from '../../components/Tijdstippen';

//styles
const itemStyle = {fontSize:"smaller", margin:'15px 0px 6px 0px'};
const arrowDownStyles = {height:"40px", position:"absolute", "right": "5px", "top": "18px", width:"40px"};
const paperStyle = {position:"relative", transition: "max-height 0.6s ease-in-out", padding:"5px 15px", width: "95%", margin: '20px auto'};
const closedStyle = {height: "30pt"}
const openStyle = {height: "auto"}

class EditFiche extends Component {
  constructor(props) {
    super(props);
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
    const { loading, fiche } = this.props
    if(!this.props.loading){
      console.log(this.props);
      const { provinciaal_, provinciaalC, vaststelling_, vaststellingC, beslissingC, beslissing_, tijdstippenC, tijdstippen_, bijkomendeC, bijkomende_, bijlagesC, bijlages_, afmeldingC, afmelding_ }= this.state;
      return (
        <div className="container" style={{margin:"10px 30px 40px 230px", padding:"5px 8px 15px 8px"}}>
          <h3 style={{color:"#fff", marginLeft:"30px"}}>Fiche Bewerken {loading ? fiche.data.fichenummer : ' ' }</h3>
          <Paper id="content" style={{padding:"1px 15px 15px 15px", position: "relative"}} className={provinciaalC} >
            <div className="clickBox" onTouchTap={() => this.showHide('provinciaalC', 'provinciaal_', provinciaal_)}></div>
            { (provinciaal_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <h3>Gegeven Provinciaal Coördinator</h3>
            <section className={provinciaal_}>
              <div style={{display:"inline-block"}}>
                De oproep kwam binnen op <strong>{moment(fiche.data.opDatum).format('DD-MM-YYYY')} {moment(fiche.data.oproep).format('HH:MM')}</strong> en werd ontvangen door <strong>{fiche.data.provinciaalCoordinator}</strong>.
              </div>
              <div>
                <div style={itemStyle}>Bijkomende informatie:</div>
                {fiche.data.bijkomendeInformatie}
              </div>
              <div>
                <div style={itemStyle}>District:</div>
                <strong> {fiche.data.district}</strong>
              </div>
              <div>
                <div style={itemStyle}>Doorgegeven aan:</div>
                <strong>{fiche.data.doorgegevenAan}</strong>
              </div>
              <div>
                <div style={itemStyle}>Oproep door:</div>
                {fiche.data.oproepDoor=="Andere" &&
                  <div><strong>{fiche.data.andereOproep}</strong></div>
                }
                {fiche.data.oproepDoor!="Andere" &&
                  <div><strong>{fiche.data.oproepDoor}</strong></div>
                }
              </div>
              <div>
                <div style={itemStyle}>Melding:</div>
                {fiche.data.melding=="Andere" &&
                  <div><strong>{fiche.data.andereMelding}</strong></div>
                }
                {fiche.data.melding!="Andere" &&
                  <div><strong>{fiche.data.melding}</strong></div>
                }
              </div>
              <div>
                <div style={itemStyle}>Locatie:</div>
                {fiche.data.weg!="" &&
                  <div>Op de <strong>{fiche.data.weg}</strong> in <strong>{fiche.data.grondgebied}</strong> richting <strong>{fiche.data.rijrichting}</strong></div>
                }
                {fiche.data.gewestweg!="" &&
                  <div>Op de <strong>{fiche.data.gewestweg}</strong>  richting <strong>{fiche.data.richting}</strong></div>
                }
                {fiche.data.kmPuntVan!="" &&
                  <div>Van kilometerpunt <strong>{fiche.data.kmPuntVan}</strong> tot kilometerpunt <strong>{fiche.data.kmPuntTot}</strong></div>
                }
                {fiche.data.straat!="" &&
                  <div>In de <strong>{fiche.data.straat}</strong>, nummer <strong>{fiche.data.huisnummer}</strong></div>
                }
              </div>
              {fiche.data.opmerkingBereikbaarheid!="" &&
                <div>
                  <div style={itemStyle}>Opmerking bereikbaarheid:</div>
                  <div>{fiche.data.opmerkingBereikbaarheid}</div>
                </div>
              }
            </section>
          </Paper>
          <Paper style={paperStyle} className={vaststellingC}>
            <div className="clickBox" onTouchTap={() => this.showHide('vaststellingC', 'vaststelling_', vaststelling_)}></div>
            { (vaststelling_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <h3>Vaststelling</h3>
            <div><Vaststelling className={vaststelling_}/></div>
          </Paper>
          <Paper style={paperStyle} className={beslissingC}>
            <div className="clickBox" onTouchTap={() => this.showHide('beslissingC', 'beslissing_', beslissing_)}></div>
            { (beslissing_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <h3>Beslissing oproep bijstand</h3>
            <div className={beslissing_}><Beslissing /></div>
          </Paper>
          <Paper style={paperStyle} className={tijdstippenC}>
            <div className="clickBox" onTouchTap={() => this.showHide('tijdstippenC', 'tijdstippen_', tijdstippen_)}></div>
            { (tijdstippen_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <h3>Tijdstippen + Middelen uitvoering</h3>
            <div className={tijdstippen_}><Tijdstippen /></div>
          </Paper>
          <Paper style={paperStyle} className={bijkomendeC}>
            <div className="clickBox" onTouchTap={() => this.showHide('bijkomendeC', 'bijkomende_', bijkomende_)}></div>
            { (bijkomende_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <h3>Bijkomende details vaststellingen</h3>
          </Paper>
          <Paper style={paperStyle} className={bijlagesC}>
            <div className="clickBox" onTouchTap={() => this.showHide('bijlagesC', 'bijlages_', bijlages_)}></div>
            { (bijlages_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <h3>Bijlages</h3>
          </Paper>
          <Paper style={paperStyle} className={afmeldingC}>
            <div className="clickBox" onTouchTap={() => this.showHide('afmeldingC', 'afmelding_', afmelding_)}></div>
            { (afmelding_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
            <h3>Afmelding</h3>
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
};

export default createContainer(({ match }) => {
  const postHandle = Meteor.subscribe('fiches');
  const _id = match.params.ficheId;
  const loading = !postHandle.ready();
  const fiche = Fiches.findOne({'_id': _id});
  return {
    loading,
    fiche
  };
}, EditFiche);
