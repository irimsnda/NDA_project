
Ext.define('Admin.view.trader_accounts.views.forms.TraderAccountsInfoFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'traderaccountsinfofrm',
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
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            xtype: 'numberfield',
            maxlength: 3,
            labelAlign: 'top',
            allowBlank: false,
            width: '30%'
        },
        items: [{
            fieldLabel: 'Tin No',
            name: 'tin_no1'
        }, {
            fieldLabel: ':#',
            name: 'tin_no2'
        }, {
            fieldLabel: ':#',
            maxlength: 3,
            name: 'tin_no3'
        }]
    }, {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
        },
        items: [{
            fieldLabel: 'Country',
            name: 'country_id',
            xtype: 'combo',
            itemId:'filter_cbo',
            queryMode: 'local',
            filter_component:'region_id',
            filter_params: 'country_id',
            forceSelection: true,
            store: {
                type: 'countriesstr',
                pageSize: 0,
                autoLoad:true
            },
            displayField: 'name',
            valueField: 'id',
            width: '90%'
        }, {
            xtype: 'button',
            iconCls: 'fa fa-plus',
            margin: '30 0 0',
            handler: ''
        }]
    }, {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
        },
        items: [{
            fieldLabel: 'Region',
            name: 'region_id',
            xtype: 'combo',
            forceSelection: true,
            width: '90%', queryMode: 'local',
            itemId:'filter_cbo',
            filter_component:'district_id',
            filter_params: 'region_id',
            store: {
                type: 'regionsstr',
                pageSize: 0,
                autoLoad:true
            },
            displayField: 'name',
            valueField: 'id',
        }, {
            xtype: 'button',
            iconCls: 'fa fa-plus',
            margin: '0 10 0', margin: '30 0 0',
            handler: ''
        }]
    }, {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            labelAlign: 'top',
            allowBlank: false
        },
        items: [{
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
            xtype: 'button',
            iconCls: 'x-fa fa-plus', margin: '30 0 0',
            handler: ''
        }]
    }, {
        fieldLabel: 'Email Address',
        name: 'email_address',
        vtype:'email'
    }, {
        fieldLabel: 'Postal Address',
        name: 'postal_address'

    }, {
        fieldLabel: 'Telephone NO',
        name: 'telephone_no'

    }, {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            xtype: 'numberfield',
            labelAlign: 'top',            
            allowBlank: false,
        },
        items: [{
            fieldLabel: 'Code No',
            name: 'code_no',
            maxlength: 3,
            width: '30%'
        }, {
            fieldLabel: 'Mobile NO',
            name: 'mobile_no',
            width: '70%'
        }]
    }, {
        fieldLabel: 'Trader Role(Description)',
        name: 'trader_role_id',
        xtype: 'combo',
        store: '',
    }, {
        fieldLabel: 'Physical Address',
        name: 'physical_address'
    }, {
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            xtype: 'numberfield',
            labelAlign: 'top',
        },
        items: [{
            xtype: 'button',
            text: 'TIN Certificate',
            margin: '30 0 0',
            iconCls: 'x-fa fa-document',
            width: '25%',
            handler: function () {

            }
        }, {
            fieldLabel: 'Tin Certificate',
            xtype: 'filefield',
            width: '75%',
            name: 'tin_upload'
        },{
            xtype: 'hiddenfield',
            name:'tin_certificate'
        }]
    }],
    buttons: [{
        text: 'Trader Dashboard',
        iconCls: 'x-fa fa-backward',
        action: 'back',
        currentPnlXtype: 'traderaccountsinfofrm',
        containerPnlXtype: 'traderaccountsinfopnl',
        hiddenCompXtype: 'traderaccountsinfogrid',
        containerType: 'traderaccountsinfopnl',
        ui: 'soft-purple',
       
        handler: 'funcBackToDashboardPnl'
    }, '->', {
        text: 'Save Trader Information',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        currentPnlXtype: 'traderaccountsinfofrm',
        containerPnlXtype: 'traderaccountsinfopnl',
        hiddenCompXtype: 'traderaccountsinfogrid',
        containerType: 'traderaccountsinfopnl',
        storeID : '',
        handler: 'funcTraderRegistration'
    },{
        text: 'Print Trader Information',
        iconCls: 'x-fa fa-print',
        ui: 'soft-purple',
    },{
        text: 'Trader Account Users',
        iconCls: 'x-fa fa-user',
        ui: 'soft-purple',
    }]

});