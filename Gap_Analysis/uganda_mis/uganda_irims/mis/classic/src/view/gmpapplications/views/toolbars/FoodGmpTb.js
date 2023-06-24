/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.toolbars.FoodGmpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'foodgmptb',
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
            name: 'foodGmpHomeBtn',
            dash_wrapper: 'foodgmpdashwrapper',
            dashboard: 'foodgmpdash'
        },
        {
            text: 'GMP Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New GMP',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'foodgmpdashwrapper',
                        app_type: 5
                    },
                    '-',
                    {
                        text: 'GMP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'foodgmpdashwrapper',
                        app_type: 6
                    },
                    {
                        text: 'GMP Widthrawal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'foodgmpdashwrapper',
                        app_type: 39
                    },
                    {
                        text: 'GMP Alteration',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'foodgmpdashwrapper',
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
                        text: 'New GMP',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'foodgmpdashwrapper',
                        app_type: 5
                    },
                    {
                        text: ' GMP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'foodgmpdashwrapper',
                        app_type: 6
                    },
                    {
                        text: ' GMP Widthrawal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'foodgmpdashwrapper',
                        app_type: 39
                    },
                    {
                        text: ' GMP Alteration',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'foodgmpdashwrapper',
                        app_type: 40
                    }
                ]
            }
        }
    ]
});