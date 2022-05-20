## Challenges

### 1. Grabbing props from one component to be used in the another component.

By default, props can only be passed from parent to child. Props can't to be passed from one sibling to another.

But that can be solved through lifting state - controlling state of the donor sibling component within the parent component so props can now be passed from the parent component to both sibling components.

However, controlling all states from the parent component quickly becomes cumbersome if the project is complex with lots of components.

Solution: That can be solved through Redux. All state is controlled from one point - the store - from where is can be accessed from anywhere in the app.

### 2. Hiding the footer and navigation on the information page.

I found a [solution on stackoverflow](https://stackoverflow.com/questions/67663919/how-to-hide-header-only-at-one-page-in-nextjs-app)

### 3. Navigating the next page using the submit button.

Whenever I wrapped the submit button in the `Link` tag like so...

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
