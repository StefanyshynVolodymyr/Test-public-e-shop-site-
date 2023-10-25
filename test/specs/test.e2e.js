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
        await browser.url(`https://demowebshop.tricentis.com`)

        await $('.ico-register').click()
        await $("//input[@id='gender-male']").click()
        
       
        await $("//input[@id='FirstName']").setValue('Volodymyrr');
        await $("//input[@id='LastName']").setValue('Stefanyshynr');
        
        
        await $('//input[@id="Email"]').setValue(email);

        
        await $("//input[@id='Password']").setValue('Password!');
        await $("//input[@id='ConfirmPassword']").setValue('Password!');
        
        const submitButton = await $('#register-button');
        await submitButton.click()

        let result = await $("//div[@class='result']").getText()
        expect (result).toEqual('Your registration completed')

        await $("//a[@href='/logout']").click()

    })

    it('Verify that allows login a User', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)

        await $('.ico-login').click()

        await $('//input[@id="Email"]').setValue('tes222t@gmail.com');
        await $("//input[@id='Password']").setValue('123456');

        await $("//input[@value='Log in']").click()

        expect (await ("//a[@href='/logout']']")).toBeDisplayed()

    })

    it.only('Verify that allows login a User', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)

        await $("//ul[@class='list']//a[@href='/computers']").click()

        const subGroupLinks = await $$('//ul[@class="sublist"]//li/a');
        const subGroupNames = await Promise.all(subGroupLinks.map(async (link) => link.getText())); 
       
        // Define the expected sub-group names
        const expectedSubGroupNames = ['Desktops', 'Notebooks', 'Accessories'];

        // Check if there are exactly 3 sub-groups
        expect(subGroupLinks.length).toBe(3);

        // Verify the names of each sub-group
        subGroupNames.forEach((subGroupName, index) => {
        expect(subGroupName).toBe(expectedSubGroupNames[index]);
  });


 

    })   
}) 

