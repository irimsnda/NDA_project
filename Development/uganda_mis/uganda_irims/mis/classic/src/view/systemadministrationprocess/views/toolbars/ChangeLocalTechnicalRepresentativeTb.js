
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.panels.ChangeLocalTechnicalRepresentativeTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'changelocaltechnicalrepresentativetb',
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
            sec_dashboard:'changelocaltechnicalrepresentativedash',
            dashwrapper :'#changelocaltechnicalrepresentativedashwrapper',
            name: 'changemarketauthorisationbtn'
        },
        {
            text: 'Change Local Technical Representative',
            iconCls: 'x-fa fa-plus-square',
            handler: 'onltrchangeRequest'
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        }
    ]
});