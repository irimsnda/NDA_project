/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.toolbars.PoeInspectionProcessTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'poeinspectionprocesstb',
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
            sec_dashboard:'poeinspectionprocessdash',
            name: 'poepermitstbRegHomeBtn'
        },
        {
            text: 'New Import Permit Inspection',
            iconCls: 'x-fa fa-plus-square',
            handler: 'onshowNewImportExportPOEInspection',
            app_type: 49
            
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        }
        
    ]
});