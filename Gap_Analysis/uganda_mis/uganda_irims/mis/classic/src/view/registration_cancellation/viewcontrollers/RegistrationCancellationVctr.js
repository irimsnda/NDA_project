
Ext.define('Admin.view.registration_cancellation.viewcontrollers.RegistrationCancellationVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.registrationcancellationVctr',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
    setReportGlobalStoreWithTBar: function (obj, options) {
        this.fireEvent('setReportGlobalStoreWithTBar', obj, options);
    },
    showAddRequestWinFrm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    }, 

    showCancelledApplicationDetails: function (item) {//for tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            grid = Ext.widget(item.childXtype);
        grid.down('hiddenfield[name=can_id]').setValue(record.get('id'));
        grid.down('displayfield[name=reference_no]').setValue(record.get('reference_no'));
        grid.down('displayfield[name=tracking_no]').setValue(record.get('tracking_no'));
        grid.down('displayfield[name=module_name]').setValue(record.get('module_name'));
        funcShowCustomizableWindow(item.winTitle, item.winWidth, grid, 'customizablewindow');
    },
    doSaveCancellationRequest: function (btn) {
        var me = this,
            form = btn.up('form'),
            store = Ext.getStore(btn.storeID),
            frm = form.getForm(),
            win = form.up('window');
        Ext.MessageBox.confirm('Confirm', 'This will cancel the registration application request and the application will not be visible for processing, Continue?', function (btn) {
            if (btn === 'yes') {
                if (frm.isValid()) {
                    frm.submit({
                        url: 'workflow/saveRegistrationCancellationRequest',
                        waitMsg: 'Please wait...',
                        success: function (fm, action) {
                            var response = Ext.decode(action.response.responseText),
                                success = response.success,
                                message = response.message;
                            if (success == true || success === true) {
                                store.removeAll();
                                store.load();
                                win.close();
                                toastr.success(message, "Success Response");
                            } else {
                                toastr.error(message, 'Failure Response');
                            }
                        },
                        failure: function (form, action) {
                            var resp = action.result;
                            toastr.error(resp.message, 'Failure Response');
                        }
                    });
                }
            }else{
                toastr.warning("Operation Terminated", 'Response');
            }
        });
    },

    doCreateCancellationDetailsGrid: function (grid) {
      var grid = grid,
      store = grid.getStore();
        store.removeAll();
       var flag = 1;
        store.load({
                callback: function(records, operation, success) {
                  var cols = [];
                  grid.reconfigure(cols);
                  if(store.data.length > 0){
                   store.each(function(record,idx){

                    var i;

                    if(flag){
                      var keys = Object.keys(record.data),
                          length = keys.length-1;
                        for (i = 0; i <= length ; i++) {
                            if (keys[i] == 'id') {
                              var column = Ext.create('Ext.grid.column.Column', {
                                      text: keys[i],
                                      dataIndex: keys[i]+'',
                                      width: 150,
                                      hidden: true,
                                      tblCls: 'wrap',
                                  });
                            }else{
                              var column = Ext.create('Ext.grid.column.Column', {
                                      text: keys[i],
                                      dataIndex: keys[i]+'',
                                      width: 150,
                                      tblCls: 'wrap',
                                  });
                            }
                            
                            

                                grid.headerCt.insert(column);
                            }
                          
                        flag = 0;
                 
                 }
                   
                }); 
          //grid.reconfigure(grid.getStore(), grid.columnsCfg);
          grid.getView().refresh();
      }
    }});
  },
  doRevertCancellation: function(item){
       var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            store = grid.getStore(),
            can_id = record.get('id');
       Ext.MessageBox.confirm('Confirm', 'This will revert back the cancellation of the registration request and application will now be visible for processing, Continue?', function (btn) {
            if (btn === 'yes') {
                mask = new Ext.LoadMask({
                        msg: 'Please wait...',
                        target: grid
                    });
                mask.show();
                Ext.Ajax.request({
                    url: 'workflow/RevertRegistrationCancellation',
                    params: {
                        can_id: can_id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success == true || success === true) {
                            store.removeAll();
                            store.load();
                            toastr.success(message, 'Success Response');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mask.hide();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }else{
                toastr.warning("Operation Terminated", 'Response');
            }
        });
  }
});