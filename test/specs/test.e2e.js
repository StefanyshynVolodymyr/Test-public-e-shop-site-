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

    it('should login with valid credentials', async () => {
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

    it('should login with valid credentials', async () => {
        await browser.url(`https://demowebshop.tricentis.com`)

        await $('.ico-login').click()

        await $('//input[@id="Email"]').setValue('tes222t@gmail.com');
        await $("//input[@id='Password']").setValue('123456');

        await $("//input[@value='Log in']").click()

        expect (await ("//a[@href='/logout']']")).toBeDisplayed()
       


        


    })


   
}) 

