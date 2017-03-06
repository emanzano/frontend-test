const express = require('express');
let router = express.Router();
const request = require('./utilities/requests.js');

/* GET search products listing. */
router.get('/items', function (req, res, next) {

  const query = req.query.q;
  request
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
    .then((body) => {
      try {
        // Parse the data
        const items = JSON.parse(body);

        const filters = items.filters;

        let categoriesFromRoot = filters[0].values != null
          ? filters[0]
            .values[0]
            .path_from_root
            .map((cat) => (cat.name))
          : [];

        let mappedItems = {
          author: {
            name: 'Ezequiel Agustín',
            lastname: 'Manzano'
          },
          categories: categoriesFromRoot,
          items: []
        };

        // Map the data
        let promises = items
          .results
          .map((item) => {

            return request
              .get(`https://api.mercadolibre.com/currencies/${item.currency_id}`)
              .then((currencyBody) => {
                try {
                  // Parse Currency Body
                  const currency = JSON.parse(currencyBody);
                  const priceInt = Number.parseInt(item.price);
                  const priceDec = Number.parseInt((item.price - priceInt) * 100);

                  return {
                    id: item.id,
                    title: item.title,
                    price: {
                      currency: currency.symbol,
                      amount: priceInt,
                      decimals: priceDec
                    },
                    picture: item.thumbnail,
                    condition: item.condition,
                    free_shipping: item.shipping.free_shipping,
                    state: item.address.state_name
                  };
                } catch (errorCurrencyParse) {
                  next(errorCurrencyParse);
                }
              }, (errorCurrency) => {
                next(errorCurrency);
              });
          });

        Promise
          .all(promises)
          .then((items) => {
            mappedItems.items = items;
            res.json(mappedItems);
          });
      } catch (error) {
        next(error);
      }
    }, (error) => {
      next(error);
    });
});

/* GET given id product. */
router.get('/items/:id', function (req, res, next) {
  const id = req.params.id;

  request
    .get(`https://api.mercadolibre.com/items/${id}`)
    .then((itemBody) => {

      try {
        // Parse data
        const item = JSON.parse(itemBody);

        request
          .get(`https://api.mercadolibre.com/items/${id}/description`)
          .then((descriptionBody) => {
            try {
              const itemDescription = JSON.parse(descriptionBody);

              request
                .get(`https://api.mercadolibre.com/categories/${item.category_id}`)
                .then((categoryBody) => {
                  try {
                    const category = JSON.parse(categoryBody);

                    let categoriesFromRoot = category
                      .path_from_root
                      .map((cat) => {
                        return cat.name;
                      });

                    request
                      .get(`https://api.mercadolibre.com/currencies/${item.currency_id}`)
                      .then((currencyBody) => {
                        try {
                          // Parse Currency Body
                          const currency = JSON.parse(currencyBody);
                          const priceInt = Number.parseInt(item.price);
                          const priceDec = Number.parseInt((item.price - priceInt) * 100);

                          // Map the data
                          var mappedItem = {
                            author: {
                              name: 'Ezequiel Agustín',
                              lastname: 'Manzano'
                            },
                            item: {
                              id: item.id,
                              title: item.title,
                              price: {
                                currency: currency.symbol,
                                amount: priceInt,
                                decimals: priceDec
                              },
                              picture: item.pictures[0].url,
                              condition: item.condition,
                              free_shipping: item.shipping.free_shipping,
                              sold_quantity: item.sold_quantity,
                              description: itemDescription.plain_text || itemDescription.text || ''
                            }
                          };

                          res.json(mappedItem);
                        } catch (errorCurrencyParse) {
                          next(errorCurrencyParse);
                        }
                      }, (errorCurrency) => {
                        next(errorCurrency);
                      });
                  } catch (error) {
                    next(error);
                  }
                }, (error) => {
                  next(error);
                });
            } catch (errorParseItemDescription) {
              next(errorParseItemDescription);
            }
          }, (errorItemDescription) => {
            next(errorItemDescription)
          });
      } catch (errorParseItem) {
        next(errorParseItem);
      }
    }, (errorItem) => {
      next(errorItem);
    });
});

module.exports = router;