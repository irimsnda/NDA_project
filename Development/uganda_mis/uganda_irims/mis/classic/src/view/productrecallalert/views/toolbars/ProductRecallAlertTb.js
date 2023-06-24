/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 18/05/2021
 */
 Ext.define('Admin.view.productrecallalert.views.toolbars.ProductRecallAlertTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'productRecallAlertTb',
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
            sec_dashboard:'productRecallAlertdash',
            name: 'productRecallAlertHomeBtn'
        },
        {
            text: 'Product Recall Alert Option',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'New Product Recall alert',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewProductRecallAlertForm',
                        childXtype: 'productRecallAlertFrm',
                        winTitle: 'Product Recall Alert Form',
                        app_type: 7
                    },
                    '-',
                    {
                        text: 'Product Recall Alert Report',
                        iconCls: 'x-fa fa-check',
                        handler: 'showRenAltProductRegistration',
                        app_type: 8
                    }

                ]
            }
        }
    ]
});