
## Challenges

### 1. Grabbing props from one component and used in the another component.
By default, props can only be passed from parent to child. Props can't to be passed from one sibling to another. 

But that can be solved through lifting state - controlling state of the donor sibling component within the parent component so props can now be passed from the parent component to both sibling components. 

However, controlling all states from the parent component quickly becomes cumbersome if the project is complex with lots of components.

Solution: That can be solved through Redux. All state is controlled from one point - the store - from where is can be accessed from anywhere in the app.

### 2. Hiding the footer and navigation on the information page.
I found a [solution on stackoverflow](https://stackoverflow.com/questions/67663919/how-to-hide-header-only-at-one-page-in-nextjs-app)

