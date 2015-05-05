# Assignment: Create a transactions widget

## Setup:

* Install [Node.JS](http://nodejs.org/)
* In this directory, run `npm install`
* Start the server: `node server`
* Visit [http://localhost:9999](http://localhost:9999)

## Constraints

* Only change files in the `./widgets/transactions` directory

## Scenario

The [index page](http://localhost:9999) shows a mock portal with several widgets. You must implement the transactions widget, which is included as an iframe,  to display a list of the user's transactions. These can be retrieved from a REST API

## Requirements

1. For each transaction, display the following information: 
  * Counterparty Name
  * Transaction Type
  * Amount (formatted as a currency)
  * Formatted date

2. Each transaction should also render a 'dispute' button. 
  * When the user clicks this button, it will send a dispute request to the server and then disable the button in the UI (does not need ot persist across page loads). 
  * The message received in the response should be displayed to the user

3. Add a client side filter tool, to filter the transations by 'Counterparty Name'

4. Add an option to sort the transactions by amount. This should depend on requesting the transactions pre-sorted from the server.

#Rest APIs

## List transactions

`GET /api/transactions`

Returns an array of transaction objects

### Sorting

Add a `sort` query string parameter to sort the response by that field. E.g.

`/api/transactions?sort=<field-name>`

## Dispute transactions

`POST /api/transactions/<transaction-id>/dispute`

Creates a new dispute request for the transaction with the given transaction ID
