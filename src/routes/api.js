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

        let categoriesFromRoot = filters.values != null ? filters.values.path_from_root.map((cat) => (cat.name)) : [];

        let mappedItems = {
          author: {
            name: 'Ezequiel Agustín',
            lastname: 'Manzano'
          },
          categories: categoriesFromRoot,
          items: []
        };

        // Map the data
        mappedItems.items = items.results.map((item) => {
          return {
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount: item.price - (item.price % 1),
              decimals: item.price % 1
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            state: item.address.state_name
          };
        });

        res.json(mappedItems);
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
                          currency: item.currency_id,
                          amount: item.price - (item.price % 1),
                          decimals: item.price % 1
                        },
                        picture: item.pictures[0].url,
                        condition: item.condition,
                        free_shipping: item.shipping.free_shipping,
                        sold_quantity: item.sold_quantity,
                        description: itemDescription.text || itemDescription.plain_text || ''
                      }
                    };

                    res.json(mappedItem);
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