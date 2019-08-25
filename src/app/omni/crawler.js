'use strict';

const puppeteer = require('puppeteer');
const config = require('config');

const OMNI_URL = config.get('omni.host');

const webCrawler = async function webCrawler(url) {
    const startTime = new Date().getTime();
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(url, { waitUntil: 'networkidle0' });

    const hotelData = await page.evaluate(() => {
        const noResults = document.querySelector('.noResults .info-message h2');
        if (noResults) {
            return { message: { details: [noResults.innerHTML] } };
        }

        const hotels = [];
        const hotelsElms = document.querySelectorAll('.roomName');

        hotelsElms.forEach((hotelElement) => {
            const slides = hotelElement.querySelectorAll('.slide');
            const images = [];

            slides.forEach((image) => {
                images.push(image.querySelector('img').src);
            });

            const roomDate = {
                'roomName': hotelElement.querySelector('.excerpt h5').firstChild.innerHTML,
                'description': hotelElement.querySelector('.description').innerHTML,
                'price': hotelElement.querySelector('.bestPriceTextColor h6').innerHTML,
                'images': images
            };

            hotels.push(roomDate);
        });
        return hotels;
    });
    console.log(`${(new Date().getTime() - startTime) / 1000} seconds after the start of PageScraping`);
    return hotelData;
};

const getRoomsByDate = async function getRoomsByDate(params, callback) {
    const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    let rooms = [];
    try {
        rooms = await webCrawler(`${OMNI_URL}?${queryString}`);
    } catch (error) {
        return callback({
            error: {
                details: ['Internal Server Error, Try Again Later']
            }
        });
    }
    return callback(null, rooms);
};

module.exports = {
    getRoomsByDate
};
