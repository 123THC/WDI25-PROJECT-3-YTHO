const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');
const betfairData = require('../controllers/betfairData');
const auth = require('../controllers/auth');
const accy = require('../controllers/accumulators');


router.route('/profile')
  .get(secureRoute, auth.profile);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/listEvents')
  .get(betfairData.listEvents);

router.route('/listMarkets')
  .get(betfairData.listMarkets);

router.route('/marketOdds')
  .get(betfairData.getMarketOdds);

router.route('/accumulators')
  .post(secureRoute, accy.create);

router.route('/accumulators/:id')
  .get(accy.show)
  .put(accy.push)
  .delete(secureRoute, accy.delete);


router.all('/*', (req, res) => res.notFound());

module.exports = router;
