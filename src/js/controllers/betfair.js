angular
  .module('YTHO')
  .controller('BetfairSelectCtrl', BetfairSelectCtrl)
  .controller('BetfairMarketCtrl', BetfairMarketCtrl);

BetfairSelectCtrl.$inject = ['$http', '$stateParams'];
function BetfairSelectCtrl($http, $stateParams) {
  const vm = this;

  const list = {
    Soccer: 1,
    Tennis: 2,
    Golf: 3,
    Cricket: 4,
    Rugby: 5,
    Boxing: 6,
    Horse: 7,
    Motor: 8,
    ESports: 27454571,
    Special: 10
  };

  vm.all = [];

  listEvents();

  function listEvents() {
    $http
      .get('/api/listEvents', { params: { eventTypeId: list[$stateParams.eventType] }})
      .then((response) => vm.all = response.data);

    changeEventType();
  }

  function changeEventType() {
    vm.eventType = $stateParams.eventType;
  }
}



BetfairMarketCtrl.$inject = ['$http', '$state', '$stateParams'];
function BetfairMarketCtrl($http, $state, $stateParams) {
  const vm = this;

  listMarkets();

  vm.listMarkets = listMarkets;
  vm.runnerNames = [];

  vm.selectMarket = selectMarket;
  vm.getMarketOdds = getMarketOdds;

  function listMarkets() {
    vm.eventType = $stateParams.eventType;
    $http
      .get('/api/listMarkets', { params: $stateParams })
      .then((response) => {
        vm.markets = response.data;
      });
  }

  function selectMarket(selectedMarket) {
    vm.markets.forEach((market) => {
      market.selected = false;
    });
    selectedMarket.selected = true;
    selectedMarket.runners.forEach((element) => {
      return vm.runnerNames.push(element.runnerName);
    });
  }

  function getMarketOdds(marketId) {
    $http
      .get('/api/marketOdds', { params: { marketId }})
      .then((response) => {
        vm.specificMarket = response.data[0];
      });
  }

}
