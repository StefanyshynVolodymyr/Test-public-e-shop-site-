const enterCardData = async () => {
    await $("//input[@id='CardholderName']").setValue('Volodymyr');
    await $("//input[@id='CardNumber']").setValue('4242424242424242');
    await $("#ExpireMonth > option:nth-child(2)").click();
    await $("#ExpireYear > option:nth-child(8)").click();
    await $("//input[@id='CardCode']").setValue('123');
  };
  export { enterCardData };