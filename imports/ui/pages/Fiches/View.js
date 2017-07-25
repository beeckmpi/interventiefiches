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
import { Personeelsleden } from '../../../api/personeelsleden/personeelsleden';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import PDF from 'material-ui/svg-icons/image/picture-as-pdf';
import Edit from 'material-ui/svg-icons/image/edit';

import Provinciaal from '../../components/view/Provinciaal';
import Vaststelling from '../../components/view/vaststelling';
import Beslissing from '../../components/view/beslissing';
import Tijdstippen from '../../components/view/tijdstippen';
import Bijkomende from '../../components/view/bijkomende';
import Bijlages from '../../components/edit/Bijlages';
//styles
const itemStyle = {fontSize:"smaller", margin:'15px 0px 6px 0px'};
const arrowDownStyles = {height:"50px", position:"absolute", "right": "5px", "top": "8px", width:"40px"};
const paperStyle = {position:"relative", transition: "max-height 0.6s ease-in-out", padding:"5px 15px", width: "95%", margin: '20px auto'};
const closedStyle = {height: "25pt"}
const openStyle = {height: "auto"}

class ViewFiche extends Component {
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
      changeAll: false
    };
  }
  changeAll = () => {
    var C = '';
    if(this.state.changeAll){
      var C = 'closed';
    } else {
      var C = 'open';
    }
    this.setState({
      provinciaal_: C,
      provinciaalC: 'parentP '+C,
      vaststelling_: C,
      vaststellingC: 'parentP '+C,
      beslissing_: C,
      beslissingC: 'parentP '+C,
      tijdstippen_: C,
      tijdstippenC: 'parentP '+C,
      bijkomende_: C,
      bijkomendeC: 'parentP '+C,
      bijlages_: C,
      bijlagesC: 'parentP '+C,
      afmelding_: C,
      afmeldingC: 'parentP '+C,
      changeAll: !this.state.changeAll
    });
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
    const { loading, fiche, imageFiles } = this.props;
    if(!this.props.loading && !this.props.personeelLoading){
      const { provinciaal_, provinciaalC, vaststelling_, vaststellingC, beslissingC, beslissing_, tijdstippenC, tijdstippen_, bijkomendeC, bijkomende_, bijlagesC, bijlages_, afmeldingC, afmelding_ }= this.state;
      const edit_link = "/fiches/edit/"+fiche._id;
      return (
        <div className="container" style={{margin:"10px 30px 40px 230px", padding:"5px 8px 15px 8px", position: 'relative'}}>
          <div style={{position: "absolute", right: "37px", top:"15px", display:"flex"}}>
            <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} primary={true} label="PDF" icon={<PDF />} />
            {this.state.changeAll ? <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} secondary={true} label="Alles dichtschuiven" onClick={this.changeAll} icon={<ArrowUpward />} /> : <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} secondary={true} label="Alles openschuiven" onClick={this.changeAll} icon={<ArrowDownward />} /> }
            <RaisedButton style={{ fontSize:"smaller", fontWeight: "bold", marginLeft: '15pt'}} containerElement={<Link to={edit_link} />} primary={true} label="Bewerken" icon={<Edit />} />
          </div>
          <h3 style={{color:"#fff", marginLeft:"30px"}}>Fiche {loading ? fiche.data.fichenummer : ' ' }</h3>
          <Paper id="content" style={{padding:"1px 15px 15px 15px", position: "relative"}} >
            <div>
              <Paper style={paperStyle} className={provinciaalC}>
              <div className="clickBox" onTouchTap={() => this.showHide('provinciaalC', 'provinciaal_', provinciaal_)}></div>
              { (provinciaal_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
              <div className="catTitle">Gegeven Provinciaal Coördinator</div>
              <div><Provinciaal className={provinciaal_} fiche={fiche} /></div>
              </Paper>
            </div>
            <div>
              <Paper style={paperStyle} className={vaststellingC}>
              <div className="clickBox" onTouchTap={() => this.showHide('vaststellingC', 'vaststelling_', vaststelling_)}></div>
              { (vaststelling_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
              <div className="catTitle">Vaststelling</div>
              <div><Vaststelling classNameProp={vaststelling_} fiche={fiche.vaststellingen} ficheId={fiche._id} key={'vaststelling_'+fiche._id} /></div>
              </Paper>
            </div>
            <div>
              <Paper style={paperStyle} className={beslissingC}>
              <div className="clickBox" onTouchTap={() => this.showHide('beslissingC', 'beslissing_', beslissing_)}></div>
              { (beslissing_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
              <div className="catTitle">Beslissing oproep bijstand</div>
              <div><Beslissing  classNameProp={beslissing_} fiche={fiche.beslissingen} ficheId={fiche._id} key={'beslissing_'+fiche._id} /></div>
              </Paper>
            </div>
            <div>
              <Paper style={paperStyle} className={tijdstippenC}>
                <div className="clickBox" onTouchTap={() => this.showHide('tijdstippenC', 'tijdstippen_', tijdstippen_)}></div>
                { (tijdstippen_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
                <div className="catTitle">Tijdstippen + Middelen uitvoering</div>
                <div><Tijdstippen classNameProp={tijdstippen_} fiche={fiche.tijdstippen} ficheId={fiche._id} key={'tijdstippen_'+fiche._id} /></div>
              </Paper>
            </div>
            <div>
              <Paper style={paperStyle} className={bijkomendeC}>
                <div className="clickBox" onTouchTap={() => this.showHide('bijkomendeC', 'bijkomende_', bijkomende_)}></div>
                { (bijkomende_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
                <div className="catTitle">Bijkomende details vaststellingen</div>
                <div><Bijkomende classNameProp={bijkomende_} fiche={fiche} key={'bijkomende_'+fiche._id} /></div>
              </Paper>
            </div>
            <div>
              <Paper style={paperStyle} className={bijlagesC}>
                <div className="clickBox" onTouchTap={() => this.showHide('bijlagesC', 'bijlages_', bijlages_)}></div>
                { (bijlages_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
                <div className="catTitle">Bijlages</div>
                <div><Bijlages classNameProp={bijlages_} key={fiche._id} ficheId={'bijlages_'+fiche._id} fiche={fiche} imageFiles={imageFiles} /></div>
              </Paper>
            </div>
            <div>
              <Paper  style={paperStyle} className={afmeldingC}>
                <div className="clickBox" onTouchTap={() => this.showHide('afmeldingC', 'afmelding_', afmelding_)}></div>
                { (afmelding_=='closed') ? <KeyboardArrowDown style={arrowDownStyles} /> : <KeyboardArrowUp style={arrowDownStyles} /> }
                <div className="catTitle">Afmelding</div>
              </Paper>
            </div>
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
  docsReadyYet: PropTypes.bool,
  imageFiles: PropTypes.array,
};

export default createContainer(({ match }) => {
    const postHandle = Meteor.subscribe('fiches');
    var handle = Meteor.subscribe('files.images.all');
    const personeel = Meteor.subscribe('personeelsleden');
    const _id = match.params.ficheId;
    const loading = !postHandle.ready();
    const fiche = Fiches.findOne({'_id': _id});
    const personeelLoading = !personeel.ready();
  return {
    loading,
    personeelLoading,
    fiche,
    docsReadyYet: handle.ready(),
    imageFiles: Images.find().fetch(), // Collection is UserFiles
    personeelsleden: Personeelsleden.find().fetch(),

  };
}, ViewFiche);
