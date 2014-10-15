(function() {
  var AllDay, DateCell, DateGridToolApp, DateRow, dataObj, dateGridToolApp, div,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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

  AllDay = React.createClass({
    getInitialState: function() {
      return {
        day: this.props.day
      };
    },
    render: function() {
      var app, className, selectdClassName;
      className = "bt-view bt-view _8-w";
      selectdClassName = "";
      if (this.state.day.allDaySelected === true) {
        selectdClassName = "hourStatus-selected";
      }
      if (selectdClassName !== "") {
        className += " " + selectdClassName;
      }
      app = div({
        onClick: this.props.allDaySelected,
        className: className,
        onMouseDown: this.props.onMouseDown,
        onMouseOver: this.props.onMouseOver,
        onMouseUp: this.props.onMouseUp
      });
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
        startAllDay: null,
        endAllDay: null,
        allDaySeleted: false,
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
      var changeHour, d, h, hourLocal, that, _i, _j, _ref, _ref1, _ref2, _ref3;
      that = this;
      if (this.state.startHour === null) {
        return;
      }
      this.state.endHour = hour;
      if (this.state.startHour !== null && this.state.endHour !== null) {
        this.state.startHour.selected = !this.state.startHour.selected;
        changeHour = [];
        for (d = _i = _ref = this.state.startHour.day, _ref1 = this.state.endHour.day; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; d = _ref <= _ref1 ? ++_i : --_i) {
          for (h = _j = _ref2 = this.state.startHour.hour, _ref3 = this.state.endHour.hour; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; h = _ref2 <= _ref3 ? ++_j : --_j) {
            hourLocal = this.state.result[d].hours[h];
            if (hourLocal.day === d && hourLocal.hour === h) {
              changeHour.push(hourLocal);
            }
          }
        }
        this.state.result.map(function(day) {
          var allDaySelected;
          allDaySelected = true;
          day.hours.map(function(hour) {
            if (__indexOf.call(changeHour, hour) >= 0) {
              hour.selected = that.state.selected;
            } else {
              hour.selected = hour.orgSelected;
            }
            if (!hour.selected) {
              return allDaySelected = false;
            }
          });
          return day.allDaySelected = allDaySelected;
        });
      }
      return this.setState({
        endHour: this.state.endHour,
        result: this.state.result
      });
    },
    handleHourMouseUp: function(hour) {
      this.state.result.forEach(function(day) {
        return day.hours.forEach(function(hour) {
          return hour.orgSelected = hour.selected;
        });
      });
      return this.setState({
        startHour: null,
        endHour: null,
        result: this.state.result
      });
    },
    allDaySelected: function(day) {
      var that;
      that = this;
      day.allDaySelected = !day.allDaySelected;
      day.hours.map(function(hour) {
        hour.selected = day.allDaySelected;
        return hour.orgSelected = hour.selected;
      });
      return this.setState({
        result: this.state.result
      });
    },
    handleAllDayMouseDown: function(day) {
      this.state.allDaySelected = !day.allDaySelected;
      console.log("@state.allDaySelected", this.state.allDaySelected);
      return this.setState({
        startAllDay: day,
        allDaySelected: this.state.allDaySelected
      });
    },
    handleAllDayMouseOver: function(day) {
      var changeHour, that;
      that = this;
      if (this.state.startAllDay === null) {
        return;
      }
      this.state.endAllDay = day;
      changeHour = [];
      this.state.result.map(function(day) {
        var d, _i, _ref, _ref1, _results;
        _results = [];
        for (d = _i = _ref = that.state.startAllDay.day, _ref1 = that.state.endAllDay.day; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; d = _ref <= _ref1 ? ++_i : --_i) {
          if (that.state.result[d].day === d) {
            _results.push(that.state.result[d].hours.forEach(function(hour) {
              return changeHour.push(hour);
            }));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
      this.state.result.map(function(day) {
        var allDaySelected;
        allDaySelected = true;
        day.hours.map(function(hour) {
          if (__indexOf.call(changeHour, hour) >= 0) {
            hour.selected = that.state.allDaySelected;
          } else {
            hour.selected = hour.orgSelected;
          }
          if (!hour.selected) {
            return allDaySelected = false;
          }
        });
        return day.allDaySelected = allDaySelected;
      });
      return this.setState({
        result: this.state.result
      });
    },
    handleAllDayMouseUp: function(day) {
      this.state.result.forEach(function(day) {
        return day.hours.forEach(function(hour) {
          return hour.orgSelected = hour.selected;
        });
      });
      return this.setState({
        startAllDay: null,
        endAllDay: null
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
        if (day.day !== 7) {
          that.hours.push(AllDay({
            day: day,
            allDaySelected: that.allDaySelected.bind(that, day),
            onMouseDown: that.handleAllDayMouseDown.bind(that, day),
            onMouseOver: that.handleAllDayMouseOver.bind(that, day),
            onMouseUp: that.handleAllDayMouseUp.bind(that, day)
          }));
        }
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
          }, ""), div({
            className: "_8_p"
          }, "All Day")
        ]), div(null, days)
      ]);
      return app;
    }
  });

  dataObj = [
    {
      title: "Monday",
      day: 0,
      hours: [],
      allDaySelected: false,
      allHourSelected: false
    }, {
      title: "Tuesday",
      day: 1,
      hours: [],
      allDaySelected: false,
      allHourSelected: false
    }, {
      title: "Wednesday",
      day: 2,
      hours: [],
      allDaySelected: false,
      allHourSelected: false
    }, {
      title: "Thursday",
      day: 3,
      hours: [],
      allDaySelected: false,
      allHourSelected: false
    }, {
      title: "Friday",
      day: 4,
      hours: [],
      allDaySelected: false,
      allHourSelected: false
    }, {
      title: "Saturday",
      day: 5,
      hours: [],
      allDaySelected: false,
      allHourSelected: false
    }, {
      title: "Sunday",
      day: 6,
      hours: [],
      allDaySelected: false,
      allHourSelected: false
    }, {
      title: "Every Day ",
      day: 7,
      hours: [],
      allDaySelected: false,
      allHourSelected: false
    }
  ];

  dateGridToolApp = DateGridToolApp({
    dataObj: dataObj
  });

  React.renderComponent(dateGridToolApp, document.getElementById("test"));

}).call(this);
