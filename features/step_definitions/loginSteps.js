const {Given, When, Then, Before, After, DataTable} = require ('@cucumber/cucumber');
const {Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');

Before(async function() {
    this.driver = await new Builder().forBrowser('chrome').build();
});

After(async function() {
    await this.driver.quit();
});

Given('que esteja na pagina de login', async function() {
    await this.driver.manage().window().maximize();
    await this.driver.get('http://localhost:4000/');
});

When('realizo login com as seguintes credenciais', async function(DataTable){
    const data = DataTable.rowsHash();
    const usuario = data.usuario;
    const senha = data.senha;

    await this.driver.findElement(By.id('username')).sendKeys(usuario);
    await this.driver.findElement(By.id('senha')).sendKeys(senha);
    await this.driver.findElement(By.xpath('//*[@id="login-section"]/button')).click();
});

Then('sou redirecionado para pagina inicial', async function () {
    //const titulo = await driver.findElement(By.xpath('//*[@id="app-section"]/div[1]/div/h4'), 10000).getText();

    //assert.strictEqual('Realizar Transferência', titulo);
    const xpath = '//*[@id="app-section"]/div[1]/div/h4';
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
    await this.driver.wait(async () => {
    const text = await this.driver.findElement(By.xpath(xpath)).getText();
    return text === 'Realizar Transferência';
    }, 10000);

    const titulo = await this.driver.findElement(By.xpath(xpath)).getText();
    assert.strictEqual('Realizar Transferência', titulo);
});