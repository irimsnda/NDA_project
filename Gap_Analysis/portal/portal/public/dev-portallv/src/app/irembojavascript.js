exports.iremboMakePayment=function(publicKey,invoiceNumber,spinner) {

  IremboPay.initiate({
      publicKey:  publicKey,
      invoiceNumber: invoiceNumber,
      locale: IremboPay.locale.EN,
      isTest: true, //set this value for production
      callback:(err, resp) => {
        spinner.hide();
          if (!err){
                IremboPay.closeModal();
                spinner.hide();
          }else{
               // Perform actions on error
              var code = err.code,
                  message = err.message;
                  spinner.hide();

          }
      }
  });
}