
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.panels.ChangeMarketAuthorisationTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'changemarketauthorisationtb',
    ui: 'footer',
    defaults: {
        ui: 'soft-green',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            sec_dashboard:'changemarketauthorisationdash',
            dashwrapper :'#changemarketauthorisationdashwrapper',
            name: 'changemarketauthorisationbtn'
        },
        {
            text: 'Change Market Authorisation Request',
            iconCls: 'x-fa fa-plus-square',
            handler: 'onChangeMarketAuthorisationRequest'
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        }
    ]
});