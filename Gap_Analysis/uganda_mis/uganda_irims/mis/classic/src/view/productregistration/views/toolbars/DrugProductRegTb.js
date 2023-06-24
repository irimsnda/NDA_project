/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.toolbars.DrugProductRegTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'drugproductregtb',
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
            sec_dashboard:'drugsproductregdash',
            name: 'drugProductRegHomeBtn'
        },
        {
            text: 'Application Initialisation',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'New Product Registration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewProductRegistration',
                        app_type: 7
                    },
                    '-',
                    {
                        text: 'Product Renewal',
                        iconCls: 'x-fa fa-check',
                        handler: 'showRenAltProductRegistration',
                        app_type: 8
                    },
                    '-',
                    {
                        text: 'Product Alteration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showRenAltProductRegistration',
                        app_type: 9
                    }, '-',
                    {
                                    text: 'Product Withdrawal/Revocation',
                                    iconCls: 'x-fa fa-check',
                                    handler: 'showRenAltProductRegistration',
                                    app_type: 17,
                    },
                    {
                        text: 'Application Data Clean-Up',
                        iconCls: 'x-fa fa-check',
                        childXtype: 'editproductapplicationdetails',
                        wrapper: 'drugsproductRegDashWrapper',
                        handler: 'showDataCleanUpWindow',
                    },'-',
                    {
                        text: 'Registration Query Response',
                        iconCls: 'x-fa fa-check',
                        childXtype: 'registrationqueryresponsedetailsPnl',
                        wrapper: 'drugsproductRegDashWrapper',
                        handler: 'showDataCleanUpWindow',
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
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'New Medicines Product Registration',
                        iconCls: 'x-fa fa-check',

                        wrapper_xtype: 'drugsproductRegDashWrapper',
                        handler: 'showProductRegWorkflow',
                        app_type: 7
                    },
                    {
                        text: 'Medicines Product Renewal',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'drugsproductRegDashWrapper',
                        handler: 'showProductRegWorkflow',
                        app_type: 8
                    },
                    {
                        text: 'Medicines Product Alteration',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'drugsproductRegDashWrapper',
                        handler: 'showProductRegWorkflow',
                        app_type: 9
                    }
                ]
            }
        }
    ]
});