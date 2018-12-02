var DataService = (function() {
  var _data = [];
  var isLoad = false;
  var researchApi = "http://localhost:3000/api/Research";
  var researchGoalApi = "http://localhost:3000/api/ResearchGoals";
  var filterInResearch = "filter[include]=research";

  function add(item) {
    _data.push(item);
  }

  var getData = new Promise(function(resolve, reject) {
    if (isLoad) {
      resolve(_data);
    } else {
      fetch(researchApi)
        .then(function(response) {
          return response.json();
        })
        .then(data => {
          _data = data;
          resolve(data);
        });
    }
  });

  var reloadData = new Promise(function(resolve, reject) {
    fetch(researchApi)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        _data = data;
        resolve(data);
      });
  });

  return {
    add: add,
    getData: getData,
    reloadData: reloadData,
    researchApi: researchApi,
    researchGoalApi: researchGoalApi,
    filterInResearch: filterInResearch
  };
})();

export { DataService };
