/**
 * Created by Softclans on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.toolbars.ControlledDrugsLicensePermitsTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'controlleddrugslicensepermitstb',
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
            sec_dashboard:'controlleddrugslicensepermitsdash',
            name: 'poepermitstbRegHomeBtn'
        },{

            text: 'Control Drugs License & Permit Options',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Control Drugs License Application',
                    iconCls: 'x-fa fa-plus-square',
                    handler: 'onInitializeControlledDrugsImpPermits',
                    app_type: 60
                },
                {
                    text: 'Control Drugs Import permit Application',
                    iconCls: 'x-fa fa-plus-square',
                    handler: 'onInitializeControlledDrugsImpPermits',
                    app_type: 61,
                   
                }]
            }
        },{
            text: 'Order for Supply of Dangeruous Drugs',
            iconCls: 'x-fa fa-plus-square',
            hidden: true,
            handler: 'onInitializeControlledDrugsImpPermits',
            app_type: 71
        },
        
        '->',
        {
            text: 'Module User Manual',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Control Drugs License Application',
                        iconCls: 'x-fa fa-check',
                        handler: 'showImportExportPermitRegWorkflow',
                        wrapper: 'controlleddrugslicensepermitsdashwrapper',
                        wrapper_xtype: 'controlleddrugslicensepermitsdashwrapper',
                        app_type: 60
                    },
                    {
                        text: 'Control Drugs Import permit Application',
                        iconCls: 'x-fa fa-check',
                        handler: 'showImportExportPermitRegWorkflow',
                        wrapper: 'controlleddrugslicensepermitsdashwrapper',
                        wrapper_xtype: 'controlleddrugslicensepermitsdashwrapper',
                        app_type: 61
                    }, {
                        text: 'Order for Supply of Dangeruous Drugs',
                        iconCls: 'x-fa fa-check',
                        handler: 'showImportExportPermitRegWorkflow',
                        wrapper: 'controlleddrugslicensepermitsdashwrapper',
                        wrapper_xtype: 'controlleddrugslicensepermitsdashwrapper',
                        app_type: 71
                    }
                ]
            }
        }
        
    ]
});