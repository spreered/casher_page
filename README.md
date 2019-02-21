# Cashier page
a single client side graphql/actioncable web page implement
- Action Cable JS lib from npm :  [actioncable](https://www.npmjs.com/package/actioncable)

# Common setup
```
$ git clone git@git.5xruby.tw:spreered/cashier_page.git
$ cd cashier_page
```
install package
```
$ npm install
```
run server `http://localhost:8000/`
```
$ npm start
```

# Cable Client How To
Install [actioncable](https://www.npmjs.com/package/actioncable) 

```bash
$ npm install actioncable --save
```
Create `index.html`, `main.js` page, and include `actioncable` and `main.js` into index page
```html
<html>
<body> 
<!-- content... -->

  <script src="node_modules/actioncable/lib/assets/compiled/action_cable.js"></script>
  <script src="main.js"></script>
</body>
```

Then we start coding in _main.js_

setup websocket link
```js
const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
```
if you wanna connect to production server, pls [configure your Rails app](https://git.5xruby.tw/spreered/graphql_sub#wss-url-on-the-production) first

the basic hook funciton of Action Cable
```js
cable.subscriptions.create('CashierStreamChannel', {
  connected() {
    console.log('CashierStream channel connected..')
  },
  disconnected() {
    console.log('CashierStream channel disconnected..')
  },
  received(data) {
    // received hook from server
  },
});
```
And you can add your own function. Create a funciton to sent query to server
```js
cable.subscriptions.create('CashierStreamChannel', {
  // ...
  executeQuery(query, variables = {}, operationName = ""){
    const channelParams = {
      query: query,
      // variables: variables,
      // operationName: operationName,
    }
    this.perform('execute', channelParams)
  }
});
```
Then we can use it when `connected` happened like:
```js
cable.subscriptions.create('CashierStreamChannel', {
  connected() {
    console.log('CashierStream channel connected..')
    this.executeQuery(anyQueryYouWantToSend)
  },
  // ...

  executeQuery(query, variables = {}, operationName = ""){
    // ...
  }
});
```
So that, we can use `cable.executeQuery(query)` to send any GraphQL query we want ( query, mutation, subscription )

We cand handle the return message in `received()` hook from websocket host
```js
cable.subscriptions.create('CashierStreamChannel', {
  connected() {
    // ...
  },
  // ...
  received(data){
    renderDataToYourPage(data)
  }
  executeQuery(query, variables = {}, operationName = ""){
    // ...
  }
});
```

