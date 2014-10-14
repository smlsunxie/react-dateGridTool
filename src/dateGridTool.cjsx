
div = React.DOM.div
DateCell = React.createClass(


  hourMouseDown: ->
    @props.handleHourMouseDown this
    return

  hourMouseOver: ->
    @props.handleHourMouseOver this
    return
  hourMouseUp: ->
    @props.handleHourMouseUp this
    return

  setSelected:(selected) ->
    @props.setSelected this, selected

  render: ->



    className = ""
    className = "_516n _516l _516m"  if @props.hour % 3 is 0
    className = "_516p _516l _516m"  if @props.hour % 3 is 1
    className = "_516o _516l _516m"  if @props.hour % 3 is 2

    selectdClassName = ""
    selectdClassName = "hourStatus-selected"  if @props.selected is true

    @setSelected(@props.selected)

    className += " " + selectdClassName  if selectdClassName isnt ""

    app = div(
      id: "hourGrid"
      onMouseDown: @hourMouseDown
      onMouseOver: @hourMouseOver
      onMouseUp: @hourMouseUp
      onClick: @hourMouseUp
      className: className
      ref: "day_#{@props.day}_hour_#{@props.hour}"
    )

    return app
)

#
DateRow = React.createClass(render: ->
  that = @

  className = ""
  className = "_8-v _516k clearfix" if @props.day is 0
  className = "_8-x _516k clearfix" if @props.day is 7
  className = "_516k clearfix" if @props.day isnt 7 && @props.day isnt 0


  app = div(className: className, [

    div(className: "bt-view bt-view _516l _516q",
      div(className: "_516r", @props.title)
    )

    div(className: "bt-view bt-view", @props.hours)

  ])

  return app
)
DateGridToolApp = React.createClass(

  getInitialState: ->

    result = [
      {title: "Monday", day: 0, hours: []}
      {title: "Tuesday", day: 1, hours: []}
      {title: "Wednesday", day: 2, hours: []}
      {title: "Thursday", day: 3, hours: []}
      {title: "Friday", day: 4, hours: []}
      {title: "Saturday", day: 5, hours: []}
      {title: "Sunday", day: 6, hours: []}
    ]


    [0..6].forEach (dayId) ->
      [0..23].forEach (hourId) ->
        result[dayId].hours.push(
          day: dayId
          hour: hourId
          selected: false
        )

    return {
      startHour: null
      endHour: null
      result: result
    }

  handleHourMouseDown: (hour) ->

    @setState startHour: hour.props


  handleHourMouseOver: (hour) ->
    return if @state.startHour is null
    @setState endHour: hour.props


  handleHourMouseUp: (hour) ->
    @setState {startHour: null, endHour: null}

  setSelected: (hour, selected) ->
    @state.result[hour.props.day].hours[hour.props.hour].selected = selected


  render: ->
    that = this


    days = [0..6].map (day) ->
      dayObj =
         day: day
         title: that.state.result[day].title

      dayObj.hours = [0..23].map (hour) ->

        hourObj =
          day: day
          hour: hour
          handleHourMouseDown: that.handleHourMouseDown
          handleHourMouseOver: that.handleHourMouseOver
          handleHourMouseUp: that.handleHourMouseUp
          setSelected: that.setSelected
          selected: that.state.result[day].hours[hour].selected


        if that.state.startHour isnt null && that.state.endHour isnt null


          for d in [that.state.startHour.day..that.state.endHour.day]
            for h in [that.state.startHour.hour..that.state.endHour.hour]
              hourObj.selected = true if hourObj.day is d && hourObj.hour is h



        return DateCell(hourObj)

      return DateRow(dayObj)




    app = div(className: "bt-view bt-view bt-day-parting-grid-view", [
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
dateGridToolApp = DateGridToolApp()

React.renderComponent dateGridToolApp, document.getElementById("test")
