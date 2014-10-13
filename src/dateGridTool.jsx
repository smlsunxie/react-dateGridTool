/** @jsx React.DOM */
var DateCell = React.createClass({
  getInitialState: function() {

    return {
      day: this.props.day,
      hour: this.props.hour,
      selected: false
    };
  },

  hourMouseDown: function(){
    if(this.state.selected === false)
      this.setState({selected: true});
    else this.setState({selected: false});

    if(this.state.selected === true) this.setState({selectedClassName: "hourStatus-selected"});
    else this.setState({selectedClassName: ""});

  },



  render: function() {

    var className = ""

    if(this.props.day % 3 === 0) className = "_516n _516l _516m";
    if(this.props.day % 3 === 1) className = "_516p _516l _516m";
    if(this.props.day % 3 === 2) className = "_516o _516l _516m";


    var selectdClassName = "";
    if(this.state.selected === true) selectdClassName = "hourStatus-selected"

    if (selectdClassName !== "") className += " "+selectdClassName;

    console.log("className", className);


    return <div id="hourGrid" mousedown={this.hourMouseDown()} mouseover="hourMouseOver(hour)" className={className}></div>;
  }
});

var DateGridToolApp = React.createClass({
  // getInitialState: function() {
  //   return {items: [], text: ''};
  // },
  // onChange: function(e) {
  //   this.setState({text: e.target.value});
  // },
  // handleSubmit: function(e) {
  //   e.preventDefault();
  //   var nextItems = this.state.items.concat([this.state.text]);
  //   var nextText = '';
  //   this.setState({items: nextItems, text: nextText});
  // },
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
        <DateCell day="0" hour="0" />
      </div>
    );
  }
});

React.renderComponent(<DateGridToolApp />, document.getElementById("test"));
