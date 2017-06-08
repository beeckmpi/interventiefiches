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

//styles
const itemStyle = {fontSize:"smaller", margin:'15px 0px 6px 0px'};

class ViewFiche extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { loading, fiche } = this.props
    if(!this.props.loading){
      console.log(this.props);
      return (
        <div className="container" style={{margin:"10px 30px 40px 230px", padding:"5px 8px 15px 8px"}}>
          <h3 style={{color:"#fff", marginLeft:"30px"}}>Fiche {loading ? fiche.data.fichenummer : ' ' }</h3>
          <Paper id="content" style={{padding:"15px 15px 15px 15px", position: "relative"}}>
            
            <div style={{position:"absolute", right:"15px", top:"5px", width:"100px"}}>
              <RaisedButton
                label="In behandeling nemem"
                primary={true}
              />
            </div>
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
          </Paper>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }
}
ViewFiche.propTypes = {
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
}, ViewFiche);
