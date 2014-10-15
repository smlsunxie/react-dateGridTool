
div = React.DOM.div
DateCell = React.createClass(
  getInitialState: ->
    return {
      hour: @props.hour
    }

  setSelected:() ->

    @state.hour.selected = !@state.hour.selected
    @state.hour.orgSelected = @state.hour.selected
    @setState({hour: @state.hour})


  render: ->

    className = ""
    className = "_516n _516l _516m"  if @state.hour.hour % 3 is 0
    className = "_516p _516l _516m"  if @state.hour.hour % 3 is 1
    className = "_516o _516l _516m"  if @state.hour.hour % 3 is 2

    selectdClassName = ""
    selectdClassName = "hourStatus-selected"  if @state.hour.selected is true


    className += " " + selectdClassName  if selectdClassName isnt ""

    app = div(
      id: "hourGrid"
      onMouseDown: @props.onMouseDown
      onMouseOver: @props.onMouseOver
      onMouseUp: @props.onMouseUp
      onClick: @props?.onClick || @setSelected

      className: className

    )

    return app
)

#
DateRow = React.createClass(
  render: ->
    that = @

    className = ""
    className = "_8-v _516k clearfix" if @props.day.day is 0
    className = "_8-x _516k clearfix" if @props.day.day is 7
    className = "_516k clearfix" if @props.day.day isnt 7 && @props.day.day isnt 0




    app = div(className: className, [

      div(className: "bt-view bt-view _516l _516q",
        div(className: "_516r", @props.day.title)
      )

      div(className: "bt-view bt-view", @props.children)

    ])

    return app
)


AllDay = React.createClass(
  getInitialState: ->
    return {
      day: @props.day
    }




  render: ->

    className = "bt-view bt-view _8-w"

    selectdClassName = ""
    selectdClassName = "hourStatus-selected"  if @state.day.selected is true
    className += " " + selectdClassName  if selectdClassName isnt ""

    app = div(
      onClick: @props.onClick
      className: className
      onMouseDown: @props.onMouseDown
      onMouseOver: @props.onMouseOver
      onMouseUp: @props.onMouseUp
    )

    return app
)

