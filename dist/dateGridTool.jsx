(function() {
  var DateCell, DateGridToolApp, DateRow, div;

  div = React.DOM.div;

  DateCell = React.createClass({
    getInitialState: function() {
      return {
        selected: false
      };
    },
    hourMouseDown: function() {
      if (this.state.selected === false) {
        this.setState({
          selected: true
        });
      } else {
        this.setState({
          selected: false
        });
      }
      this.props.handleHourMouseDown(this);
    },
    hourMouseOver: function() {
      this.props.handleHourMouseOver(this);
    },
    render: function() {
      var app, className, selectdClassName;
      className = "";
      if (this.props.hour % 3 === 0) {
        className = "_516n _516l _516m";
      }
      if (this.props.hour % 3 === 1) {
        className = "_516p _516l _516m";
      }
      if (this.props.hour % 3 === 2) {
        className = "_516o _516l _516m";
      }
      selectdClassName = "";
      if (this.state.selected === true) {
        selectdClassName = "hourStatus-selected";
      }
      if (selectdClassName !== "") {
        className += " " + selectdClassName;
      }
      app = div({
        id: "hourGrid",
        onMouseDown: this.hourMouseDown,
        onMouseOver: this.hourMouseOver,
        className: className
      });
      return app;
    }
  });

  DateRow = React.createClass({
    render: function() {
      var app, className, hours, i, _i;
      hours = [];
      for (i = _i = 0; _i <= 23; i = ++_i) {
        hours.push(DateCell({
          day: this.props.day,
          hour: i,
          handleHourMouseDown: this.props.handleHourMouseDown,
          handleHourMouseOver: this.props.handleHourMouseOver
        }));
      }
      className = "";
      if (this.props.day === 0) {
        className = "_8-v _516k clearfix";
      }
      if (this.props.day === 7) {
        className = "_8-x _516k clearfix";
      }
      if (this.props.day !== 7 && this.props.day !== 0) {
        className = "_516k clearfix";
      }
      app = div({
        className: className
      }, [
        div({
          className: "bt-view bt-view _516l _516q"
        }, div({
          className: "_516r"
        }, this.props.title)), div({
          className: "bt-view bt-view"
        }, hours)
      ]);
      return app;
    }
  });

  DateGridToolApp = React.createClass({
    getInitialState: function() {
      return {
        startHour: null,
        overHour: null
      };
    },
    handleHourMouseDown: function(hour) {
      this.setState({
        startHour: hour
      });
    },
    handleHourMouseOver: function(hour) {
      if (this.state.startHour === null) {
        return hour.setState({
          selected: true
        });
      }
    },
    render: function() {
      var app, that, week;
      that = this;
      week = [
        {
          title: "Monday",
          day: 0
        }, {
          title: "Tuesday",
          day: 1
        }, {
          title: "Wednesday",
          day: 2
        }, {
          title: "Thursday",
          day: 3
        }, {
          title: "Friday",
          day: 4
        }, {
          title: "Saturday",
          day: 5
        }, {
          title: "Sunday",
          day: 6
        }
      ];
      app = div({
        className: "bt-view bt-view bt-day-parting-grid-view"
      }, [
        div({
          className: "_52t2 clearfix"
        }, [
          div({
            className: "_8-y"
          }, "12am"), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-y"
          }, "3am"), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-y"
          }, "6am"), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-y"
          }, "9am"), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-y"
          }, "12pm"), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-y"
          }, "3pm"), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-y"
          }, "6pm"), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-y"
          }, "9pm"), div({
            className: "_8-z"
          }, ""), div({
            className: "_8-z"
          }, "")
        ]), div(null, week.map(function(day) {
          day.handleHourMouseDown = that.handleHourMouseDown;
          day.handleHourMouseOver = that.handleHourMouseOver;
          return DateRow(day);
        }))
      ]);
      return app;
    }
  });

  React.renderComponent(DateGridToolApp(), document.getElementById("test"));

}).call(this);
