/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.laboratory_services.views.panels.LabServicesSamplePaymentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'labservicessamplepaymentpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
   
    items: [{
            title: 'Other Details',
            region: 'north',
            width: 200,
            collapsible: true,
            titleCollapse: true,
            items: [{
                    xtype: 'form',
                    bodyPadding: 5,
                    layout: 'column',
                    defaults: {
                        margin: 2,
                        labelAlign: 'top',
                        columnWidth: 0.5
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
                            xtype: 'toolbar',
                            ui: 'footer',
                            columnWidth: 1,
                            items: [{xtype:'tbfill'},
                                {
                                    text: 'View Application Details',
                                    iconCls: 'fa fa-bars',
                                    name: 'more_app_details',
                                    isReadOnly: 1,
                                    hidden: true,
                                    is_temporal: 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },{
            xtype: 'tabpanel',
            region: 'center',
            layout: 'fit',
            dockedItems:[{
                xtype: 'toolbar',
                dock: 'bottom',
                //flex: 0.2,
                width: '100%',
                height: 30,
                padding: '0 0 0 5',
                ui: 'footer',
                items: [{
                        xtype: 'displayfield',
                        //flex: 0.1,
                        labelWidth: 860,
                        margin: '0 0 0 42',
                        fieldLabel: 'RUNNING BALANCE',
                        labelStyle: 'font-weight:bold;color:red',
                        name: 'running_balance',
                        fieldStyle: {
                            'color': 'red'
                        }
            }]
            }],
            items: [{
                title: 'Payments/Receipting',
                scrollable: true,
                layout: 'fit',
                xtype: 'limsapplicationpaymentsgrid',
               features:[{
                   ftype:'searching'
               }]
            },{
                title: 'Invoice Details',
                xtype: 'limspaymentinvoicingcostdetailsgrid'
            }],
            
        },{
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
                    iconCls: 'x-fa fa-refresh',
                    text: 'Refresh',
                    ui: 'soft-purple',
                    tooltip: 'Refresh',
                    handler: function (btn) {
                        var panel = btn.up('panel'),
                            store = panel.down('limsapplicationpaymentsgrid').getStore(),
                            store2 = panel.down('limspaymentinvoicingcostdetailsgrid').getStore();
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
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%'
                }
            ]
        }
    ]
});