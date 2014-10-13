((ng) ->
  "use strict"
  app = ng.module("demo", ["dateGridTool"])
  app.controller "demoCtrl", ($scope) ->
    $scope.dateGrid =
      week: [
        {title: "Monday", hours: [], allday: {} }
        {title: "Tuesday", hours: [], allday: {} }
        {title: "Wednesday", hours: [], allday: {} }
        {title: "Thursday", hours: [], allday: {} }
        {title: "Friday", hours: [], allday: {} }
        {title: "Saturday", hours: [], allday: {} }
        {title: "Sunday", hours: [], allday: {} }
      ]
      everyday:
        title: "Everyday"
        hours: []

    return

) angular
