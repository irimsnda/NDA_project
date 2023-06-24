/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.toolbars.ImportExportPermitsTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'importexportpermitstb',
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
            sec_dashboard:'importexportpermitsappswrapper',
            name: 'disposalpermitstbRegHomeBtn'
        },
        {
            text: 'Initiate Import/Export Permit Applications',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Import Visa Applications',
                        iconCls: 'x-fa fa-check',
                        handler: 'onInitiateImportExportApplication',
                        app_type: 12,
                        hidden: true
                    },{
                        text: 'Special Case Import Visa Applications',
                        iconCls: 'x-fa fa-check',
                        handler: 'onInitiateImportExportApplication',
                        app_type: 15,
                        hidden: true
                    },{
                        text: 'Special Export  Visa Applications',
                        iconCls: 'x-fa fa-check',
                        handler: 'onInitiateImportExportApplication',
                        app_type: 13,
                        hidden: true
                    },{
                        text: 'Raw Material Import Visa Applications',
                        iconCls: 'x-fa fa-check',
                        handler: 'onInitiateImportExportApplication',
                        app_type: 14,
                        hidden: true
                    },{
                        text: 'Export Visa Applications',
                        iconCls: 'x-fa fa-check',
                        handler: 'onInitiateImportExportApplication',
                        app_type: 16,
                        hidden: true
                    },{
                        text: 'POE Inspections',
                        iconCls: 'x-fa fa-check',
                        handler: 'onInitiateImportExportApplication',
                        app_type: 49,
                        hidden: true
                    }
                    ,{
                        text: 'Edit Permit Details and Permit Extension Process',
                        iconCls: 'x-fa fa-check',
                        childXtype: 'editimportexportapplicationdetails',
                        wrapper: 'drugsimportexportpermitsappsWrapper',
                        handler: 'showDataCleanUpWindow'
                    }
                ]
            }
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },{
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap', 
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'Import Permit Applications',
                        iconCls: 'x-fa fa-check',
                        handler:'showImportExportPermitRegWorkflow',
                         app_type: 12
                    },
                    '-',
                    {
                        text: 'Export Permit Applications',
                        iconCls: 'x-fa fa-check',
                        handler:'showImportExportPermitRegWorkflow',
                        app_type: 16
                    },
                    '-',{
                        text: 'Special Import Permit Applications',
                        iconCls: 'x-fa fa-check',
                        handler:'showImportExportPermitRegWorkflow',
                        app_type: 15
                    },{
                        text: 'Special Export Permit Applications',
                        iconCls: 'x-fa fa-check',
                        handler:'showImportExportPermitRegWorkflow',
                        app_type: 13

                    },{
                        text: 'Raw Material Import Permit Applications',
                        iconCls: 'x-fa fa-check',
                        handler:'showImportExportPermitRegWorkflow',
                        app_type: 14
                    },
                ]
            }
        }
    ]
});