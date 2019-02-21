
const allItemQuery = `
    query{
      allItems{
        id
        name
        number
      }
    }`
const updateItemQuery = `
  subscription{
    updateItem {
      id
      number
    }
  }
`
const showPanel = document.getElementById('show_panel')

// ---- connect to action cable ----
const cable = ActionCable.createConsumer('wss://cashier-ql-5rb.herokuapp.com/cable')
cable.subscriptions.create('CashierStreamChannel', {
  connected() {
    console.log('CashierStream channel connected..')
    this.executeQuery(allItemQuery)
    this.executeQuery(updateItemQuery)
  },
  disconnected() {
    console.log('CashierStream channel disconnected..')
  },
  received(data) {
    const result = data.result
    console.log("get result",result)
    if(result.data == null){
      return
    }else if(result.data.hasOwnProperty("allItems")){
      renderItems(result.data.allItems)
    }else if(result.data.hasOwnProperty("updateItem")){
      updateItem(result.data.updateItem)
    }
  },
  // use  cable.executeQuery(yourGraphqlQuery) to send query by action cable
  executeQuery(query, variables = {}, operationName = ""){
    const channelParams = {
      query: query,
      // variables: variables,
      // operationName: operationName,
    }
    this.perform('execute', channelParams)
  }
});


// ---- callback to render items in index.html ----
function renderItems(items){
  console.log("renderItems", items)
  items.sort((a,b)=> a.id - b.id)
  items.forEach((item)=>{
    // showPanel.appendChild(`<li>${item.name}: <span id="show-item-${item.id}" >${item.number}</span></li>`)
    showPanel.innerHTML += `<li>${item.name}: <span id="show-item-${item.id}" >${item.number}</span></li>`
  })
}
function updateItem(item){
  console.log("updateItems", item)
  // update item number
  const id = item.id
  const number = item.number
  const itemSpan = document.getElementById(`show-item-${id}`)
  if(itemSpan == null){
    return
  }
  itemSpan.innerText = number
}
