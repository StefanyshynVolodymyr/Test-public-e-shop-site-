// loginUser.js
export const loginUser = async (email, password) => {
  await $('.ico-login').click();
  await $('//input[@id="Email"]').setValue(email);
  await $("//input[@id='Password']").setValue(password);
  await $("//input[@value='Log in']").click();
};