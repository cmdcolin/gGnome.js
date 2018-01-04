class Misc {

  static get server() {
    return 'http://localhost:8000'
  }

  static get metadata() {
    var input = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': Misc.server + '/metadata',
            'dataType': 'json',
            'success': (data) => {
                json = data;
            }
        });
        return json;
    })();
    return input;
  }

  static intervals(startPlace, endPlace) {
    var input = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': Misc.server + '/intervals',
            'data': {"startPlace": startPlace, "endPlace": endPlace},
            'dataType': 'json',
            'success': (data) => {
                json = data;
            }
        });
        return json;
    })();
    return input.map((d,i) => { return new Interval(d)});
  }

  static get guid() {

    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
    }
    // then to call it, plus stitch in '4' in the third group
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  }

  static groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
          const key = keyGetter(item);
          const collection = map.get(key);
          if (!collection) {
              map.set(key, [item]);
          } else {
              collection.push(item);
          }
      });
      return map;
  }

}