(function() {
  var DateCell, DateGridToolApp, DateRow, dataObj, dateGridToolApp, div;

  div = React.DOM.div;

  DateCell = React.createClass({
    getInitialState: function() {
      return {
        hour: this.props.hour
      };
    },
    setSelected: function() {
      this.state.hour.selected = !this.state.hour.selected;
      this.state.hour.orgSelected = this.state.hour.selected;
      return this.setState({
        hour: this.state.hour
      });
    },
    render: function() {
      var app, className, selectdClassName;
      className = "";
      if (this.state.hour.hour % 3 === 0) {
        className = "_516n _516l _516m";
      }
      if (this.state.hour.hour % 3 === 1) {
        className = "_516p _516l _516m";
      }
      if (this.state.hour.hour % 3 === 2) {
        className = "_516o _516l _516m";
      }
      selectdClassName = "";
      if (this.state.hour.selected === true) {
        selectdClassName = "hourStatus-selected";
      }
      if (selectdClassName !== "") {
        className += " " + selectdClassName;
      }
      app = div({
        id: "hourGrid",
        onMouseDown: this.props.onMouseDown,
        onMouseOver: this.props.onMouseOver,
        onMouseUp: this.props.onMouseUp,
        onClick: this.setSelected,
        className: className
      });
      return app;
    }
  });

  DateRow = React.createClass({
    render: function() {
      var app, className, that;
      that = this;
      className = "";
      if (this.props.day.day === 0) {
        className = "_8-v _516k clearfix";
      }
      if (this.props.day.day === 7) {
        className = "_8-x _516k clearfix";
      }
      if (this.props.day.day !== 7 && this.props.day.day !== 0) {
        className = "_516k clearfix";
      }
      app = div({
        className: className
      }, [
        div({
          className: "bt-view bt-view _516l _516q"
        }, div({
          className: "_516r"
        }, this.props.day.title)), div({
          className: "bt-view bt-view"
        }, this.props.children)
      ]);
      return app;
    }
  });

  DateGridToolApp = React.createClass({
    hours: [],
    getInitialState: function() {
      var result;
      result = this.props.dataObj;
      result.forEach(function(day) {
        var _i, _results;
        return (function() {
          _results = [];
          for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
          return _results;
        }).apply(this).forEach(function(hourId) {
          return day.hours.push({
            day: day.day,
            hour: hourId,
            selected: false,
            orgSelected: false
          });
        });
      });
      return {
        startHour: null,
        endHour: null,
        seleted: false,
        result: result
      };
    },
    handleHourMouseDown: function(hour) {
      this.state.selected = !hour.selected;
      return this.setState({
        startHour: hour,
        result: this.state.result,
        selected: this.state.selected
      });
    },
    handleHourMouseOver: function(hour) {
      var d, h, hourLocal, _i, _j, _ref, _ref1, _ref2, _ref3;
      if (this.state.startHour === null) {
        return;
      }
      this.state.endHour = hour;
      console.log("@state.endHour", this.state.endHour);
      if (this.state.startHour !== null && this.state.endHour !== null) {
        this.state.startHour.selected = !this.state.startHour.selected;
        for (d = _i = _ref = this.state.startHour.day, _ref1 = this.state.endHour.day; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; d = _ref <= _ref1 ? ++_i : --_i) {
          for (h = _j = _ref2 = this.state.startHour.hour, _ref3 = this.state.endHour.hour; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; h = _ref2 <= _ref3 ? ++_j : --_j) {
            hourLocal = this.state.result[d].hours[h];
            if (hourLocal.day === d && hourLocal.hour === h) {
              hourLocal.selected = this.state.selected;
            } else {
              hourLocal.selected = hourLocal.orgSelected;
            }
          }
        }
      }
      console.log("@state.result[0].hours[1]", this.state.result[0].hours[1]);
      return this.setState({
        endHour: this.state.endHour,
        result: this.state.result
      });
    },
    handleHourMouseUp: function(hour) {
      var updateAllOrgSelected;
      updateAllOrgSelected = function() {
        return this.state.result.forEach(function(day) {
          return day.hour.forEach(function(hour) {
            return hour.orgSelected = hour.selected;
          });
        });
      };
      return this.setState({
        startHour: null,
        endHour: null,
        result: this.state.result
      });
    },
    render: function() {
      var app, days, that;
      that = this;
      days = this.state.result.map(function(day) {
        that.hours = day.hours.map(function(hour) {
          var hourProps;
          hourProps = {
            hour: hour,
            onMouseDown: that.handleHourMouseDown.bind(that, hour),
            onMouseOver: that.handleHourMouseOver.bind(that, hour),
            onMouseUp: that.handleHourMouseUp.bind(that, hour)
          };
          return DateCell(hourProps);
        });
        return DateRow({
          day: day
        }, that.hours);
      });
      app = div({
        className: "bt-view bt-view bt-day-parting-grid-view",
        onClick: this.log
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

  dataObj = [
    {
      title: "Monday",
      day: 0,
      hours: []
    }, {
      title: "Tuesday",
      day: 1,
      hours: []
    }, {
      title: "Wednesday",
      day: 2,
      hours: []
    }, {
      title: "Thursday",
      day: 3,
      hours: []
    }, {
      title: "Friday",
      day: 4,
      hours: []
    }, {
      title: "Saturday",
      day: 5,
      hours: []
    }, {
      title: "Sunday",
      day: 6,
      hours: []
    }
  ];

  dateGridToolApp = DateGridToolApp({
    dataObj: dataObj
  });

  React.renderComponent(dateGridToolApp, document.getElementById("test"));

}).call(this);
