export enum WalletModalType {
  APPROVE_WEMIX$ = 'approveWemix$',
  APPROVE_TRANSFER = 'approveTransfer',
  WAITING_APPROVE_WEMIX$ = 'waitingApproveWemix$',
  WAITING_APPROVE_TRANSFER = 'waitingApproveTransfer',
  PAYMENT = 'payment',
  SIGN_WEMIX_WALLET = 'signWemixWallet',
  SIGN_METAMASK = 'signMetamask',
}

export enum PaymentModalType {
  PLACE_BID = 'placeBid',
  RETRACTING_BID = 'retractingBid',
  COMPLETE_CHECKOUT = 'completeCheckOut',
  CHANGE_OPEN_OFFER = 'changeOpenOffer',
  ACCEPT_OFFER = 'acceptOffer',
  BUY_NOW = 'buyNow',
  GET_BID_BACK = 'getBidBack',
}