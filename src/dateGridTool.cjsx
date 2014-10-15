
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
      onClick: @setSelected
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
      startHour: null
      endHour: null
      seleted: false
      result: result
    }

  handleHourMouseDown: (hour) ->
    @state.selected = !hour.selected



    @setState {startHour: hour, result: @state.result, selected: @state.selected}


  handleHourMouseOver: (hour) ->
    that = this
    return if @state.startHour is null
    @state.endHour = hour

    if @state.startHour isnt null && @state.endHour isnt null

      @state.startHour.selected = !@state.startHour.selected

      changeHour = []

      for d in [@state.startHour.day..@state.endHour.day]
        for h in [@state.startHour.hour..@state.endHour.hour]
          hourLocal = @state.result[d].hours[h]
          if hourLocal.day is d && hourLocal.hour is h
            changeHour.push hourLocal

      @state.result.map (day) ->
        day.hours.map (hour) ->

          if hour in changeHour
            hour.selected = that.state.selected
          else
            hour.selected = hour.orgSelected


    @setState {endHour: @state.endHour, result: @state.result}


  handleHourMouseUp: (hour) ->
    @state.result.forEach (day) ->
      day.hours.forEach (hour) ->
        hour.orgSelected = hour.selected

    @setState {startHour: null, endHour: null, result: @state.result}






  render: ->
    that = this

    days = @state.result.map (day) ->

      that.hours = day.hours.map (hour) ->
        hourProps =
          hour: hour
          onMouseDown: that.handleHourMouseDown.bind(that, hour)
          onMouseOver: that.handleHourMouseOver.bind(that, hour)
          onMouseUp: that.handleHourMouseUp.bind(that, hour)




        return DateCell(hourProps)

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
      ])
      div(null, days)
    ])

    return app
)

dataObj = [
  {title: "Monday", day: 0, hours: []}
  {title: "Tuesday", day: 1, hours: []}
  {title: "Wednesday", day: 2, hours: []}
  {title: "Thursday", day: 3, hours: []}
  {title: "Friday", day: 4, hours: []}
  {title: "Saturday", day: 5, hours: []}
  {title: "Sunday", day: 6, hours: []}
]

dateGridToolApp = DateGridToolApp({dataObj: dataObj})

React.renderComponent dateGridToolApp, document.getElementById("test")
