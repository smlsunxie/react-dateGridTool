(function() {
  var DateCell, DateGridToolApp, DateRow, div;

  div = React.DOM.div;

  DateCell = React.createClass({
    hourMouseDown: function() {
      this.props.handleHourMouseDown(this);
    },
    hourMouseOver: function() {
      this.props.handleHourMouseOver(this);
    },
    hourMouseUp: function() {
      this.props.handleHourMouseUp(this);
    },
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
      if (this.props.selected === true) {
        selectdClassName = "hourStatus-selected";
      }
      if (selectdClassName !== "") {
        className += " " + selectdClassName;
      }
      app = div({
        id: "hourGrid",
        onMouseDown: this.hourMouseDown,
        onMouseOver: this.hourMouseOver,
        onMouseUp: this.hourMouseUp,
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
    getInitialState: function() {
      return {
        startHour: null,
        endHour: null
      };
    },
    handleHourMouseDown: function(hour) {
      return this.setState({
        startHour: hour.props
      });
    },
    handleHourMouseOver: function(hour) {
      if (this.state.startHour === null) {
        return;
      }
      return this.setState({
        endHour: hour.props
      });
    },
    handleHourMouseUp: function(hour) {
      return this.setState({
        startHour: null,
        endHour: null
      });
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
        day.hours = (function() {
          _results = [];
          for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
          return _results;
        }).apply(this).map(function(hourId) {
          var d, h, hourObj, _i, _j, _ref, _ref1, _ref2, _ref3;
          hourObj = {
            day: day.day,
            hour: hourId,
            handleHourMouseDown: that.handleHourMouseDown,
            handleHourMouseOver: that.handleHourMouseOver,
            handleHourMouseUp: that.handleHourMouseUp,
            selected: false
          };
          if (that.state.startHour !== null && that.state.endHour !== null) {
            for (d = _i = _ref = that.state.startHour.day, _ref1 = that.state.endHour.day; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; d = _ref <= _ref1 ? ++_i : --_i) {
              for (h = _j = _ref2 = that.state.startHour.hour, _ref3 = that.state.endHour.hour; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; h = _ref2 <= _ref3 ? ++_j : --_j) {
                if (hourObj.day === d && hourObj.hour === h) {
                  hourObj.selected = true;
                }
              }
            }
          }
          return DateCell(hourObj);
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
