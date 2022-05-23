
# [HEADLESS ECOMMERCE WEB APPLICATION](https://asmn-grocery-store.netlify.app)

## Table of contents

- [Overview](#overview)
  - [About the project](#about-the-project)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Challenges](#challenges)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

## OVERVIEW

### About the project
This is a multi-page headless e-commerce website. The products were fetched from an API I built with strapi.

I built the site using static site generation to provide short page load times and serve customers with much better user experience.

Within the application, users are be able to accomplish the following tasks
 - See hover states for all interactive elements on the page.
 - Add/Remove products from the cart.
 - Edit product quantities in the cart.
 - Have a 'buy it now' option that enables the customer to skip the cart.
 - Fill in all fields in the checkout.
 - Receive form validations if fields are missed or incorrect during checkout.
 - See correct checkout totals depending on the products in the cart.
   - VAT is calculated as 3% of the product total, excluding shipping.
   - Shipping always adds a certain amount to the order depending on the shippng method selected.
 - Subscribe to the email list after checking 'send me special offers'
 - See an order confirmation modal after checking out with an order summary.

## MY PROCESS

### Built with.
- React.js as the front-end library
- Next.js as the react framework
- Tailwind css
- Redux for state management
- Strapi

#### Why I Chose Next.js
- The file-system based router *makes navigation in a multi-paged application easier and seamless.* That made development of the site more rapid. After my previous project, I learnt that page navigation - with the react-router - in react.js would not be as efficient. 
- *Short page load time.* A Next.js application is super-fast thanks to static site generation. That helps to provide a rich user experience and that's important to an ecommerce website for obvious reasons - *increasing conversion rates and sales.* 

### Why I chose redux.
- It enabled handling and managing state in one place where it can be accessed from any part of the application.
 
### Challenges

#### 1. Grabbing props from one component to be used in the another component.

By default, props can only be passed from parent to child. Props can't to be passed from one sibling to another.

But that can be solved through lifting state - controlling state of the donor sibling component within the parent component so props can now be passed from the parent component to both sibling components...

a concept also termed as prop-drilling. That's exactly what I used in my previous less complex project of a bmi application.

However, controlling all states from the parent component gets cumbersome in no time if the project is complex with lots of components.

Solution: That can be solved through Redux. All state is controlled from one point - the store - from where is can be accessed from anywhere in the app.

#### 2. Hiding the footer and navigation on the information pages (address, shipping, payment, review).

I found a [solution on stackoverflow](https://stackoverflow.com/questions/67663919/how-to-hide-header-only-at-one-page-in-nextjs-app)

#### 3. Navigating the next page using the submit button.

Whenever I wrapped the submit button in the `Link` component like so...

```js
<Link href='/information/shipping' passHref>
  <Button type='submit'>Continue to shipping</Button>
</Link>
```

I would navigate straight to the next page without validating the form. So I needed a way to navigate to the next page only if a form is validated.
After spending several hours looking for a solution, I found the [_answer in the next.js router documentation._](https://nextjs.org/docs/api-reference/next/router)

Code solution:

```js
//OnSubmit() function is only called when the form is validated
const onSubmit = (data) => {
  //console.log(data);
  dispatch(informationActions.setAddressInfo(data));
  router.push('/information/shipping');
};
```

###  What I learned

1. Managing state of an application from one point so it can be accessed any where within the app using redux.

2. Using next.js to create a multipage application with static side generation.

3. Using third party APIs and packages to complete certain tasks.

- Using [the swiper API](https://swiperjs.com/react) to create an image slider.
- Creating forms and validating them using the [react hook form API documentation](https://react-hook-form.com/get-started)

4. Alternative way of navigating between pages besides using the `Link` component. This was a very important lesson as it allowed me to add more complex interactivity to the app.
   _The normal way:_

```js
<button className='uppercase rounded-none'>
  <Link href='/'>back to home</Link>
</button>
```

_Alternative way:_

```js
<button className='uppercase rounded-none' onClick={() => router.push(/)}>
  back to home
</button>
```

### Continued development

- This project has enabled me to improve on my skills and confidence so I'm looking forward to building more complicated projects like this one.

- During the project, I found myself required to read documentation as I could not find the solutions to my problems on google, you-tube, stack overflow e.t.c. So I'm going to get myself used to reading documentation in my next projects.