/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.controldocument_management.views.toolbars.ControlDocument_ManagementTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'controldocument_managementtb',
    itemId: 'controldocument_managementtb',
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
            sec_dashboard:'controldocument_managementdash',
            name: 'permithome_btn'
        },
        {
            text: 'Control Document Applications',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Control Document Preparation',
                        iconCls: 'x-fa fa-check',
                        handler:'showControlDocumentApplication',
                         app_type: 57
                    },
                    '-',
                    {
                        text: 'Review of Control Document',
                        iconCls: 'x-fa fa-check',
                        handler:'showControlDocumentApplication',
                        app_type: 58
                    },
                   
                ]
            }
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap', 
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Control Document Preparation',
                        iconCls: 'x-fa fa-check',
                        handler:'showControlDocumentProcessWorkflow',
                         app_type: 51
                    },
                    '-',
                    {
                        text: 'Review of Control Document',
                        iconCls: 'x-fa fa-check',
                        handler:'showControlDocumentProcessWorkflow',
                        app_type: 52
                    }
                    
                ]
            }
        }
    ]
});