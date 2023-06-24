
Ext.define('Admin.view.trader_accounts.views.forms.TraderAccountsManagementFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'traderAccountsManagementFrm',
    autoScroll: true,
    controller: 'traderaccountsvctr',
    //layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        labelAlign: 'top',
        margin: 5,
        xtype: 'textfield',
        allowBlank: false,
        columnWidth: 0.33,
    },
    layout: {
        type: 'table',
        columns: 3
    },
    layout: 'column',
    items: [{
        fieldLabel: 'Trader Name',
        emptyText: 'Enter Trader Name',

        name: 'name'
    }, {
        fieldLabel: 'Contact Person',
        emptyText: 'Enter Contact Person',
        name: 'contact_person'
    }, {
        fieldLabel: 'Tin NO',
        maxlength: 9,
        name: 'tin_no'
    }, {
        fieldLabel: 'Country',
        name: 'country_id',
        xtype: 'combo',
        queryMode: 'local',
        filter_component: 'region_id',
        filter_params: 'country_id',
        forceSelection: true,
        store: {
            type: 'countriesstr',
            pageSize: 0,
            autoLoad: true
        },
        displayField: 'name',
        valueField: 'id',
    }, {
        fieldLabel: 'Region',
        name: 'region_id',
        xtype: 'combo',
        forceSelection: true,
        width: '90%', queryMode: 'local',
        filter_component: 'district_id',
        filter_params: 'region_id',
        store: {
            type: 'regionsstr',
            pageSize: 0,
            autoLoad: true
        },
        displayField: 'name',
        valueField: 'id',
    }, {
        fieldLabel: 'District',
        name: 'district_id',
        xtype: 'combo',
        width: '90%', queryMode: 'local',
        forceSelection: true,
        store: {
            type: 'districtsstr',
            pageSize: 0,
            autoLoad: true
        },
        displayField: 'name',
        valueField: 'id',
    }, {
        fieldLabel: 'Email Address',
        name: 'email',
        vtype: 'email'
    }, {
        fieldLabel: 'Postal Address',
        name: 'postal_address'

    }, {
        fieldLabel: 'Telephone NO',
        name: 'telephone_no'

    }, {
        fieldLabel: 'Mobile NO',
        name: 'mobile_no',
        xtype: 'numberfield',
        labelAlign: 'top',
        width: '70%'
    }, {
        fieldLabel: 'Trader Categories(Description)',
        name: 'trader_category_id',
        xtype: 'combo',
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'TraderCategories'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        fieldLabel: 'Account Status',
        name: 'status_id',
        xtype: 'combo',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'AccountStatuses'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        fieldLabel: 'Physical Address',
        name: 'physical_address',
        xtype: 'textarea'
    },{

        xtype: 'hiddenfield',
        name: 'id'
    },{

        xtype: 'hiddenfield',
        name: 'identification_no'
    },{

        xtype: 'hiddenfield',
        name: 'portal_id'
    }],
    buttons: [{
        text: 'Trader Dashboard',
        iconCls: 'x-fa fa-backward',
        action: 'back',
        currentPnlXtype: 'traderAccountsManagementFrm',
        containerPnlXtype: 'traderAccountsManagementPnl',
        hiddenCompXtype: 'traderAccountsManagementGrid',
        containerType: 'traderAccountsManagementPnl',
        ui: 'soft-purple',
        handler: 'funcBackToDashboardPnl'
    }, '->', {
        text: 'Update Trader Information',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        currentPnlXtype: 'traderAccountsManagementFrm',
        containerPnlXtype: 'traderAccountsManagementPnl',
        hiddenCompXtype: 'traderAccountsManagementGrid',
        containerType: 'traderAccountsManagementPnl',
        storeID: 'traderAccountsManagementStr',
        handler: 'funcTraderRegistration'
    }, {
        text: 'Download TIN Certificate',
        iconCls: 'x-fa fa-print',
        ui: 'soft-purple',
        handler: 'funcDownloadTinCertificate'
    }, {
        text: 'Print Trader Information',
        iconCls: 'x-fa fa-print',
        ui: 'soft-purple',handler: 'funcPrintTraderInformation',
        report_url: 'tradermanagement/printtraderAccountsManagementDetails',
    },{
        text: 'Trader Account Users',
        iconCls: 'x-fa fa-user',
        ui: 'soft-purple',
        childXtype: 'traderAccountsUsersGrid',
        winTitle: 'Trader Account Users',
        winWidth: '60%',
        handler: 'funcViewTraderAccountUsers'
    }]

});