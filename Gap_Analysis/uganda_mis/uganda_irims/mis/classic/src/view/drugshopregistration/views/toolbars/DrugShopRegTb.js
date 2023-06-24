/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.toolbars.DrugShopRegTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'drugshopregtb',
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
            name: 'drugsPremiseRegHomeBtn'
        },
        {
            text: 'New Application',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'New Drug Shop Registration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewDrugShopRegistration',
                        wrapper_xtype: 'drugshopregdashwrapper',
                        app_type: 96
                    },
                    '-',
                    {
                        text: 'Drug Shop Renewal',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewDrugShopRegistration',
                        wrapper_xtype: 'drugshopregdashwrapper',
                        app_type: 2
                    },
                    '-',
                    {
                        text: 'Drug Shop Variation',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewDrugShopRegistration',
                        wrapper_xtype: 'drugshopregdashwrapper',
                        app_type: 3
                    },
                    '-',
                    {
                        text: 'Drug Shop  Withdrawal (Closure of the business activities)',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewDrugShopRegistration',
                        wrapper_xtype: 'drugshopregdashwrapper',
                        app_type: 4
                    },
                    '-',
                    {
                        text: 'Drug Shop  Application Data Clean-Up',
                        iconCls: 'x-fa fa-check',
                        handler: 'showDataCleanUpWindow',
                        wrapper: 'drugshopregdashwrapper',
                        childXtype: 'editpremiseapp',
                        app_type: 4
                    }
                ]
            }
        },{
            text: 'Application Data Clean-Up',
            iconCls: 'x-fa fa-check',
            childXtype: 'editpremiseappwizard',
            wrapper: 'drugshopregdashwrapper',
            handler: 'showDataCleanUpWindow',
        },'-',
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu: {
                xtype: 'menu',
                items: [
               
                    {
                        text: 'New Drug Shop  Registration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'drugshopregdashwrapper',
                        app_type: 1
                    },
                    {
                        text: 'Drug Shop  Renewal',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'drugshopregdashwrapper',
                        app_type: 2
                    },
                    {
                        text: 'Drug Shop  Alteration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'drugshopregdashwrapper',
                        app_type: 3
                    },
                    {
                        text: 'Drug Shop  Withdrawal',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'drugshopregdashwrapper',
                        app_type: 4
                    }
                ]
            }
        }
    ]
});