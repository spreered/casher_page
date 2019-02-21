// ActionCable = require('node_modules/actioncable')
// function createActionCableHandler(cable, opera)
class CashierCable{
  constructor(cable){
    this.cable = cable
  }
  createChannel(channelName,initQuery, subscribeQuery){
    this.cable.subscriptions.create(channelName, {
      connected(){
        console.log('CashierStream channel connected..')
        this.executeQeury(initQuery)
        this.executeQeury(subscribeQuery)
      },
      disconnected() {
        console.log('CashierStream channel disconnected..')
      },
      received(data) {
        const result = data.result
        console.log("get result",result)
        // if(result.data){
        //   // update item number
        //   const id = result.data.updateItem.id
        //   const number = result.data.updateItem.number
        //   const $numberSpan = $(`#show-item-${id}`)
        //   $numberSpan.text(number)
        // }
      },
      executeQeury(query, variable = {}, operationName = ""){
    
        const channelParams = {
          query: query,
          variables: variables,
          operationName: operationName,
        }
        // Called when the subscription is ready for use on the server
        // console.log('load notification action');
        this.perform('execute', channelParams)
      }
    })

  }
}

// var cable = ActionCable.createConsumer('ws://localhost:3000/cable')
 
// cable.subscriptions.create('CashierStreamChannel', {
//   connected() {
//     console.log('CashierStream channel connected..')
//     executeQeury
//   },
//   disconnected() {
//     // Called when the subscription has been terminated by the server
//     console.log('CashierStream channel disconnected..')
//   },
//   received(data) {
//     const result = data.result
//     console.log("get result",result)
//     // if(result.data){
//     //   // update item number
//     //   const id = result.data.updateItem.id
//     //   const number = result.data.updateItem.number
//     //   const $numberSpan = $(`#show-item-${id}`)
//     //   $numberSpan.text(number)
//     // }
//   },
//   executeQeury(query, variable = {}, operationName = ""){

//     const channelParams = {
//       query: query,
//       variables: variables,
//       operationName: operationName,
//     }
//     // Called when the subscription is ready for use on the server
//     // console.log('load notification action');
//     this.perform('execute', channelParams)
//   }
// });