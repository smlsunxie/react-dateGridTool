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
    render: function() {
      var app, className, selectdClassName, _ref;
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
        onClick: ((_ref = this.props) != null ? _ref.onClick : void 0) || this.setSelected,
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
      if (this.state.day.selected === true) {
        selectdClassName = "hourStatus-selected";
      }
      if (selectdClassName !== "") {
        className += " " + selectdClassName;
      }
      app = div({
        onClick: this.props.onClick,
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
        start: null,
        end: null,
        seleted: false,
        result: result
      };
    },
    updateHoursStatus: function(changeHour, selected) {
      var that;
      that = this;
      that.state.result[7].hours.forEach(function(hours) {
        return hours.selected = true;
      });
      return this.state.result.forEach(function(day) {
        var allDaySelected;
        allDaySelected = true;
        day.hours.forEach(function(hour) {
          if (day.day < 7) {
            if (__indexOf.call(changeHour, hour) >= 0) {
              hour.selected = selected;
            } else {
              hour.selected = hour.orgSelected;
            }
            if (!hour.selected) {
              allDaySelected = false;
            }
            if (hour.day === day.day && hour.selected === false) {
              return that.state.result[7].hours[hour.hour].selected = false;
            }
          }
        });
        return day.selected = allDaySelected;
      });
    },
    syncHourStatus: function() {
      return this.state.result.forEach(function(day) {
        return day.hours.forEach(function(hour) {
          return hour.orgSelected = hour.selected;
        });
      });
    },
    handleMouseUp: function(hour) {
      this.syncHourStatus();
      return this.setState({
        start: null,
        end: null,
        selected: null
      });
    },
    handleMouseDown: function(object) {
      this.state.selected = !object.selected;
      return this.setState({
        start: object,
        selected: this.state.selected
      });
    },
    handleHourMouseOver: function(hour) {
      var changeHour, d, h, hourLocal, that, _i, _j, _ref, _ref1, _ref2, _ref3;
      that = this;
      if (this.state.start === null) {
        return;
      }
      this.state.end = hour;
      if (this.state.start !== null && this.state.end !== null) {
        changeHour = [];
        for (d = _i = _ref = this.state.start.day, _ref1 = this.state.end.day; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; d = _ref <= _ref1 ? ++_i : --_i) {
          for (h = _j = _ref2 = this.state.start.hour, _ref3 = this.state.end.hour; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; h = _ref2 <= _ref3 ? ++_j : --_j) {
            hourLocal = this.state.result[d].hours[h];
            if (hourLocal.day === d && hourLocal.hour === h) {
              changeHour.push(hourLocal);
            }
          }
        }
        this.updateHoursStatus(changeHour, that.state.selected);
        return this.setState({
          end: this.state.end,
          result: this.state.result
        });
      }
    },
    allDaySelected: function(day) {
      var that;
      that = this;
      day.selected = !day.selected;
      day.hours.forEach(function(hour) {
        hour.selected = day.selected;
        return hour.orgSelected = hour.selected;
      });
      return this.setState({
        result: this.state.result
      });
    },
    handleAllDayMouseOver: function(day) {
      var changeHour, that;
      that = this;
      if (this.state.start === null) {
        return;
      }
      this.state.end = day;
      if (this.state.end !== null && this.state.start !== null) {
        changeHour = [];
        this.state.result.forEach(function(day) {
          var d, _i, _ref, _ref1, _results;
          _results = [];
          for (d = _i = _ref = that.state.start.day, _ref1 = that.state.end.day; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; d = _ref <= _ref1 ? ++_i : --_i) {
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
        this.updateHoursStatus(changeHour, that.state.selected);
        return this.setState({
          result: this.state.result
        });
      }
    },
    everyDaySelected: function(everyDayHour) {
      var that;
      that = this;
      everyDayHour.selectd = !everyDayHour.selectd;
      that.state.result.forEach(function(day) {
        return day.hours.forEach(function(hour) {
          if (everyDayHour.hour === hour.hour) {
            hour.selected = everyDayHour.selectd;
            return hour.orgSelected = hour.selected;
          }
        });
      });
      return this.setState({
        result: this.state.result
      });
    },
    handleEveryDayMouseOver: function(everyDayHour) {
      var changeHour, that;
      that = this;
      if (this.state.start === null) {
        return;
      }
      this.state.end = everyDayHour;
      if (this.state.end !== null && this.state.start !== null) {
        changeHour = [];
        this.state.result.forEach(function(day) {
          return day.hours.forEach(function(hour) {
            var _i, _ref, _ref1, _ref2, _results;
            if (_ref = hour.hour, __indexOf.call((function() {
              _results = [];
              for (var _i = _ref1 = that.state.start.hour, _ref2 = that.state.end.hour; _ref1 <= _ref2 ? _i <= _ref2 : _i >= _ref2; _ref1 <= _ref2 ? _i++ : _i--){ _results.push(_i); }
              return _results;
            }).apply(this), _ref) >= 0) {
              return changeHour.push(hour);
            }
          });
        });
        this.updateHoursStatus(changeHour, that.state.selected);
        return this.setState({
          result: this.state.result
        });
      }
    },
    hourSelected: function(hour) {
      this.updateHoursStatus([hour], !hour.selected);
      return this.setState({
        hour: this.state.hour
      });
    },
    render: function() {
      var app, days, that;
      that = this;
      days = this.state.result.map(function(day) {
        that.hours = day.hours.map(function(hour) {
          var hourProps;
          if (day.day !== 7) {
            hourProps = {
              hour: hour,
              onClick: that.hourSelected.bind(that, hour),
              onMouseDown: that.handleMouseDown.bind(that, hour),
              onMouseOver: that.handleHourMouseOver.bind(that, hour),
              onMouseUp: that.handleMouseUp.bind(that, hour)
            };
            return DateCell(hourProps);
          } else {
            hourProps = {
              hour: hour,
              onClick: that.everyDaySelected.bind(that, hour),
              onMouseDown: that.handleMouseDown.bind(that, hour),
              onMouseOver: that.handleEveryDayMouseOver.bind(that, hour),
              onMouseUp: that.handleMouseUp.bind(that, hour)
            };
            return DateCell(hourProps);
          }
        });
        if (day.day !== 7) {
          that.hours.push(AllDay({
            day: day,
            onClick: that.allDaySelected.bind(that, day),
            onMouseDown: that.handleMouseDown.bind(that, day),
            onMouseOver: that.handleAllDayMouseOver.bind(that, day),
            onMouseUp: that.handleMouseUp.bind(that, day)
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
      selected: false,
      allHourSelected: false
    }, {
      title: "Tuesday",
      day: 1,
      hours: [],
      selected: false,
      allHourSelected: false
    }, {
      title: "Wednesday",
      day: 2,
      hours: [],
      selected: false,
      allHourSelected: false
    }, {
      title: "Thursday",
      day: 3,
      hours: [],
      selected: false,
      allHourSelected: false
    }, {
      title: "Friday",
      day: 4,
      hours: [],
      selected: false,
      allHourSelected: false
    }, {
      title: "Saturday",
      day: 5,
      hours: [],
      selected: false,
      allHourSelected: false
    }, {
      title: "Sunday",
      day: 6,
      hours: [],
      selected: false,
      allHourSelected: false
    }, {
      title: "Every Day ",
      day: 7,
      hours: [],
      selected: false,
      allHourSelected: false
    }
  ];

  dateGridToolApp = DateGridToolApp({
    dataObj: dataObj
  });

  React.renderComponent(dateGridToolApp, document.getElementById("test"));

}).call(this);
