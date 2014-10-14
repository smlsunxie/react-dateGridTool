
div = React.DOM.div
DateCell = React.createClass(
  getInitialState: ->
    selected: false

  hourMouseDown: ->
    if @state.selected is false
      @setState selected: true
    else
      @setState selected: false
    @props.handleHourMouseDown this
    return

  hourMouseOver: ->
    @props.handleHourMouseOver this
    return

  render: ->
    className = ""
    className = "_516n _516l _516m"  if @props.hour % 3 is 0
    className = "_516p _516l _516m"  if @props.hour % 3 is 1
    className = "_516o _516l _516m"  if @props.hour % 3 is 2
    selectdClassName = ""
    selectdClassName = "hourStatus-selected"  if @state.selected is true
    className += " " + selectdClassName  if selectdClassName isnt ""
    app = div(
      id: "hourGrid"
      onMouseDown: @hourMouseDown
      onMouseOver: @hourMouseOver
      className: className
    )

    return app
)

#
DateRow = React.createClass(render: ->
  hours = []

  for i in [0..23]
    hours.push DateCell(
      day: @props.day
      hour: i
      handleHourMouseDown: @props.handleHourMouseDown
      handleHourMouseOver: @props.handleHourMouseOver
    )



  className = ""
  className = "_8-v _516k clearfix" if @props.day is 0
  className = "_8-x _516k clearfix" if @props.day is 7
  className = "_516k clearfix" if @props.day isnt 7 && @props.day isnt 0



  app = div(className: className, [

    div(className: "bt-view bt-view _516l _516q",
      div(className: "_516r", @props.title)
    )

    div(className: "bt-view bt-view", hours)

  ])

  return app
)
DateGridToolApp = React.createClass(
  getInitialState: ->
    startHour: null
    overHour: null

  handleHourMouseDown: (hour) ->
    @setState startHour: hour
    return

  handleHourMouseOver: (hour) ->
    hour.setState selected: true  if @state.startHour is null

  render: ->

    that = this

    week = [
      {title: "Monday", day: 0}
      {title: "Tuesday", day: 1}
      {title: "Wednesday", day: 2}
      {title: "Thursday", day: 3}
      {title: "Friday", day: 4}
      {title: "Saturday", day: 5}
      {title: "Sunday", day: 6}
    ]


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
      div(null,
        week.map (day) ->
          day.handleHourMouseDown = that.handleHourMouseDown
          day.handleHourMouseOver = that.handleHourMouseOver
          return DateRow(day)
      )
    ])

    return app
)
React.renderComponent DateGridToolApp(), document.getElementById("test")
