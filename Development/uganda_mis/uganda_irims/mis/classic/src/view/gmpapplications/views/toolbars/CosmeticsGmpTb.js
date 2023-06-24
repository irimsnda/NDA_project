/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.toolbars.CosmeticsGmpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'cosmeticsgmptb',
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
            name: 'cosmeticsGmpHomeBtn',
            dash_wrapper: 'cosmeticsgmpdashwrapper',
            dashboard: 'cosmeticsgmpdash'
        },
        {
            text: 'GMP Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New GMP Inspection Request',
                        iconCls: 'x-fa fa-check',
                        app_type: 5,
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'cosmeticsgmpdashwrapper'
                    },
                    '-',
                    {
                        text: 'GMP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'cosmeticsgmpdashwrapper',
                        app_type: 6
                    },
                    '-',
                    {
                        text: 'Drugs  Widthrawal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'cosmeticsgmpdashwrapper',
                        app_type: 39
                    },
                    '-',
                    {
                        text: 'GMP Variation',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'cosmeticsgmpdashwrapper',
                        app_type: 40
                    },
                    '-',
                    {
                        text: 'Drugs Data Clean-Up',
                        iconCls: 'x-fa fa-check',
                        handler:'showDataCleanUpWindow',
                        childXtype: 'editgmpapplicationdetails',
                        wrapper: 'cosmeticsgmpdashwrapper',
                        app_type: 40
                    }
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
                        text: 'New Premise GMP',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'cosmeticsgmpdashwrapper',
                        app_type: 5
                    },
                    {
                        text: ' Premise GMP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'cosmeticsgmpdashwrapper',
                        app_type: 6
                    }
                ]
            }
        }
    ]
});