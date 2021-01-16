const puppeteer = require('puppeteer');

async function robot() {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://leilos.com.br/simulador3#')

	async function setAuctionBidAmount(){
		let bidValue = await page.evaluate(() => { return document.querySelectorAll('.text-right')[3].innerText})
		let incrementValue = await page.evaluate(() => { return document.querySelectorAll('.col-4.mt-2.texto-laranja.texto-p.semibold.text-center')[2].innerText})
		incrementValue = incrementValue.replace('Incremento:', '').replace('.', "").replace('R$ ', '').replace(',', '.')
		bidValue = bidValue.replace('R$ ', '').replace('.', '')
		bidValue = parseFloat(bidValue)
		incrementValue = parseFloat(incrementValue)
		return bidValue + incrementValue
	}

	async function setBidAuction(value) {
		await page.type('.form-control.input.borda-lilas.rounded-0.texto-m', value)
		await page.click('.btn.btn-light.rounded-pill.btn3')
		await page.click('.swal2-confirm.swal2-styled')
		await page.click('.swal2-confirm.swal2-styled')
	}

	async function getStatus() {
		let status = await page.evaluate(() => {
			return document.querySelector('.col-12.text-center.texto-pp.semibold.mb-4.mt-2').innerText
		})
		console.log(status);
		if (status === 'STATUS: LANCE SUPERADO') {
			//let value = setAuctionBidAmount()
			setBidAuction('125000000')
		}
	}

	setInterval(getStatus, 1000)
}

robot()
//Botão registrar lance
//.btn.btn-light.rounded-pill.btn3

//Botão confirmar lance
//.swal2-confirm.swal2-styled

























/*
async function robot() {
	async function getValueBitcoin(){
		let newBitcoinValue = await page.evaluate(() => {
			return document.querySelector('.pid-1057391-last').textContent
		})

		newBitcoinValue = parseFloat(newBitcoinValue)
		console.log(newBitcoinValue - bitcoinValue);
		if((newBitcoinValue - bitcoinValue) > 0.001){
			console.log('Comprei Bitcoin');
			await page.type('.searchText.arial_12.lightgrayFont.js-main-search-bar', 'Eureca')
			bitcoinValue = newBitcoinValue
		}
	}


		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		await page.goto('https://br.investing.com/crypto/bitcoin');

		let aux = setInterval(getValueBitcoin, 1000)
}
*/