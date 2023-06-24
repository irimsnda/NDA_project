/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.toolbars.ImportExportPersonalUserPermitsTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'importexportpersonaluserpermitstb',
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
            sec_dashboard:'importexportpersonaluserpermitsdash',
            name: 'permitstbRegHomeBtn'
        },
        {
            text: 'Personal User permit Declaration',
            iconCls: 'x-fa fa-plus-square',
            handler: 'onshowPersonalUsePermitsDeclaration',
            app_type: 60
            
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        }
        
    ]
});