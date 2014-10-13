angular.module("dateGridTool", []).directive "dateGridTool", ["$document", ($document) ->

    return {
      restrict: "E"
      scope:
        dateGrid: "="
      # templateUrl: 'dateGridTool.html'
      template: """{html}"""

      link: (scope, element, attrs) ->

        scope.dateGrid.start = {}
        HOUR_GRID = "hourGrid"
        EVERYDAY_GRID = "everydayGrid"
        ALL_DAY_GRID = "allDayGrid"

        WEEKDAY_ARRAY = [0 .. 6]
        DAYHOUR_ARRAY = [0 .. 23]



        init = () ->

          for day in WEEKDAY_ARRAY
            for hour in DAYHOUR_ARRAY
              scope.dateGrid.week[day].hours.push
                day: day
                hour: hour
                selected: false
              if day == 0
                scope.dateGrid.everyday.hours.push
                  hour: hour
                  selected: false
            scope.dateGrid.week[day].allday =
              selected: false



        setStartGrid = (type, value, selected) ->

          if type == ALL_DAY_GRID
            scope.dateGrid.start =
              type: type
              day: value
              selected: selected
          else
            scope.dateGrid.start =
              type: type
              day: value.day
              hour: value.hour
              selected: value.selected

        resetStartGrid = () ->

          scope.dateGrid.start = {}



        # Check everyday & all day
        checkEveryday = (hour) ->

          for day in scope.dateGrid.week
            if not day.hours[hour].selected
              return
          setSelected null, hour, true

        checkAllDay = (day) ->

          for hour in scope.dateGrid.week[day].hours
            if not hour.selected
              return
          setSelected day, null, true

        checkEverydayAndAllDay = (day, hour, selectedValue) ->

          if not selectedValue
            setSelected null, hour, false
            setSelected day, null, false
            return

          checkEveryday hour
          checkAllDay day



        # Change selected
        setSelected = (day, hour, selectedValue) ->

          if day == null
            scope.dateGrid.everyday.hours[hour].selected = selectedValue
          else if hour == null
            scope.dateGrid.week[day].allday.selected = selectedValue
          else
            scope.dateGrid.week[day].hours[hour].selected = selectedValue
            checkEverydayAndAllDay day, hour, selectedValue

        setHourSelected = (hour, selectedValue) ->

          for day in WEEKDAY_ARRAY
            setSelected day, hour, selectedValue

        setDaySelected = (day, selectedValue) ->

          for hour in DAYHOUR_ARRAY
            setSelected day, hour, selectedValue
        


        # Hour grid
        scope.hourMouseDown = (hour) ->

          hour.selected = !hour.selected

          setStartGrid HOUR_GRID, hour
          checkEverydayAndAllDay hour.day, hour.hour, hour.selected

        scope.hourMouseOver = (hour) ->

          return unless scope.dateGrid.start.type == HOUR_GRID

          selectedValue = scope.dateGrid.start.selected

          for d in [scope.dateGrid.start.day..hour.day]
            for h in [scope.dateGrid.start.hour..hour.hour]
              setSelected d, h, selectedValue

        scope.hourMouseUp = () ->

          resetStartGrid()



        # Everyday grid
        scope.everydayMouseDown = (hour) ->

          hour.selected = !hour.selected

          for day in WEEKDAY_ARRAY
            setSelected day, hour.hour, hour.selected

          setStartGrid EVERYDAY_GRID, hour

        scope.everydayMouseOver = (hour) ->

          return unless scope.dateGrid.start.type == EVERYDAY_GRID

          selectedValue = scope.dateGrid.start.selected

          for h in [scope.dateGrid.start.hour..hour.hour]
            setSelected null, h, selectedValue
            setHourSelected h, selectedValue

        scope.everydayMouseUp = () ->

          resetStartGrid()



        scope.allDayMouseDown = (weekDay, day) ->

          weekDay.allday.selected = !weekDay.allday.selected
          allDaySelectedValue = weekDay.allday.selected

          setSelected day, null, allDaySelectedValue
          setDaySelected day, allDaySelectedValue

          setStartGrid ALL_DAY_GRID, day, allDaySelectedValue

        scope.allDayMouseOver = (weekDay, day) ->

          return unless scope.dateGrid.start.type == ALL_DAY_GRID

          selectedValue = scope.dateGrid.start.selected

          for d in [scope.dateGrid.start.day..day]
            setSelected d, null, selectedValue
            setDaySelected d, selectedValue

        scope.allDayMouseUp = () ->

          resetStartGrid()



        init()



        $document.bind "mouseup", (event) ->

          scope.hourMouseUp()
          scope.everydayMouseUp()
          scope.allDayMouseUp()

    }
]
