/**
 * Created by Kip on 10/29/2017.
 */
Ext.define('Admin.controller.AdministrationCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        'Admin.store.administration.AdministrationGridAbstractStore',
        'Admin.store.administration.AdministrationComboAbstractStore',
        'Admin.store.administration.NavigationStr',
        'Admin.store.administration.SystemMenusStr',
        'Admin.store.administration.SystemAccessLevelsStr',
        'Admin.store.administration.MenuLevelsStr',
        'Admin.store.administration.ParentMenusStr',
        'Admin.store.administration.ChildMenusStr',
        'Admin.store.administration.UserGroupsStr',
        'Admin.store.administration.SystemRolesTreeStr',
        'Admin.store.administration.MenuProcessesRolesStr',
        'Admin.store.administration.MenuProcessesAccessLevelsStr',
        'Admin.store.administration.SystemMenusStr2'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }, {
            ref: 'authorisedtradersdetailsfrm',
            selector: 'authorisedtradersdetailsfrm'
        }
    
    
        ],
        control: {
            'systemmenusfrm combo[name=level]': {
                //change: 'updateUser'
            },'authorisedtradersdetailsgrid': {
                refresh: 'refreshAuthorisedtradersdetailsgrid'
            },'searchtraderdetailsgrid': {
                itemdblclick: 'itemDblClicSearchtraderdetailsgrid'
            },'productauthorisationgrid': {
                refresh: 'refreshproductauthorisationgrid'
            }
        }
    },

    init: function () {

    },
    listen: {
        controller: {
            '*': {
                setAdminGridsStore: 'setAdminGridsStore',
                setAdminCombosStore: 'setAdminCombosStore'
            }
        }
    },
    itemDblClicSearchtraderdetailsgrid:function(view, record){
                var name = record.get('applicant_name'),
                    trader_no = record.get('identification_no'),
                    form_panel = this.getAuthorisedtradersdetailsfrm();
                    win = view.up('window');

                    win.close();
                    form_panel.down('textfield[name=authorised_trader]').setValue(name)
                    form_panel.down('hiddenfield[name=authorisedidentification_no]').setValue(trader_no);

    },
    refreshAuthorisedtradersdetailsgrid: function (me) {

        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            trader_no = activeTab.down('displayfield[name=trader_no]').getValue();

            store.getProxy().extraParams = {
                  trader_no: trader_no
            };

    },
    refreshproductauthorisationgrid: function (me) {

        var store = me.store,
            grid = me.up('grid'),
            
            traderidentification_no = grid.down('hiddenfield[name=traderidentification_no]').getValue();
            authorisedidentification_no = grid.down('hiddenfield[name=authorisedidentification_no]').getValue();

            store.getProxy().extraParams = {
                traderidentification_no: traderidentification_no,
                authorisedidentification_no: authorisedidentification_no
            };

    },
    setAdminGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.administration.AdministrationGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setAdminCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.administration.AdministrationComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    }

});