const {Given, When, Then, Before, After, DataTable} = require ('@cucumber/cucumber');
const {Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');

let driver;
Before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
});

After(async function() {
    await driver.quit();
});

Given('que esteja na pagina de login', async function() {
    await driver.manage().window().maximize();
    await driver.get('http://localhost:4000/');
});

When('realizo login com as seguintes credenciais', async function(dataTable){
    const data = dataTable.rowsHash();
    const usuario = data.usuario;
    const senha = data.senha;

    await driver.findElement(By.id('username')).sendKeys(usuario);
    await driver.findElement(By.id('senha')).sendKeys(senha);
    await driver.findElement(By.xpath('//*[@id="login-section"]/button')).click();
});

Then('sou redirecionado para pagina inicial', async function () {
    const titulo = await driver.findElement(By.xpath('//*[@id="app-section"]/div[1]/div/h4'), 10000).getText();

    assert.strictEqual('Realizar Transferência', titulo);
});