DateGridToolApp = React.createClass(
  hours: []
  getInitialState: ->

    result = @props.dataObj


    result.forEach (day) ->
      [0..23].forEach (hourId) ->
        day.hours.push(
          day: day.day
          hour: hourId
          selected: false
          orgSelected: false
        )

    return {
      start: null
      end: null
      seleted: false

      result: result
    }

  updateHoursStatus:(changeHour, selected) ->
    that = @
    @state.result.map (day) ->

      allDaySelected = true
      day.hours.map (hour) ->

        if hour in changeHour
          hour.selected = selected
        else
          hour.selected = hour.orgSelected

        unless hour.selected
          allDaySelected = false

      day.selected = allDaySelected

  syncHourStatus: () ->
    @state.result.forEach (day) ->
      day.hours.forEach (hour) ->
        hour.orgSelected = hour.selected

  handleMouseUp: (hour) ->
    @syncHourStatus()
    @setState {start: null, end: null, selected: null}

  handleMouseDown: (object) ->
    console.log "object.selected", object.selected

    @state.selected = !object.selected

    console.log "@state.selected", @state.selected
    @setState {start: object, selected: @state.selected}


  handleHourMouseOver: (hour) ->
    that = this
    return if @state.start is null
    @state.end = hour

    if @state.start isnt null && @state.end isnt null

      changeHour = []

      for d in [@state.start.day..@state.end.day]
        for h in [@state.start.hour..@state.end.hour]
          hourLocal = @state.result[d].hours[h]
          if hourLocal.day is d && hourLocal.hour is h
            changeHour.push hourLocal

      @updateHoursStatus(changeHour, that.state.selected)
      @setState {end: @state.end, result: @state.result}




  allDaySelected:(day) ->

    that = @
    day.allDaySelected = !day.allDaySelected
    day.hours.map (hour) ->
      hour.selected = day.allDaySelected
      hour.orgSelected = hour.selected


    @setState(result: @state.result)



  handleAllDayMouseOver: (day) ->
    that = this
    return if @state.start is null
    @state.end = day

    if @state.end isnt null && @state.start isnt null

      changeHour = []

      @state.result.map (day) ->
        for d in [that.state.start.day..that.state.end.day]
          if that.state.result[d].day is d
            that.state.result[d].hours.forEach (hour)->
              changeHour.push hour

      @updateHoursStatus(changeHour, that.state.selected)


      @setState {result: @state.result}



  everyDaySelected:(day, hour) ->
    console.log "everyDaySelected", day, hour

    that = @
    day.allDaySelected = !day.allDaySelected
    day.hours.map (hour) ->
      hour.selected = day.allDaySelected
      hour.orgSelected = hour.selected


    @setState(result: @state.result)












  render: ->
    that = this

    days = @state.result.map (day) ->

      that.hours = day.hours.map (hour) ->

        unless day.day is 7
          hourProps =
            hour: hour
            onMouseDown: that.handleMouseDown.bind(that, hour)
            onMouseOver: that.handleHourMouseOver.bind(that, hour)
            onMouseUp: that.handleMouseUp.bind(that, hour)
          return DateCell(hourProps)

        else
          hourProps =
            hour: hour
            onClick: that.everyDaySelected.bind(that, day, hour)
            # onMouseDown: that.handleEveryDayMouseDown.bind(that, hour)
            # onMouseOver: that.handleEveryDayMouseOver.bind(that, hour)
            # onMouseUp: that.handleEveryDayMouseUp.bind(that, hour)
          return DateCell(hourProps)


      unless day.day is 7
        that.hours.push AllDay({
          day: day
          onClick: that.allDaySelected.bind(that, day)
          onMouseDown: that.handleMouseDown.bind(that, day)
          onMouseOver: that.handleAllDayMouseOver.bind(that, day)
          onMouseUp: that.handleMouseUp.bind(that, day)

        })

      return DateRow({day: day}, that.hours)




    app = div({
        className: "bt-view bt-view bt-day-parting-grid-view"
        onClick: @log
      }, [
      div(className: "_52t2 clearfix"  , [
        div(className: "_8-y", "12am")
        div(className: "_8-z", "")
        div(className: "_8-z", "")
        div(className: "_8-y", "3am")
        div(className: "_8-z", "")
        div(className: "_8-z", "")
        div(className: "_8-y", "6am")
        div(className: "_8-z", "")
        div(className: "_8-z", "")
        div(className: "_8-y", "9am")
        div(className: "_8-z", "")
        div(className: "_8-z", "")
        div(className: "_8-y", "12pm")
        div(className: "_8-z", "")
        div(className: "_8-z", "")
        div(className: "_8-y", "3pm")
        div(className: "_8-z", "")
        div(className: "_8-z", "")
        div(className: "_8-y", "6pm")
        div(className: "_8-z", "")
        div(className: "_8-z", "")
        div(className: "_8-y", "9pm")
        div(className: "_8-z", "")
        div(className: "_8-z", "")
        div(className: "_8_p", "All Day")

      ])
      div(null, days)
    ])

    return app
)

dataObj = [
  {title: "Monday", day: 0, hours: [], selected: false, allHourSelected: false}
  {title: "Tuesday", day: 1, hours: [], selected: false, allHourSelected: false}
  {title: "Wednesday", day: 2, hours: [], selected: false, allHourSelected: false}
  {title: "Thursday", day: 3, hours: [], selected: false, allHourSelected: false}
  {title: "Friday", day: 4, hours: [], selected: false, allHourSelected: false}
  {title: "Saturday", day: 5, hours: [], selected: false, allHourSelected: false}
  {title: "Sunday", day: 6, hours: [], selected: false, allHourSelected: false}
  {title: "Every Day ", day: 7, hours: [], selected: false, allHourSelected: false}
]

dateGridToolApp = DateGridToolApp({dataObj: dataObj})

React.renderComponent dateGridToolApp, document.getElementById("test")
