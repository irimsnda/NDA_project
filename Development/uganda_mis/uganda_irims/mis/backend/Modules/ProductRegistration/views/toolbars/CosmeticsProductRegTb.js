/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.toolbars.CosmeticsProductRegTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'cosmeticsProductRegTb',
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
            sec_dashboard:'cosmeticsproductregdash',
            name: 'cosmeticsProductRegHomeBtn'
        },
        {

            text:  'Application Initialisation',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'New Product Registration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewProductRegistration',
                        stores: '["dosageformstr", "assessmentprocedurestr", "classificationstr","commonnamesstr","siunitstr","distributionCategoryStr","storageconditionstr","routeofAdministrationStr","routeofAdministrationStr"]',
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
                        text: 'Produc Variation',
                        iconCls: 'x-fa fa-check',
                        handler: 'showRenAltProductRegistration',
                        app_type: 9
                    }, '-',
                    {
                        text: 'Product Withdrawal/Revocation',
                        iconCls: 'x-fa fa-check',
                        handler: 'showRenAltProductRegistration',
                        app_type: 17,
        },{
                        text: 'Product Application Data Clean-Up',
                        iconCls: 'x-fa fa-check',
                        childXtype: 'editcosmeticsproductapplicationwizard',
                        wrapper: 'cosmeticsproductregdash',
                        handler: 'showDataCleanUpWindow',
                    },'-',
                    {
                        text: 'Application Query Response(Responses for Additional Information)',
                        iconCls: 'x-fa fa-check',
                        childXtype: 'registrationqueryresponsedetailsPnl',
                        wrapper: 'cosmeticsproductregdash',
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
                        text: 'New Cosmetics Product Registration',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'cosmeticsproductRegDashWrapper',
                        handler: 'showProductRegWorkflow',
                        app_type: 7
                    },
                    {
                        text: 'Cosmetics Product Renewal',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'cosmeticsproductRegDashWrapper',
                        handler: 'showProductRegWorkflow',
                        app_type: 8
                    },
                    {
                        text: 'Cosmetics Product Alteration',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'cosmeticsproductRegDashWrapper',
                        handler: 'showProductRegWorkflow',
                        app_type: 9
                    }
                ]
            }
        }
    ]
});