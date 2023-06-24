/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.toolbars.CosmeticsImportExportPermitsTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'cosmeticsimportexportpermitstb',
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
            sec_dashboard:'drugsimportexportpermitsappsWrapper',
            name: 'disposalpermitstbRegHomeBtn'
        },
        {
            text: 'Initiate Import/Export Permit Applications',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[{
                    text: 'Import/Export Visa Application',
                    iconCls: 'x-fa fa-sitemap',
                    menu: {
                            xtype: 'menu',
                            items: [{
                                text: 'Import Visa (Registered Products & Licensed Premises Outlets)',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                 app_type: 12
                            },'-',{
                                text: 'Special Import Visa(Registered & Non-Registered Products and Optional Premises Registration)',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                app_type: 15
                            },{
                                text: 'Donations Import Visa Applications',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                app_type: 80
                            },{
                                text: 'Raw Material Import Visa Applications',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                app_type: 14
                            },'-',
                            {
                                text: 'Export Permit Applications',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                app_type: 16
                            },'-',
                            {
                                text: 'Special Export Visa(Registered & Non-Registered Products and Optional Premises Registration)',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                app_type: 16
                            }]
                    }
                },{
                    text: 'Import/Export License Application',
                    iconCls: 'x-fa fa-sitemap',
                    menu: {
                            xtype: 'menu',
                            items: [{
                                text: 'Import License Applications',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                 app_type:78
                            },
                            '-',
                            {
                                text: 'Export License Applications',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                app_type: 81
                            }]
                        }

                }]
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