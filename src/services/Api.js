var DataService = (function(){
  var _data = [];
  var isLoad = false;
  var researchProcessApi = 'http://localhost:3000/api/Research';
  var researchGoalApi = 'http://localhost:3000/api/ResearchGoals';

  function add(item) {
    _data.push(item);
  }

  var getData = new Promise(
    function (resolve, reject) {
      if (isLoad) {
        resolve(_data);
      } else {
        fetch(researchProcessApi)
        .then(function (response) {
          return response.json();
        }).then((data) => {
          _data = data;
          resolve(_data);
        });
      }
    }
  );

  var reloadData = new Promise(
    function (resolve, reject) {
      fetch(researchProcessApi)
      .then(function (response) {
        return response.json();
      }).then((data) => {
        _data = data;
        resolve(_data);
      });
    }
  );

  return {
    add: add,
    getData: getData,
    reloadData: reloadData
  };
}());

export {DataService};