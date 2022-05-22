

## Challenges

### 1. Grabbing props from one component to be used in the another component.

By default, props can only be passed from parent to child. Props can't to be passed from one sibling to another.

But that can be solved through lifting state - controlling state of the donor sibling component within the parent component so props can now be passed from the parent component to both sibling components.

However, controlling all states from the parent component gets cumbersome in no time if the project is complex with lots of components.

Solution: That can be solved through Redux. All state is controlled from one point - the store - from where is can be accessed from anywhere in the app.

### 2. Hiding the footer and navigation on the information pages (address, shipping, payment, review).

I found a [solution on stackoverflow](https://stackoverflow.com/questions/67663919/how-to-hide-header-only-at-one-page-in-nextjs-app)

### 3. Navigating the next page using the submit button.

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

## LESSONS

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

## WAY FORWARD

- This project has enabled me to improve on my skills and confidence so I'm looking forward to building more complicated projects like this one.

- During the project, I found myself required to read documentation as I could not find the solutions to my problems on google, you-tube, stack overflow e.t.c. So I'm going to get myself used to reading documentation in my next projects.