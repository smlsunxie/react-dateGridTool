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
        this.setSelected(true);
      } else {
        this.setSelected(false);
      }
    },
    hourMouseOver: function() {},
    setSelected: function(selected) {
      return this.setState({
        selected: selected
      });
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
        className: className,
        ref: "day_" + this.props.day + "_hour_" + this.props.hour
      });
      return app;
    }
  });

  DateRow = React.createClass({
    render: function() {
      var app, className, that;
      that = this;
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
        }, this.props.hours)
      ]);
      return app;
    }
  });

  DateGridToolApp = React.createClass({
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
      var app, days, that, week;
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
      days = week.map(function(day) {
        var _i, _results;
        day.handleHourMouseDown = that.handleHourMouseDown;
        day.handleHourMouseOver = that.handleHourMouseOver;
        day.hours = (function() {
          _results = [];
          for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
          return _results;
        }).apply(this).map(function(hour) {
          return DateCell({
            day: day.day,
            hour: hour
          });
        });
        return DateRow(day);
      });
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
        ]), div(null, days)
      ]);
      return app;
    }
  });

  React.renderComponent(DateGridToolApp(), document.getElementById("test"));

}).call(this);
