/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.toolbars.NarcoticImportPermitsTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'narcoticimportpermitstb',
    ui: 'footer',
    defaults: {
        //arrowAlign: 'bottom',
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
            sec_dashboard:'narcoticimportpermitsdash',
            name: 'poepermitstbRegHomeBtn'
        },
        {
            text: 'New Narcortic Permit',
            iconCls: 'x-fa fa-plus-square',
            handler: 'onshowNewNarcoticsPermits',
            app_type: 60
            
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        }
        
    ]
});