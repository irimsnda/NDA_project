/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.toolbars.VeterinaryMedicinesGmpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'veterinarymedicinesgmptb',
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
            name: 'drugsGmpHomeBtn',
            dash_wrapper: 'drugsgmpdashwrapper',
            dashboard: 'drugsgmpdash'
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
                        wrapper_xtype: 'drugsgmpdashwrapper',
                        app_type: 5
                    },
                    '-',
                    {
                        text: ' GMP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'drugsgmpdashwrapper',
                        app_type: 6
                    },
                    '-',
                    {
                        text: 'GMP  Widthrawal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'drugsgmpdashwrapper',
                        app_type: 39
                    },
                    '-',
                    {
                        text: 'GMP Variation',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'drugsgmpdashwrapper',
                        app_type: 40
                    },
                    '-',
                    {
                        text: 'GMP Data Clean-Up',
                        iconCls: 'x-fa fa-check',
                        handler:'showDataCleanUpWindow',
                        childXtype: 'editgmpapplicationdetails',
                        wrapper: 'drugsgmpdashwrapper',
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
                        wrapper_xtype: 'drugsgmpdashwrapper',
                        app_type: 5
                    },
                    {
                        text: 'Drugs Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'drugsgmpdashwrapper',
                        app_type: 6
                    },
                    {
                        text: 'Drugs  Widthrawal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'drugsgmpdashwrapper',
                        app_type: 39
                    },
                    {
                        text: 'Drugs  Alteration',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'drugsgmpdashwrapper',
                        app_type: 40
                    }
                ]
            }
        }
    ]
});