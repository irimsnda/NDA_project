/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.common_panels.NewProductsPaymentsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'newproductspaymentspanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 35,
            defaults: {
                labelAlign: 'right',
                labelStyle: "color:#595959"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '16px'
                }
            }, {
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '16px'
                    }
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '16px'
                    }
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '16px'
                    }
                }, {
                    xtype: 'hiddenfield',
                    name: 'process_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'workflow_stage_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'invoice_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'product_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'applicant_id'
                }

                
            ]
        }
    ],
    items: [
        {
            title: 'Payments/Receipting',
            region: 'center',
            layout: 'vbox',
            items: [
                {
                    xtype: 'paymentinvoicingcostdetailsgrid',
                    flex: 0.8
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    //flex: 0.2,
                    width: '100%',
                    height: 30,
                    padding: '0 0 0 5',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'displayfield',
                            value: 'Received Payments',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold',
                                'text-align': 'center'
                            }
                        }
                    ]
                },
                {
                    xtype: 'applicationpaymentsgrid',
                    flex: 0.9
                },
                {
                    xtype: 'displayfield',
                    flex: 0.1,
                    labelWidth: 960,
                    margin: '0 0 0 42',
                    fieldLabel: 'RUNNING BALANCE',
                    labelStyle: 'font-weight:bold;color:red',
                    name: 'running_balance',
                    fieldStyle: {
                        'color': 'red'
                    }
                }
            ]
        },
        {
            title: 'Other Details',
            region: 'east',
            width: 400,
            collapsed: true,
            collapsible: true,
            titleCollapse: true,
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 5,
                    defaults: {
                        margin: 2,
                        labelAlign: 'top'
                    },
                    fieldDefaults: {
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold'
                        }
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Applicant Details',
                            name: 'applicant_details'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Product Details',
                            name: 'product_details',
                            
                        },
                        {
                            xtype: 'toolbar',
                            ui: 'footer',
                            items: [
                                {
                                    text: 'More Details',
                                    iconCls: 'fa fa-bars',
                                    name: 'more_app_details',
                                    isReadOnly: 1,
                                    is_temporal: 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            ui: 'footer',
            region: 'south',
            height: 45,
            split: false,
            items: [
                {
                    xtype: 'transitionsbtn'
                },
                {
                    xtype: 'button',
                    text: 'Receive Payments',
                    iconCls: 'x-fa fa-plus',
                    ui: 'soft-purple',
                    winTitle: 'Account Transactions',
                    winWidth: '60%',
                    name: 'receive_payments',
                    childXtype: 'paymentsreceptionfrm',
                    table_name: 'tra_product_applications',
                    stores: '["receipttypestr","currenciesstr","paymentmodesstr","banksstr"]'
                },
                {
                    iconCls: 'x-fa fa-refresh',
                    text: 'Refresh',
                    ui: 'soft-purple',
                    tooltip: 'Refresh',
                    handler: function (btn) {
                        var panel = btn.up('panel'),
                            store = panel.down('applicationpaymentsgrid').getStore(),
                            store2 = panel.down('paymentinvoicingcostdetailsgrid').getStore();
                        store.load();
                        store2.load();
                    }
                },
                '->',
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'drugproductregistrationstr',
                    table_name: 'tra_product_applications',
                    winWidth: '50%'
                }
            ]
        }
    ]
});