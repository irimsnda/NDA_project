/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.toolbars.TobaccoRegistrationProductRegTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'tobaccoregistrationproductregtb',
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
            sec_dashboard:'foodproductregdash',
            name: 'tobaccoProductRegHomeBtn'
        },
        {
            text: 'New Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Product Registration',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewProductRegistration',
                         app_type: 7
                    },
                    '-',
                    {
                        text: 'Product Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showRenAltProductRegistration',
                        app_type: 8
                    },
                    '-',{
                        text: 'Product Variation',
                        iconCls: 'x-fa fa-check',
                        handler:'showRenAltProductRegistration',
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
                        childXtype: 'editfoodsproductapplicationwizard',
                        wrapper: 'foodproductregdash',
                        handler: 'showDataCleanUpWindow',
                    },'-',
                    {
                        text: 'Application Query Response(Responses for Additional Information)',
                        iconCls: 'x-fa fa-check',
                        childXtype: 'registrationqueryresponsedetailsPnl',
                        wrapper: 'foodproductregdash',
                        handler: 'showDataCleanUpWindow',
                    }
                ]
            }
        },
        '->',
        
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Product Registration',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'foodproductRegDashWrapper',
                        handler:'showProductRegWorkflow',
                        app_type: 7
                    },
                    {
                        text: 'Product Renewal',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'foodproductRegDashWrapper',
                        handler:'showProductRegWorkflow',
                        app_type: 8
                    },
                    {
                        text: 'Products Product Alteration',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'foodproductRegDashWrapper',
                        handler:'showProductRegWorkflow',
                        app_type: 9
                    }
                ]
            }
        }
    ]
});