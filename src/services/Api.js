var DataService = (function(){
  var _data = [];
  var isLoad = false;
  var researchProcessApi = 'http://localhost:3000/api/ResearchProcesses';
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

  function fetchData() {
    fetch(researchProcessApi)
      .then(function (response) {
        return response.json();
      }).then((data) => {
        console.log("this is the callback 2");
        _data = data;
      });
  }

  return {
    add: add,
    fetchData: fetchData,
    getData: getData,
    reloadData: reloadData
  };
}());

export {DataService};