/** @jsx React.DOM */
var DateCell = React.createClass({
  getInitialState: function() {

    return {
      selected: false
    };
  },

  hourMouseDown: function(){
    if(this.state.selected === false)
      this.setState({selected: true});
    else this.setState({selected: false});
  },

  render: function() {

    var className = ""
    if(this.props.hour % 3 === 0) className = "_516n _516l _516m";
    if(this.props.hour % 3 === 1) className = "_516p _516l _516m";
    if(this.props.hour % 3 === 2) className = "_516o _516l _516m";


    var selectdClassName = "";
    if(this.state.selected === true) selectdClassName = "hourStatus-selected"
    if(selectdClassName !== "") className += " " + selectdClassName;


    return <div id="hourGrid" onMouseDown={this.hourMouseDown} mouseover="hourMouseOver(hour)" className={className}></div>;
  }
});

var DateRow = React.createClass({


  render: function() {

    var hours = []
    for (var i = 0; i < 24; i++) {
      hours.push(<DateCell day={this.props.day} hour={i} handleHourMouseDown={this.props.handleHourMouseDown} startHour={this.props.start} />);
    }

    var className = ""
    if(this.props.day == 0) className = "_8-v _516k clearfix";
    else if(this.props.day == 7) className = "_8-x _516k clearfix";
    else className = "_516k clearfix";


    return (
      <div className={className}>
        <div className="bt-view bt-view _516l _516q">
          <div className="_516r">{this.props.title}</div>
        </div>

        <div className="bt-view bt-view">
          {hours}
        </div>
      </div>
    );
  }
});



var DateGridToolApp = React.createClass({
  getInitialState: function() {
    return {
      startHour: {},
      overHour: {}
    };
  },

  handleHourMouseDown: function(hour){
    this.setState({startHour: hour});
  },
  handleHourMouseOver: function(hour){
    this.setState({overHour: hour});
  },


  render: function() {


    return (

      <div className="bt-view bt-view bt-day-parting-grid-view">
        <div className="_52t2 clearfix">
          <div className="_8-y">12am</div>
          <div className="_8-z"></div>
          <div className="_8-z"></div>
          <div className="_8-y">3am</div>
          <div className="_8-z"></div>
          <div className="_8-z"></div>
          <div className="_8-y">6am</div>
          <div className="_8-z"></div>
          <div className="_8-z"></div>
          <div className="_8-y">9am</div>
          <div className="_8-z"></div>
          <div className="_8-z"></div>
          <div className="_8-y">12pm</div>
          <div className="_8-z"></div>
          <div className="_8-z"></div>
          <div className="_8-y">3pm</div>
          <div className="_8-z"></div>
          <div className="_8-z"></div>
          <div className="_8-y">6pm</div>
          <div className="_8-z"></div>
          <div className="_8-z"></div>
          <div className="_8-y">9pm</div>
          <div className="_8-z"></div>
          <div className="_8-z"></div>
          <div className="_8_p">All Day</div>
        </div>
        <DateRow day="0" title="Monday" handleHourMouseDown={this.handleHourMouseDown} startHour={this.state.start} />
        <DateRow day="1" title="Tuesday" />
        <DateRow day="2" title="Wednesday" />
        <DateRow day="3" title="Thursday" />
        <DateRow day="4" title="Friday" />
        <DateRow day="5" title="Saturday" />
        <DateRow day="6" title="Sunday" />

      </div>
    );
  }
});

React.renderComponent(<DateGridToolApp />, document.getElementById("test"));
