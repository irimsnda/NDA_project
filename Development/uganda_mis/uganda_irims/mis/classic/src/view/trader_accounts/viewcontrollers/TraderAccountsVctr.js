Ext.define('Admin.view.trader_accounts.viewcontrollers.TraderAccountsVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.traderaccountsvctr',

    /**
     * Called when the view is created
     */
    init: function () {
        
        Ext.apply(Ext.form.field.VTypes, {
            semiColonList: function(value, field) {
                if(!this.semiColonListRe.test(value)){
                    field.setValue(value.slice(0, -1));
                }
                return true;
            },
 
           semiColonListRe: /[^,]+$/,
           semiColonListText: "Please use semicolon as a separator",
           semiColonListMask: /[^!\,\a]/,
        });

    }, //the function win add trader 
    funcWinTraderAccountRegistration: function (btn) {
        var form = btn.up('form'),
            win = form.up('window');
            me = this,
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
            Ext.getBody().mask('Please wait, Saving Trader Information...');
      
        if (frm.isValid()) {
            frm.submit({
                url: 'tradermanagement/saveTraderInformation',
                params: { 
                    _token:token
                },
                waitMsg: 'Saving Trader Information',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result;
                    toastr.success(resp.message, 'Response');
                    store.removeAll();
                    store.load();
                    Ext.getBody().unmask();
                    win.close();
                },
                failure: function (frm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                    store.load();
                    Ext.getBody().unmask();
                    win.close();
                }
            });
        }

    },showTraderRegistrationfrm: function (btn) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var me = this,
                formWidget = btn.form,
                grid = btn.up('grid'),
                parentPanel = grid.up('panel'),
                form = Ext.widget(formWidget),
                storeArray = eval(btn.stores),
                arrayLength = storeArray.length;
            if (arrayLength > 0) {
                me.fireEvent('refreshStores', storeArray);
            }
            grid.hide();
            parentPanel.add(form);
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },
    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    funcBackToDashboardPnl: function (btn) {
        var currentPnlXtype = btn.currentPnlXtype,
            currentPnl = btn.up(currentPnlXtype),
            containerPnlXtype = btn.containerPnlXtype,
            hiddenCompXtype = btn.hiddenCompXtype,
            containerPnl = btn.up(containerPnlXtype),
            grid = containerPnl.down(hiddenCompXtype);
            containerPnl.remove(currentPnl);
            grid.show();
    },
    funcTraderRegistration: function (btn) {
        var form = btn.up('form'),
            me = this,
            country_id = form.down('combo[name=country_id]').getValue(),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        
        if (frm.isValid()) {
            frm.submit({
                url: 'tradermanagement/saveTraderInformation',
                waitMsg: 'Updating Trader Information',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result;
                    toastr.success(resp.message, 'Failure Response');
                    store.removeAll();
                    store.load();
                },
                failure: function (frm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }

    },
    func_filtertradersdata: function (btn) {
        var grid = btn.up('grid'),
            store = grid.store,
            status_id = grid.down('combo[name=status_id]').getValue()
        store.removeAll();
        store.load({ params: { status_id: status_id} });
    },
    func_Resettradersdata: function (btn) {
        var grid = btn.up('grid'),
            store = grid.store;

        store.removeAll();
        store.load();
    },
    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },

    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
    
    showEditConfigParamGridFrm: function (item) {//for tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            formWidget = item.form,
            form = Ext.widget(formWidget),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.reset();
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        grid.hide();
        parentPanel.add(form);
    },


    showEditTraderAuthorisation: function (item) {//for tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            panelWidget = item.panelWidget,
            panelWidget = Ext.widget(panelWidget),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        panelWidget.down('displayfield[name=trader_name]').setValue(record.get('name'));
        panelWidget.down('displayfield[name=trader_no]').setValue(record.get('identification_no'));
        panelWidget.down('displayfield[name=trader_status]').setValue(record.get('account_status'));
        grid.hide();
        parentPanel.add(panelWidget);

    },
    showEditTraderProductsAuthorisation: function (item) {//for tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            panelWidget = item.panelWidget,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            panelWidget = Ext.widget(panelWidget),
            storeArray = eval(item.stores),

            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
      //  panelWidget.setheight(450);
        funcShowCustomizableWindow(winTitle, winWidth, panelWidget, 'customizablewindow');
        panelWidget.down('hiddenfield[name=traderidentification_no]').setValue(record.get('traderidentification_no'));
        panelWidget.down('hiddenfield[name=authorisedidentification_no]').setValue(record.get('authorisedidentification_no'));
    },
    funcgetTraderStatusesCounter: function (grid) {
        Ext.Ajax.on('beforerequest', function (conn, options) {
            Ext.Ajax.setDefaultHeaders({
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            });
        });
        Ext.Ajax.request({
            url: 'tradermanagement/getTraderStatusesCounter',
            success: function (response, options, eOpts) {
                var resp = Ext.decode(response.responseText),
                    results = resp.results;
                if (resp.success) {

                    grid.down('button[name=pending_approval]').setText(results.pending_approval + ': Pending Approval');
                    grid.down('button[name=registered_traders]').setText(results.registered_traders + ': Active Accounts');
                    grid.down('button[name=rejected_traders]').setText(results.rejected_traders + ': Rejected Accounts');
                    grid.down('button[name=dormant_account]').setText(results.dormant_account + ': Domant Account');
                }

            },
            failure: function (conn, response, options, eOpts) {
                toastr.error(conn.responseText);
            }
        });
    },
    funcDownloadTinCertificate:function(btn){
            var form = btn.up('form'), 
                country_id = form.down('combo[name=country_id]').getValue();
                portal_id = form.down('hiddenfield[name=portal_id]').getValue();
            
                if(country_id == 36){
                    Ext.Ajax.on('beforerequest', function (conn, options) {
                        Ext.Ajax.setDefaultHeaders({
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        });
                    });
                    Ext.Ajax.request({
                        url: 'tradermanagement/getDownloadTinCertificateUrl',
                        params:{
                            trader_id:portal_id
                        },
                        success: function (response, options, eOpts) {
                            var resp = Ext.decode(response.responseText);
                            if (resp.success) {
                                document_url = resp.document_url
                                
                                print_report(document_url);
                            }
                            else{
                                toastr.error(resp.message);
                            }
            
                        },
                        failure: function (conn, response, options, eOpts) {
                            toastr.error(conn.responseText);
                        }
                    });

                }
                else{

                    toastr.error('Tin Certificate is only upload to the Local Traders, confirm the country details.');
                }

    },
    funcPrintTraderInformation:function(btn){
            var btn_url = btn.report_url;
                form = btn.up('form'),
                portal_id = form.down('hiddenfield[name=portal_id]').getValue();
                
                print_report(btn_url+'?portal_id ='+portal_id);

    },
    funcPrintTraderInformationGrid:function(item){
        var me = this,
            btn = item.up('button'),
            btn_url = btn.btn_url,
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            portal_id = record.get('portal_id');

            print_report(btn_url+'?portal_id ='+portal_id);
    },
    funcViewTraderAccountUsers:function(btn){
        var form = btn.up('form'),
        trader_id = form.down('hiddenfield[name=id]').getValue();
        this.getViewTraderAccountUsers(btn,trader_id)
    },
    getViewTraderAccountUsers: function (btn,trader_id) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype);
          
             funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
             store = Ext.getStore('traderUsersAccountsManagementStr');
             child.down('hiddenfield[name=trader_id]').setValue(trader_id);
             store.removeAll();
             store.load({params:{trader_id:trader_id}});
    },
    funcAuthorisedtradersdetails: function (btn,portal_id) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            trader_no = containerPnl.down('displayfield[name=trader_no]').getValue();

            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
            child.down('hiddenfield[name=traderidentification_no]').setValue(trader_no);

    },

    
    funcTraderAccountApproval:function(item){
            var btn = item.up('button'),
                status_id = item.status_id,
                childXtype = item.childXtype,

                child = Ext.widget(childXtype),
                winTitle = item.winTitle,
                winWidth = item.winWidth,
                record = btn.getWidgetRecord(),
                identification_no = record.get('identification_no');
                funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
                 
                child.down('hiddenfield[name=identification_no]').setValue(identification_no);
                child.down('combo[name=status_id]').setValue(status_id);
                
    },

    
    funcSearchTraderDetails:function(btn){
        var childXtype = btn.childXtype,
            child = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            child.setHeight(450);
            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow'); 
    },
    
    funcUpdateAccountStatus:function(btn){
        var form = btn.up('form'),
        win = form.up('window'),
            me = this,
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        
        if (frm.isValid()) {
            frm.submit({
                url: 'tradermanagement/updateAccountApprovalStatus',
                waitMsg: 'Updating Trader Information',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result;
                    toastr.success(resp.message, 'Response');
                    store.removeAll();
                    store.load();
                    win.close();
                },
                failure: function (frm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }

    },funcSaveTraderAccountUsers:function(btn){
        var form = btn.up('form'),
        win = form.up('window'),
            me = this,
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            store = Ext.getStore(storeID),
            frm = form.getForm();
        
        if (frm.isValid()) {
            frm.submit({
                url: 'tradermanagement/saveTraderAccountUsers',
                waitMsg: 'Save Trader User Information',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {

                    var resp = action.result;
                    toastr.success(resp.message,'Response');
                    store.removeAll();
                    store.load();
                    win.close();

                },
                failure: function (frm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }

    },
    funcSaveAuthorisedtradersdetails:function(btn){
        var form = btn.up('form'),
        win = form.up('window'),
            me = this,
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        
        if (frm.isValid()) {
            frm.submit({
                url: 'tradermanagement/saveAuthorisedtradersdetails',
                waitMsg: 'Save Authorisation Details',
               headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result;
                    toastr.success(resp.message, 'Response');
                    store.removeAll();
                    store.load();
                    win.close();
                },
                failure: function (frm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }

    }, 



    funcUnlinkeProductAuthorisation:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            store = grid.getStore(),
            authorisation_id  = rec.get('authorisation_id'),
            reg_product_id  = rec.get('authreg_product_id');
            mask = new Ext.LoadMask(
                {
                    target: grid,
                    msg: 'Please wait...'
                }
            );
      
            mask.show();
            Ext.Ajax.request({
                url: 'tradermanagement/updateTraderProductAuthorisation',
                params: {
                    authorisation_id: authorisation_id,
                    reg_product_id: reg_product_id
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
                    if (success || success == true || success === true) {
                        toastr.success(message, 'Success Response!!');
                        store.load();
                        
                    } else {
                        toastr.error(message, 'Failure Response!!');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message;
                    toastr.warning(message, 'Failure Response!!');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });

        
    },
    funcAllowProductAuthorisation:function(btn){
                var grid = btn.up('grid'),
                    store = grid.store;
                    var traderidentification_no = grid.down('hidden[name=traderidentification_no]').getValue(),
                    authorisedidentification_no = grid.down('hidden[name=authorisedidentification_no]').getValue(),
                    params = [];
                    var grid = btn.up('grid'),
                 
                    sm = grid.getSelectionModel(),
                    selected_records = sm.getSelection(),
                    selected = [],
                    mask = new Ext.LoadMask(
                        {
                            target: grid,
                            msg: 'Please wait...'
                        }
                    );
              
                Ext.each(selected_records, function (item) {
                    var reg_product_id = item.data.authreg_product_id,
                        authorisation_id = item.data.authorisation_id,
                       
                        obj = {
                            reg_product_id: reg_product_id,
                            authorisation_id: authorisation_id
                        };
                    selected.push(obj);
                    //selected.push(item.data.id);
                });
                mask.show();
                Ext.Ajax.request({
                    url: 'tradermanagement/saveTraderProductAuthorisation',
                    params: {
                        selected: JSON.stringify(selected),
                        traderidentification_no: traderidentification_no,
                        authorisedidentification_no:authorisedidentification_no
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
                        if (success || success == true || success === true) {
                            toastr.success(message, 'Success Response!!');
                            store.load();
                            
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        mask.hide();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mask.hide();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });


    },

       showAddTraderSyncAppWinFrm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            grid=btn.up('grid'),
            trader_id=grid.down('hiddenfield[name=trader_id]').getValue(),
            trader_field=child.down('hiddenfield[name=trader_id]'),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
            trader_field.setValue(trader_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },
     doCreateTraderSyncAppWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form_xtype = btn.up('form'),
            registration_no = form_xtype.down('textfield[name = registration_no]').getValue(),
            reference_no = form_xtype.down('textfield[name = reference_no]').getValue(),
            win = form_xtype.up('window'),
            storeID = btn.storeID,
            requeststoreID=btn.requeststoreID,
            store = Ext.getStore(storeID),
            store2 =Ext.getStore(requeststoreID);

        var frm = form_xtype.getForm();
        if(registration_no || reference_no ){
           
            if (frm.isValid()) {
                frm.submit({
                    url: url,
                    params: {model: table},
                    waitMsg: 'Please wait...',
                    submitEmptyText: false,
                     
                    success: function (form, action) {
                        var response = Ext.decode(action.response.responseText),
                            success = response.success,
                            message = response.message;
                        if (success == true || success === true) {
                            toastr.success(message, "Success Response");
                            store.removeAll();
                            store.load();
                            win.close();
                          if(store2){//reload grid store
                               store2.reload();
                          }
                               
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
            toastr.warning("Please provide either the reference or registration number of the application(s)", 'Missing Values');
        }
    },
    doDeleteTraderAppSyncWidgetParam: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
        /*  } else {
              toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
              return false;
          }*/
    },

    showMergeGridFrm: function (item) {//for tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            cgrid = btn.up('grid'),
            parentPanel = cgrid.up('panel'),
            record = btn.getWidgetRecord(),
            trader_id=record.get('id'),
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            gridWidget = item.childXtype,
            grid = Ext.widget(gridWidget),
            trader_field =grid.down('hiddenfield[name=trader_id]');
            trader_field.setValue(trader_id);

         funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
    },

    mergeTraderApplication: function(item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            grid=item.up('grid'),
            main_grid = Ext.ComponentQuery.query("#traderappsyncrequestgridID")[0],
            main_store = main_grid.getStore(),
            store=grid.getStore(),
            id = record.get('main_id'),
            reference_no = record.get('reference_no'),
            registration_no = record.get('registration_no'),
            trader_id=grid.down('hiddenfield[name = trader_id]').getValue(),
            form=Ext.create('Ext.form.Panel', {}),
            frm=form.getForm();

             if (frm.isValid()) {
                        frm.submit({
                            url: 'tradermanagement/mergeTraderSyncApplications',
                            method: 'POST',
                            params: {
                                'action': item.action,
                                'record_id':id,
                                'registration_no':registration_no,
                                'reference_no':reference_no,
                                'trader_id':trader_id,
                                _token: token
                            },
                            headers: {
                                'Authorization': 'Bearer ' + access_token,
                                'X-CSRF-Token': token
                            },
                            waitMsg: 'Please wait...',
                             
                            success: function (form, action) {
                                var response = Ext.decode(action.response.responseText),
                                    success = response.success,
                                    message = response.message;
                                if (success == true || success === true) {
                                    toastr.success(message, "Success Response");
                                    main_store.removeAll();
                                    store.removeAll();
                                    main_store.load();
                                    store.load();
                                } else {
                                    toastr.error(message, 'Failure Response');
                                    main_store.removeAll();
                                    store.removeAll();
                                    main_store.load();
                                    store.load();
                                }
                            },
                            failure: function (form, action) {
                                var resp = action.result;
                                toastr.error(resp.message, 'Failure Response');
                                main_store.removeAll();
                                store.removeAll();
                                main_store.load();
                                store.load();
                            }
                        });
                    }
    },
    loadTraderApplicationsStores: function(grid) {
        var store = grid.getStore(),
            trader_id = grid.down('hiddenfield[name=trader_id]').getValue();

            store.load({params:{trader_id:trader_id}});
    },
    funcViewCommonGridWindow: function(btn){

        var grid = Ext.widget(btn.grid),
            trader_field = grid.down('hiddenfield[name=trader_id]'),
            rec_grid = btn.up('button'),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            record = rec_grid.getWidgetRecord();

            trader_field.setValue(record.get('id'));

         funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
    },
    funcEditAccountUserdetails:function(item) {
        
            var me = this,
                btn = item.up('button'),
                record = btn.getWidgetRecord(),
                childXtype = item.childXtype,
                winTitle=item.winTitle,
                winWidth=item.winWidth,
                form = Ext.widget(childXtype),
                storeArray = eval(item.stores),
                arrayLength = storeArray.length;

            if (arrayLength > 0) {
                me.fireEvent('refreshStores', storeArray);
            }
            form.loadRecord(record);
            funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');


    },funcAddAccountUserdetails: function (btn) {

        var me = this,
            childXtype = btn.childXtype,
            grid = btn.up('grid'),
            trader_id = grid.down('hiddenfield[name=trader_id]').getValue(),
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;

            child.down('hiddenfield[name=trader_id]').setValue(trader_id);

        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        
    },

    func_closeFormWin: function(btn) {
        var form = btn.up('form')
            win = form.up('window');

        form.close();
        win.close();
    },
    setUserCombosStore: function (obj, options) {
        this.fireEvent('setUserCombosStore', obj, options);
    },
    funcSendTraderEmailNotification: function(btn) {
         var form = btn.up('form'),
             store = Ext.getStore(btn.store)
             win = form.up('window');
         if (form.isValid()) {
                        form.submit({
                            url: btn.url,
                            method: 'POST',
                            waitMsg: 'Please wait...',
                            submitEmptyText: false,
                            headers: {
                                'Authorization': 'Bearer ' + access_token,
                                'X-CSRF-Token': token
                            },
                            success: function (form, action) {
                                var response = Ext.decode(action.response.responseText),
                                    success = response.success,
                                    message = response.message;
                                if (success == true || success === true) {
                                    toastr.success(message, "Success Response");
                                    store.removeAll();
                                    store.load();
                                    win.close();
                                } else {
                                    toastr.error(message, 'Failure Response');
                                }
                                win.close();
                            },
                            failure: function (form, action) {
                                var resp = action.result;
                                toastr.error(resp.message, 'Failure Response');
                            }
                        });
                  }

           },

    func_deleteMail:function(btn) {
        var record = btn.getWidgetRecord(),
            store = btn.up('grid').getStore(),
            id = record.get('id');

        Ext.getBody().mask('Deleting mail...');

        Ext.Ajax.request({
                url: 'tradermanagement/DeleteTraderNotificationMail',
                params: {
                    id: id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (response) {
                   Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        success = resp.success,
                        message = resp.message;
                    if (success || success == true || success === true) {
                        toastr.success(message, 'Success Response!!');
                        store.load();
                        
                    } else {
                        toastr.error(message, 'Failure Response!!');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message;
                    toastr.warning(message, 'Failure Response!!');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });

        
    },

     func_loadSyncContactForm:function(btn){
        var childXtype = btn.childXtype,
            child = Ext.widget(childXtype),
            item = btn.up('button'),
            record = item.getWidgetRecord(),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            child.down('hiddenfield[name=status_id]').setValue(record.get('status_id'));
            child.down('hiddenfield[name=reference_no]').setValue(record.get('reference_no'));
            child.down('hiddenfield[name=registration_no]').setValue(record.get('registration_no'));
            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow'); 
    },

    funcShowCommonWindow:function(btn){
        var childXtype = btn.childXtype,
            child = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth;
            funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow'); 
    },

    submitSelectedSyncRequest: function(btn) {
         var grid = btn.up('grid'),
             records = grid.getSelectionModel().getSelected(),
             trader_id = grid.down('hiddenfield[name = trader_id]').getValue(),
             store = grid.getStore(),
             main_grid = Ext.ComponentQuery.query("#traderappsyncrequestgridID")[0],
             main_store = main_grid.getStore();

        applications = [];
       // Ext.getBody().mask('Merging the Applications...');
        for (var i = 0; i < records.items.length; i++) {
            var record = records.items [i],
                obj = {
                    id: record.get('main_id'),
                    trader_id: trader_id,
                    reference_no: record.get('reference_no'),
                    registration_no: record.get('registration_no')
                };
            
                applications.push(obj);
        
        }
        applications = JSON.stringify(applications);
        var form=Ext.create('Ext.form.Panel', {}),
            frm=form.getForm();

         if (frm.isValid()) {
                frm.submit({
                    url: 'tradermanagement/mergeTraderSelectedSyncApplications',
                    params: {
                        applications: applications
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    waitMsg: 'Merging the Applications...',
                    success: function (response) {
                      // Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            toastr.success(message, 'Success Response!!');
                            main_store.removeAll();
                            store.removeAll();
                            main_store.load();
                            store.load();
                            
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    success: function (form, action) {
                        var response = Ext.decode(action.response.responseText),
                            success = response.success,
                            message = response.message;
                        if (success == true || success === true) {
                            toastr.success(message, "Success Response");
                            main_store.removeAll();
                            store.removeAll();
                            main_store.load();
                            store.load();
                        } else {
                            toastr.error(message, 'Failure Response');
                            main_store.removeAll();
                            store.removeAll();
                            main_store.load();
                            store.load();
                        }
                    },
                    failure: function (form, action) {
                        var resp = action.result;
                        toastr.error(resp.message, 'Failure Response');
                        main_store.removeAll();
                        store.removeAll();
                        main_store.load();
                        store.load();
                    }
                });
            }

    },  
});         