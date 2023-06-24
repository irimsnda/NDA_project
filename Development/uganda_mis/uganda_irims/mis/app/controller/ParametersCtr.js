/**
 * Created by Kip on 8/22/2018.
 */
Ext.define('Admin.controller.ParametersCtr', {
    extend: 'Ext.app.Controller',

    config: {

        refs: [{
            ref: 'list',
            selector: 'grid'
        }],

        control: {
            /* 'useredit button[action=save]': {
                 click: 'updateUser'
             }*/
        }
    },

    stores: [
        'Admin.store.parameters.System_controllersStr',
        'Admin.store.parameters.System_modulesStr',
        'Admin.store.parameters.locations.CountriesStr',
        'Admin.store.parameters.locations.RegionsStr',
        'Admin.store.parameters.locations.DistrictsStr',
        'Admin.store.parameters.costs.CostCenterStr',
        'Admin.store.parameters.costs.CostCategoriesStr',
        'Admin.store.parameters.costs.CostSubCategoriesStr',
        'Admin.store.parameters.CurrenciesStr',
        'Admin.store.parameters.ExchangeRatesStr',
        'Admin.store.parameters.FeeTypesStr',
        'Admin.store.parameters.TransactionTypesStr',
        'Admin.store.parameters.T_TypesStr',
        'Admin.store.parameters.OutputsStr',
        'Admin.store.parameters.PaymentIntervalsStr',
        'Admin.store.parameters.locations.CitiesStr',
        'Admin.store.parameters.premiseregistration.BusinessScalesStr',
        'Admin.store.parameters.premiseregistration.SectionsStr',
        'Admin.store.parameters.premiseregistration.BusinessTypesStr',
        'Admin.store.parameters.premiseregistration.BusinessTypeDetailsStr',
        'Admin.store.parameters.premiseregistration.BusinessCategoriesStr',
        'Admin.store.parameters.premiseregistration.StudyFieldsStr',
        'Admin.store.parameters.premiseregistration.PersonnelQualificationsStr',
        'Admin.store.parameters.organization.DirectoratesStr',
        'Admin.store.parameters.PaymentModesStr',
        'Admin.store.parameters.ReceiptTypeStr',
        'Admin.store.parameters.BanksStr',
        'Admin.store.parameters.ApprovalDecisionsStr',
        'Admin.store.parameters.ParamsComboAbstractStore',
        'Admin.store.parameters.premiseregistration.PersonnelPositionsStr',
        'Admin.store.parameters.GmpApprovalDecisionsStr',
        'Admin.store.parameters.clinicaltrial.ImpProductCategoriesStr',
        'Admin.store.parameters.productregistration.CommonNamesStr',
        'Admin.store.parameters.productregistration.AdministrationRoutesStr',
        'Admin.store.parameters.clinicaltrial.ImpSourcesStr',
        'Admin.store.parameters.productregistration.MasterIngredientsStr',
        'Admin.store.parameters.productregistration.IngreSpecificationTypeStr',
        'Admin.store.parameters.productregistration.ImpProductInclusionReasonStr',
        'Admin.store.parameters.ClinicalApprovalDecisionsStr',
        'Admin.store.parameters.TcRecommendationDecisionsStr',
        'Admin.store.parameters.PackagingUnitsStr',
        'Admin.store.parameters.ElementsCostStr',
        'Admin.store.parameters.glAccountsStr',
        'Admin.store.parameters.RevenueTypeStr',
        'Admin.store.parameters.AgeAnalysisDaysSpanParamStr', 
        'Admin.store.parameters.ProcessDateSpanParamStr', 
        'Admin.store.parameters.AppProcessDefinationStr',
         'Admin.store.parameters.costs.CostTypesStr',
         'Admin.store.parameters.DeviceTypesStr',
         'Admin.store.parameters.ProductTypesStr',

    
        

    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },

    listen: {
        controller: {
            'parametervctr': {
                doSubmitData: 'doSubmitData'
            },
            '*': {
                setParamCombosStore: 'setParamCombosStore'
            }
        }
    },

    setParamCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.parameters.ParamsComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    doShowAddParamFrm: function (btn) {
        var me = this,
            formWidget = btn.form,
            titesStore = Ext.getStore('userTitlesStore'),
            grid = btn.up('grid'),
            main_panel = me.getMainPanel(),
            main_tabPanel = main_panel.down('#contentPanel'),
            activeTab = main_tabPanel.getActiveTab(),
            // grid=activeTab.down('usersGrid'),
            form = Ext.widget(formWidget);
        titesStore.removeAll();
        titesStore.load();
        grid.hide();
        activeTab.add(form);
    },

    doCreateParam: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            formWidget = btn.form,
            gridWidget = btn.grid,
            storeID = btn.store,
            store = btn.grid_store,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                headers: {
                    'Authorization':'Bearer '+access_token
                },
                waitMsg: 'Saving Parameter Details...',
                success: function (form, action) {
                    store.removeAll();
                    store.load();
                    me.backToGrid(formWidget, gridWidget);
                    var response = Ext.decode(action.response.responseText),
                        message = response.message;
                    toastr.success(message, "Congratulations!!");
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.msg);
                }
            });
        }
    },
     doDeleteConfigWidgetParam: function (item) {
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

    backToGrid: function (currentForm, grid) {
        //change this to accomodate the window widget
        var me = this,
            main_panel = me.getMainPanel(),
            main_tabPanel = main_panel.down('#contentPanel'),
            activeTab = me.up('panel'),
            //activeTab = main_tabPanel.getActiveTab(),
            grid = activeTab.down(grid),
            form = activeTab.down(currentForm);
        activeTab.remove(form);
        grid.show();
    },

    backToList: function (btn) {
        var me = this,
            main_panel = me.getMainPanel(),
            main_tabPanel = main_panel.down('#contentPanel'),
            //activeTab = main_tabPanel.getActiveTab(),
            activeTab = me.up('panel'),
            gridWidget = btn.grid,
            grid = activeTab.down(gridWidget),
            formWidget = btn.form,
            form = activeTab.down(formWidget);
        activeTab.remove(form);
        grid.show();

    },
    funcshowParamswin: function (btn) {
        var store = Ext.getStore(btn.store),
            widget = btn.widget,
            title = btn.title;

        store.removeAll();
        store.load();
        var win = Ext.create('Ext.window.Window', {
            width: 800,
            height: 400,
            title: title,
            controller: 'params_vcr',
            modal: true,
            items: [{
                xtype: 'panel',
                layout: 'fit', height: 340,
                items: [{
                    xtype: widget,
                    height: 340,
                    autoScroll: true,
                    listeners: {
                        itemdblclick: function () {

                        }
                    }
                }]
            }]
        });
        win.show();
    },

    doSubmitData: function (data, storeId, method, url, callback) {
        Ext.getBody().mask('Saving record...');
        // Ext.Ajax.on('beforerequest', function (conn, options) {
        //     Ext.Ajax.setDefaultHeaders({
        //         'Authorization': 'Bearer ' + access_token,
        //         'X-CSRF-Token': token
        //     });
        // });
        console.log('called');
        Ext.Ajax.request({
            url: url,
            method: method,
            params: JSON.stringify(data),
            headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
            success: function (conn, response, options, eOpts) {
                var result = Ext.JSON.decode(conn.responseText, true);
                var store = null;
                if (storeId != null) {
                    store = Ext.getStore(storeId);
                }

                if (!result) {
                    result = {};
                    result.success = false;
                    result.msg = "Failed to decode the message from the server";
                }

                if (result.success) {
                    toastr.success(result.message);
                    if (store != null) {
                        store.load();
                    }
                } 
                callback();
                Ext.getBody().unmask();
            },
            failure: function (conn, response, options, eOpts) {
                Ext.getBody().unmask();
                toastr.error(conn.responseText);
            }
        });
    },

    

});