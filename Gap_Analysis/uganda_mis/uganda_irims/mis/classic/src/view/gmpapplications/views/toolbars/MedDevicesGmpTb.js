/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.toolbars.MedDevicesGmpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'meddevicesgmptb',
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
            name: 'meddevicesGmpHomeBtn',
            dash_wrapper: 'meddevicesgmpdashwrapper',
            dashboard: 'meddevicesgmpdash'
        },
        {
            text: 'GMP Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Medical Devices GMP',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
                        app_type: 5
                       /* menu:{
                            xtype: 'menu',
                            items:[
                                {
                                    text: 'Oversea GMP',
                                    iconCls: 'x-fa fa-check',
                                    handler:'showNewGmpApplication',
                                    wrapper_xtype: 'meddevicesgmpdashwrapper',
                                    app_type: 5,
                                    gmp_type: 1
                                },
                                {
                                    text: 'Domestic GMP',
                                    iconCls: 'x-fa fa-check',
                                    handler:'showNewGmpApplication',
                                    wrapper_xtype: 'meddevicesgmpdashwrapper',
                                    app_type: 5,
                                    gmp_type: 2
                                }
                            ]
                        }*/
                    },
                    '-',
                    {
                        text: 'Medical Devices GMP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
                        app_type: 6
                    },
                    '-',
                    {
                        text: 'Medical Devices GMP Widthrawal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
                        app_type: 39
                    },
                    '-',
                    {
                        text: 'Medical Devices GMP Alteration',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGmpApplication',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
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
                        text: 'New Medical Devices GMP',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
                        app_type: 5
                    },
                    {
                        text: 'Medical Devices GMP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
                        app_type: 6
                    },
                    {
                        text: 'Medical Devices GMP Widthrawal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
                        app_type: 39
                    },
                    {
                        text: 'Medical Devices GMP Alteration',
                        iconCls: 'x-fa fa-check',
                        handler:'showGmpApplicationWorkflow',
                        wrapper_xtype: 'meddevicesgmpdashwrapper',
                        app_type: 40
                    }
                ]
            }
        }
    ]
});