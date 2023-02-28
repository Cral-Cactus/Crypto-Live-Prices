const axios = require('axios');
const formatCurrency = require('format-currency');

const coins = ['BTC', 'ETH', 'LTC', 'SOL', 'BNB'];
const currencies = ['EUR', 'USD', 'GBP'];

function fetchPrices() {
  const promises = coins.map(coin => {
    return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${currencies.join(',')}`);
  });

  Promise.all(promises)
    .then(responses => {
      const prices = responses.map(response => response.data);
      displayMenu(prices);
      setTimeout(fetchPrices, 30000);
    })
    .catch(error => {
      console.log(`Error fetching data: ${error.message}`);
      setTimeout(fetchPrices, 30000);
    });
}

function clearConsole() {
    process.stdout.write('\x1Bc');
  }  

  function displayMenu(prices) {
    clearConsole();
    console.log('============================');
    console.log('      Crypto Prices');
    console.log('============================');
    coins.forEach((coin, index) => {
      console.log(`\n${coin}:`);
      currencies.forEach(currency => {
        console.log(`   ${currency}: ${priceToString(prices[index][currency])}`);
      });
    });
    console.log('============================');
  }
  
function priceToString(price) {
  const opts = { format: '%s%v', symbol: '' };
  return formatCurrency(price, opts);
}

fetchPrices();
