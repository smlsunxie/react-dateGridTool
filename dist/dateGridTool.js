(function() {
  angular.module("dateGridTool", []).directive("dateGridTool", [
    "$document", function($document) {
      return {
        restrict: "E",
        scope: {
          dateGrid: "="
        },
        template: "<div data-ref=\"dayPartingGrid\" onselectstart=\"return false\" class=\"bt-view bt-view bt-day-parting-grid-view\">\n  <div class=\"_52t2 clearfix\">\n    <div class=\"_8-y\">12am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">3am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">6am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">9am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">12pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">3pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">6pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">9pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8_p\">All Day</div>\n  </div>\n  <div>\n    <div ng-repeat=\"day in dateGrid.week\" ng-class=\"{'_8-v _516k clearfix': ($index == 0), '_516k clearfix': ($index &gt; 0 &amp;&amp; $index &lt; 7), '_8-x _516k clearfix': ($index == 7)}\">\n      <div class=\"bt-view bt-view _516l _516q\">\n        <div class=\"_516r\">{{day.title}}</div>\n      </div>\n      <div class=\"bt-view bt-view\">\n        <div id=\"hourGrid\" ng-repeat=\"hour in day.hours\" ng-mousedown=\"hourMouseDown(hour)\" ng-mouseover=\"hourMouseOver(hour)\" ng-class=\"{'_516n _516l _516m': ($index%3 == 0), '_516p _516l _516m': ($index%3 == 1), '_516o _516l _516m': ($index%3 == 2), 'hourStatus-selected': hour.selected}\"></div>\n      </div>\n      <div id=\"allDayGrid\" data-ref=\"allDayBox0\" ng-mousedown=\"allDayMouseDown(day, $index)\" ng-mouseover=\"allDayMouseOver(day, $index)\" ng-class=\"{'hourStatus-selected': day.allday.selected}\" class=\"bt-view bt-view _8-w\"></div>\n    </div>\n    <div class=\"_8-x _516k clearfix\">\n      <div data-ref=\"everyDayLabel\" class=\"bt-view bt-view _516l _516q\">\n        <div class=\"_516r\">{{dateGrid.everyday.title}}</div>\n      </div>\n      <div class=\"bt-view bt-view\">\n        <div id=\"everydayGrid\" ng-repeat=\"hour in dateGrid.everyday.hours\" ng-mousedown=\"everydayMouseDown(hour)\" ng-mouseover=\"everydayMouseOver(hour)\" ng-class=\"{'_516n _516l _516m': ($index%3 == 0), '_516p _516l _516m': ($index%3 == 1), '_516o _516l _516m': ($index%3 == 2), 'hourStatus-selected': hour.selected}\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"_496o\">\n    <div class=\"hourStatus-selected _496q\"></div>\n    <div>Scheduled hours are shaded blue</div>\n  </div>\n</div>",
        link: function(scope, element, attrs) {
          var ALL_DAY_GRID, DAYHOUR_ARRAY, EVERYDAY_GRID, HOUR_GRID, WEEKDAY_ARRAY, checkAllDay, checkEveryday, checkEverydayAndAllDay, init, resetStartGrid, setDaySelected, setHourSelected, setSelected, setStartGrid, _i, _results;
          scope.dateGrid.start = {};
          HOUR_GRID = "hourGrid";
          EVERYDAY_GRID = "everydayGrid";
          ALL_DAY_GRID = "allDayGrid";
          WEEKDAY_ARRAY = [0, 1, 2, 3, 4, 5, 6];
          DAYHOUR_ARRAY = (function() {
            _results = [];
            for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
            return _results;
          }).apply(this);
          init = function() {
            var day, hour, _j, _k, _len, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len = WEEKDAY_ARRAY.length; _j < _len; _j++) {
              day = WEEKDAY_ARRAY[_j];
              for (_k = 0, _len1 = DAYHOUR_ARRAY.length; _k < _len1; _k++) {
                hour = DAYHOUR_ARRAY[_k];
                scope.dateGrid.week[day].hours.push({
                  day: day,
                  hour: hour,
                  selected: false
                });
                if (day === 0) {
                  scope.dateGrid.everyday.hours.push({
                    hour: hour,
                    selected: false
                  });
                }
              }
              _results1.push(scope.dateGrid.week[day].allday = {
                selected: false
              });
            }
            return _results1;
          };
          setStartGrid = function(type, value, selected) {
            if (type === ALL_DAY_GRID) {
              return scope.dateGrid.start = {
                type: type,
                day: value,
                selected: selected
              };
            } else {
              return scope.dateGrid.start = {
                type: type,
                day: value.day,
                hour: value.hour,
                selected: value.selected
              };
            }
          };
          resetStartGrid = function() {
            return scope.dateGrid.start = {};
          };
          checkEveryday = function(hour) {
            var day, _j, _len, _ref;
            _ref = scope.dateGrid.week;
            for (_j = 0, _len = _ref.length; _j < _len; _j++) {
              day = _ref[_j];
              if (!day.hours[hour].selected) {
                return;
              }
            }
            return setSelected(null, hour, true);
          };
          checkAllDay = function(day) {
            var hour, _j, _len, _ref;
            _ref = scope.dateGrid.week[day].hours;
            for (_j = 0, _len = _ref.length; _j < _len; _j++) {
              hour = _ref[_j];
              if (!hour.selected) {
                return;
              }
            }
            return setSelected(day, null, true);
          };
          checkEverydayAndAllDay = function(day, hour, selectedValue) {
            if (!selectedValue) {
              setSelected(null, hour, false);
              setSelected(day, null, false);
              return;
            }
            checkEveryday(hour);
            return checkAllDay(day);
          };
          setSelected = function(day, hour, selectedValue) {
            if (day === null) {
              return scope.dateGrid.everyday.hours[hour].selected = selectedValue;
            } else if (hour === null) {
              return scope.dateGrid.week[day].allday.selected = selectedValue;
            } else {
              scope.dateGrid.week[day].hours[hour].selected = selectedValue;
              return checkEverydayAndAllDay(day, hour, selectedValue);
            }
          };
          setHourSelected = function(hour, selectedValue) {
            var day, _j, _len, _results1;
            _results1 = [];
            for (_j = 0, _len = WEEKDAY_ARRAY.length; _j < _len; _j++) {
              day = WEEKDAY_ARRAY[_j];
              _results1.push(setSelected(day, hour, selectedValue));
            }
            return _results1;
          };
          setDaySelected = function(day, selectedValue) {
            var hour, _j, _len, _results1;
            _results1 = [];
            for (_j = 0, _len = DAYHOUR_ARRAY.length; _j < _len; _j++) {
              hour = DAYHOUR_ARRAY[_j];
              _results1.push(setSelected(day, hour, selectedValue));
            }
            return _results1;
          };
          scope.hourMouseDown = function(hour) {
            hour.selected = !hour.selected;
            setStartGrid(HOUR_GRID, hour);
            return checkEverydayAndAllDay(hour.day, hour.hour, hour.selected);
          };
          scope.hourMouseOver = function(hour) {
            var d, h, selectedValue, _j, _ref, _ref1, _results1;
            if (scope.dateGrid.start.type !== HOUR_GRID) {
              return;
            }
            selectedValue = scope.dateGrid.start.selected;
            _results1 = [];
            for (d = _j = _ref = scope.dateGrid.start.day, _ref1 = hour.day; _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; d = _ref <= _ref1 ? ++_j : --_j) {
              _results1.push((function() {
                var _k, _ref2, _ref3, _results2;
                _results2 = [];
                for (h = _k = _ref2 = scope.dateGrid.start.hour, _ref3 = hour.hour; _ref2 <= _ref3 ? _k <= _ref3 : _k >= _ref3; h = _ref2 <= _ref3 ? ++_k : --_k) {
                  _results2.push(setSelected(d, h, selectedValue));
                }
                return _results2;
              })());
            }
            return _results1;
          };
          scope.hourMouseUp = function() {
            return resetStartGrid();
          };
          scope.everydayMouseDown = function(hour) {
            var day, _j, _len;
            hour.selected = !hour.selected;
            for (_j = 0, _len = WEEKDAY_ARRAY.length; _j < _len; _j++) {
              day = WEEKDAY_ARRAY[_j];
              setSelected(day, hour.hour, hour.selected);
            }
            return setStartGrid(EVERYDAY_GRID, hour);
          };
          scope.everydayMouseOver = function(hour) {
            var h, selectedValue, _j, _ref, _ref1, _results1;
            if (scope.dateGrid.start.type !== EVERYDAY_GRID) {
              return;
            }
            selectedValue = scope.dateGrid.start.selected;
            _results1 = [];
            for (h = _j = _ref = scope.dateGrid.start.hour, _ref1 = hour.hour; _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; h = _ref <= _ref1 ? ++_j : --_j) {
              setSelected(null, h, selectedValue);
              _results1.push(setHourSelected(h, selectedValue));
            }
            return _results1;
          };
          scope.everydayMouseUp = function() {
            return resetStartGrid();
          };
          scope.allDayMouseDown = function(weekDay, day) {
            var allDaySelectedValue;
            weekDay.allday.selected = !weekDay.allday.selected;
            allDaySelectedValue = weekDay.allday.selected;
            setSelected(day, null, allDaySelectedValue);
            setDaySelected(day, allDaySelectedValue);
            return setStartGrid(ALL_DAY_GRID, day, allDaySelectedValue);
          };
          scope.allDayMouseOver = function(weekDay, day) {
            var d, selectedValue, _j, _ref, _results1;
            if (scope.dateGrid.start.type !== ALL_DAY_GRID) {
              return;
            }
            selectedValue = scope.dateGrid.start.selected;
            _results1 = [];
            for (d = _j = _ref = scope.dateGrid.start.day; _ref <= day ? _j <= day : _j >= day; d = _ref <= day ? ++_j : --_j) {
              setSelected(d, null, selectedValue);
              _results1.push(setDaySelected(d, selectedValue));
            }
            return _results1;
          };
          scope.allDayMouseUp = function() {
            return resetStartGrid();
          };
          init();
          return $document.bind("mouseup", function(event) {
            scope.hourMouseUp();
            scope.everydayMouseUp();
            return scope.allDayMouseUp();
          });
        }
      };
    }
  ]);

}).call(this);
