const axios = require('axios');
const cheerio = require('cheerio');

const Brands_info = {};

axios.get('https://www.myauto.ge/ka')
    .then((response) => {
        const $ = cheerio.load(response.data);

        $('.brand-info').each((index, element) => {
            const brandName = $(element).find('.brand-name').text().trim();
            const brandId = parseInt($(element).find('.brand-id').text().trim());
            const year = $(element).find('.year').text().trim();

            Brands_info[brandName] = {
                brandId: brandId,
                year: year
            };
        });

        console.log(Brands_info);
    })
    .catch((error) => {
        console.log(error);
    });
