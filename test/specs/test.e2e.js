import { expect, browser, $ } from '@wdio/globals'

function generateRandomEmail() {
    const emailPrefix = Math.random().toString(36).substring(7);
    return `${emailPrefix}@example.com`;
  }

describe('e-shop', () => {
    let email; 
    before(() => {
      email = generateRandomEmail();
    });

    it('Verify that allows register a User', async () => {
        await browser.url(`https://demowebshop.tricentis.com`);

        await $('.ico-register').click()
        await $("//input[@id='gender-male']").click()
        
       
        await $("//input[@id='FirstName']").setValue('Volodymyrr');
        await $("//input[@id='LastName']").setValue('Stefanyshynr');
        
        
        await $('//input[@id="Email"]').setValue(email);

        
        await $("//input[@id='Password']").setValue('Password!');
        await $("//input[@id='ConfirmPassword']").setValue('Password!');
        
        const submitButton = await $('#register-button');
        await submitButton.click()

        let result = await $("//div[@class='result']").getText();
        expect (result).toEqual('Your registration completed');

        await $("//a[@href='/logout']").click()

    });

    it('Verify that allows login a User', async () => {
        await browser.url(`https://demowebshop.tricentis.com`);

        await $('.ico-login').click()

        await $('//input[@id="Email"]').setValue('tes222t@gmail.com');
        await $("//input[@id='Password']").setValue('123456');

        await $("//input[@value='Log in']").click()

        expect (await ("//a[@href='/logout']']")).toBeDisplayed();

    });

    it('Verify that Computers group has 3 sub-groups with correct names', async () => {
        await browser.url(`https://demowebshop.tricentis.com`);

        await $("//ul[@class='list']//a[@href='/computers']").click();

        const subGroupLinks = await $$('//ul[@class="sublist"]//li/a');
        const subGroupNames = await Promise.all(subGroupLinks.map(async (link) => link.getText())); 
       
        // Define the expected sub-group names
        const expectedSubGroupNames = ['Desktops', 'Notebooks', 'Accessories'];

        // Check if there are exactly 3 sub-groups
        expect(subGroupLinks.length).toBe(3);

        // Verify the names of each sub-group
        subGroupNames.forEach((subGroupName, index) => {
        expect(subGroupName).toBe(expectedSubGroupNames[index])});
        
    });
    
    
  it('Verify that allows sorting items (different options)', async () => {
    await browser.url(`https://demowebshop.tricentis.com`);
  
    // Navigate to the relevant page
    await $("//ul[@class='list']//a[@href='/computers']").click();
    await $("//h2[@class='title']/a[@title='Show products in category Desktops']").click();
    await $("#products-orderby").click();
    await $("option:nth-child(4)").click();
  
    // Select all product price elements
    const productPrices = await $$(".product-grid .item-box .price.actual-price");
  
    // Extract and store product prices in an array
    const prices = await Promise.all(productPrices.map(async (priceElement) => {
      const productPrice = await priceElement.getText();
      return parseFloat(productPrice.replace('$', '').replace(',', '')); // Assuming prices are formatted as $X,XXX.XX
    }));
  
    // Check if prices are sorted from low to high
    let isSorted = true;
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] < prices[i - 1]) {
        isSorted = false;
        break;
      }
    }
  
    // Log the result of the sorting check
    if (isSorted) {
      console.log('Product prices are sorted from low to high.');
    } else {
      console.log('Product prices are not sorted from low to high.');
    }

    expect(isSorted).toEqual(true);
  });


  it('Verify that allows sorting items in descending order', async () => {
    await browser.url(`https://demowebshop.tricentis.com`);
  
    // Navigate to the relevant page
    await $("//ul[@class='list']//a[@href='/computers']").click();
    await $("//h2[@class='title']/a[@title='Show products in category Desktops']").click();
    await $("#products-orderby").click();
    await $("option:nth-child(5)").click();
  
    // Select all product price elements
    const productPrices = await $$(".product-grid .item-box .price.actual-price");
  
    // Extract and store product prices in an array
    const prices = await Promise.all(productPrices.map(async (priceElement) => {
      const productPrice = await priceElement.getText();
      return parseFloat(productPrice.replace('$', '').replace(',', '')); // Assuming prices are formatted as $X,XXX.XX
    }));
  
    // Check if prices are sorted from high to low
    let isSorted = true;
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) {
        isSorted = false;
        break;
      }
    }
  
    // Log the result of the sorting check
    if (isSorted) {
      console.log('Product prices are sorted from high to low.');
    } else {
      console.log('Product prices are not sorted from high to low.');
    }
  
    expect(isSorted).toEqual(true);
  });
  

   

}) 

