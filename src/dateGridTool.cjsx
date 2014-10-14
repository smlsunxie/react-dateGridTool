
div = React.DOM.div
DateCell = React.createClass(
  getInitialState: ->
    selected: false

  hourMouseDown: ->
    if @state.selected is false
      @setSelected(true)
    else
      @setSelected(false)
    # @props.handleHourMouseDown this
    return

  hourMouseOver: ->
    # @props.handleHourMouseOver this
    return

  setSelected: (selected) ->
    @setState selected: selected

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

    days = week.map (day) ->
      day.handleHourMouseDown = that.handleHourMouseDown
      day.handleHourMouseOver = that.handleHourMouseOver


      day.hours = [0..23].map (hour) ->
        return DateCell(
          day: day.day
          hour: hour
        )

      return DateRow(day)

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
React.renderComponent DateGridToolApp(), document.getElementById("test")
