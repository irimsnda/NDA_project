/**
 * Created by Kip on 9/22/2018.
 */ 
Ext.define('Admin.view.productnotifications.views.toolbars.AuthorisedProdNotificationctnTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'authorisedprodnotificationctntb',    
    itemId: 'authorisedprodnotificationctntb',
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
            sec_dashboard:'authorisedprodnotificationdash',
            name: 'productNotificationRegHomeBtn'
        },
        {
            text: 'New Application',
            iconCls: 'x-fa fa-plus-square',
            hidden: true,
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Authorised & Notified Product',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewProductRegistration',
                        app_type: 7
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
                        text: 'New Authorised & Notified Product',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'authorisedprodnotificationdashwrapper',
                        handler:'showProductRegWorkflow',
                        app_type: 7
                    }
                ]
            }
        }
    ]
});