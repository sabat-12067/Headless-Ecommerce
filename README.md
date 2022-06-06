
# [HEADLESS ECOMMERCE WEB APPLICATION](https://asmn-grocery-store.netlify.app)

<!-- ![screenshot](https://res.cloudinary.com/dbsbevgcj/image/upload/v1654530655/Screenshot_20220606_174245_Chrome_7d32a6a9f5.jpg?updated_at=2022-06-06T15:50:57.804Z) -->
<div>
<img src="https://res.cloudinary.com/dbsbevgcj/image/upload/v1654530655/Screenshot_20220606_174245_Chrome_7d32a6a9f5.jpg?updated_at=2022-06-06T15:50:57.804Z" width="100" height="200">
&nbsp;
<img src="https://res.cloudinary.com/dbsbevgcj/image/upload/v1654530656/Screenshot_20220606_174303_Chrome_02cef15d9a.jpg?updated_at=2022-06-06T15:50:59.103Z" width="100" height="200">
&nbsp;
<img src="https://res.cloudinary.com/dbsbevgcj/image/upload/v1654530657/Screenshot_20220606_174352_Chrome_ac216fd581.jpg?updated_at=2022-06-06T15:50:59.999Z" width="100" height="200">
</div>
&nbsp;
<img src="https://res.cloudinary.com/dbsbevgcj/image/upload/v1654533223/Screenshot_20220606_191542_Chrome_0134432b45.jpg?updated_at=2022-06-06T16:33:45.076Z" width="100" height="200">
</div>
&nbsp;
<img src="https://res.cloudinary.com/dbsbevgcj/image/upload/v1654533226/Screenshot_20220606_191611_Chrome_b33e907217.jpg?updated_at=2022-06-06T16:33:48.580Z" width="100" height="200">
</div>
&nbsp;
<img src="https://res.cloudinary.com/dbsbevgcj/image/upload/v1654533207/Screenshot_20220606_192548_Chrome_Copy_fa8f9fe212.jpg?updated_at=2022-06-06T16:33:29.998Z" width="100" height="200">
&nbsp;
<img src="https://res.cloudinary.com/dbsbevgcj/image/upload/v1654533211/Screenshot_20220606_192620_Chrome_82681db573.jpg?updated_at=2022-06-06T16:33:34.160Z" width="100" height="200">
</div>

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

The site was built using static site generation to provide short page load times and serve customers with much better user experience. 

I aslo employed static site generation as I won't be updating the invetory very often.

**Within the application, users are be able to accomplish the following tasks.**
 - See hover states for all interactive elements on the page.
 - **Add/Remove** products from the cart.
 - **Edit** product quantities in the cart.
 - Have a **'buy it now'** option that enables the customer to skip the cart section.
 - **Fill** in all fields in the checkout.
 - Receive **form validations** if fields are missed or incorrect during checkout.
 - See **correct checkout totals** depending on the products in the cart.
   - VAT is calculated as 3% of the product total, excluding shipping.
   - Shipping always adds a certain amount to the order depending on the shippng method selected.
 - **Subscribe** to the email list after checking 'send me special offers'
 - See an **order confirmation modal** after checking out with an order summary.
 - Retain their products in the cart after refreshing the page or after leaving the website.
 - Checkout using stripe.

## MY PROCESS

### Built with.
- React.js as the front-end library
- Next.js as the react framework
- Tailwind css
- Redux for state management
- Strapi
- Stripe for handling payments.
- Local storage for persisting data.
- Nodejs for user authentication and handling stripe API integration.
- MongoDb.

#### Why I Chose Next.js
- The file-system based routing **makes navigation in a multi-paged application easier and seamless.** 

That made development of the site more rapid. After my previous project, I learnt that page navigation 
with the react-router - in react.js - would not be as efficient. 

- **Short page load time.** A Next.js application is super-fast thanks to static site generation. 

That helps to provide a rich user experience and that's important to an ecommerce website for obvious reasons - **increasing conversion rates and sales.** 

- **Improved SEO (Search Engine Optimization)** 

It is super important for an ecommerce website to be easily discovered by customers searching for products online which will increase sales.

The built-in pre-rendering functionality in Next.js makes crawling of the website by search engine and social media crawlers much more efficient. Hence the chances of ranking the website in search engines increases.

I also tried to include long-tail keywords in the text of the site and more importantly the headings to improve SEO.

### Why I chose redux.
- It enabled handling and managing state in one place where it can be accessed from any part of the application.

### Stripe integration.
I had two options - Prebuilt Stripe Checkout and stripe payment intents. The stripe checkout option is much easier to start with but it's less customisable.

So it couldn't meet my needs. I went with stripe payment intents which though being more customisable, it has a steeper learning curve for working with its API.

You can read more about the [stripe payment intents API](https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements&html-or-react=react)
 
### Challenges

#### 1. Grabbing props from one component to be used in the another component.

By default, props can only be passed from parent to child. Props can't to be passed from one sibling to another.

But that can be solved through lifting state - controlling state of the donor sibling component within the parent component so props can now be passed from the parent component to both sibling components...

a concept also termed as prop-drilling. That's exactly what I used in my previous less complex project of a bmi application.

However, controlling all states from the parent component gets cumbersome in no time if the project is complex with lots of components.

**Solution:** That can be solved through Redux. All state is controlled from one point - the store - from where is can be accessed from anywhere in the app.

#### 2. Hiding the footer and navigation on the information pages (address, shipping, payment, review).

I found a [solution on stackoverflow](https://stackoverflow.com/questions/67663919/how-to-hide-header-only-at-one-page-in-nextjs-app)

#### 3. Navigating the next page using the submit button.

Whenever I wrapped the submit button in the `Link` component like so...

```js
<Link href='/information/shipping' passHref>
  <Button type='submit'>Continue to shipping</Button>
</Link>
```

I would navigate straight to the next page without validating the form. 

So I needed a way to navigate to the next page only if a form is validated.

After spending several hours looking for a solution, I found the [_answer in the next.js router documentation._](https://nextjs.org/docs/api-reference/next/router)

**Code solution:**

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

2. Using next.js to create a multipage application with static site generation.

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
5. Integrating local storage into a project so as to persist data when a page reloads or if a user has to leave a site.

6. Integrating stripe API to accept on line payments.
### Continued development

- This project has enabled me to improve on my skills and confidence so I'm looking forward to building more complex projects like this one.

- During the project, I found myself required to read documentation as I could not find the solutions to my problems on google, you-tube, stack overflow e.t.c. So I'm going to get myself used to reading documentation in my next projects. 