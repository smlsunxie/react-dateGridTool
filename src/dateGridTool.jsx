/** @jsx React.DOM */
var DateCell = React.createClass({


  hourMouseDown: function(){
    console.log("111");
    if(this.props.selected === false)
      this.setProps({selected: true});
    else this.setProps({selected: false});
  },

  render: function() {

    var className = ""
    if(this.props.hour % 3 === 0) className = "_516n _516l _516m";
    if(this.props.hour % 3 === 1) className = "_516p _516l _516m";
    if(this.props.hour % 3 === 2) className = "_516o _516l _516m";


    var selectdClassName = "";
    if(this.props.selected === true) selectdClassName = "hourStatus-selected"
    if(selectdClassName !== "") className += " " + selectdClassName;


    return <div id="hourGrid" onMouseDown={this.hourMouseDown} mouseover="hourMouseOver(hour)" className={className}></div>;
  }
});

var DateRow = React.createClass({


  render: function() {


    var className = ""
    if(this.props.day == 0) className = "_8-v _516k clearfix";
    else if(this.props.day == 7) className = "_8-x _516k clearfix";
    else className = "_516k clearfix";

    var hours = []


    for (var i = 0; i < this.props.hours.length; i++) {
      hours.push(DateCell(this.props.hours[i]));
    }


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
    var initObject = {
      week: [
        { title: "Monday", hours: [], allday: {}}
        , { title: "Tuesday", hours: [], allday: {}}
        , { title: "Wednesday", hours: [], allday: {}}
        , { title: "Thursday", hours: [], allday: {}}
        , { title: "Friday", hours: [], allday: {}}
        , { title: "Saturday", hours: [], allday: {}}
        , { title: "Sunday", hours: [], allday: {}
        }
      ],
      everyday: {
        title: "Everyday",
        hours: []
      },

      startHour: {},
      overHour: {}
    }

    for (var i = 0; i < initObject.week.length; i++) {
      for (var j = 0; j < 24; j++) {
        initObject.week[i].hours.push({day:i, hour:j, selected: false});
      }
    }


    return initObject;
  },

  handleHourMouseDown: function(hour){
    this.setState({startHour: hour});
  },
  handleHourMouseOver: function(hour){
    this.setState({overHour: hour});
  },


  render: function() {

    var dateGrid = []

    for (var i = 0; i < this.state.week.length; i++) {
      dateGrid.push(DateRow(this.state.week[i]));
    }


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
        {dateGrid}

      </div>
    );
  }
});

React.renderComponent(<DateGridToolApp />, document.getElementById("test"));
