/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.commoninterfaces.ImportPermitInvoicingPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.importpermitinvoicingpanel',
    padding: '2 0 2 0',
    autoScroll: true,
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Cost Elements',
            region: 'center',
            layout: 'vbox',
            items: [
                {
                    xtype: 'importinvoicingcostelementsgrid',
                    flex: 1
                },
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    height: 80,
                    width: '100%',
                    name: 'invoicing_details',
                    defaults:{
                        labelWidth: 108,
                        width: 280,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'isLocked'
                        },{
                            xtype: 'numberfield',
                            fieldLabel: 'Request FOB Value',
                            name: 'permit_fob_value',
                            readOnly: true,labelWidth: 108,
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'combo',
                            name: 'permit_currency_id',
                            store: 'currenciesstr',
                            forceSelection: true,
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local', 
                            fieldLabel: 'Request Proforma Currency',
                            anyMatch: true,
                            readOnly: true,
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            },
                            listeners: {
                                beforerender: function () {
                                    var store = this.getStore();
                                    store.removeAll();
                                    store.load();
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            name: 'paying_currency_id',
                            store: 'currenciesstr',
                            forceSelection: true,
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local', fieldLabel: 'Paying Currency',
                            emptyText: 'Select Paying Currency',
                           
                            anyMatch: true,
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            },
                            listeners: {
                                beforerender: function () {
                                    var store = this.getStore();
                                    store.removeAll();
                                    store.load();
                                }
                            }
                        },{
                            xtype: 'checkbox',
                            fieldLabel: 'Is Fast Track',
                            name: 'is_fast_track',
                            inputValue: 1,
                            labelWidth: 90,
                            hidden: true,
                            uncheckedValue: 0,
                            labelStyle: 'font-weight:bold'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 20
                        },
                        '->',
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Invoice No',
                            name: 'invoice_no',
                            labelWidth: 90,
                            value: '****',
                            labelStyle: 'font-weight:bold',
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },{

                            xtype: 'hiddenfield',
                            name: 'invoice_id'
                        }
                    ]
                },
                {
                    xtype: 'importinvoicingcostdetailsgrid',
                    flex: 0.9
                }
            ]
        },
        {
            title: 'Other Details',
            region: 'north',
            width: 200,
            
            collapsible: true,
            titleCollapse: true,
            items: [
                {
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
                        },{
                            xtype: 'toolbar',
                            ui: 'footer',
                            columnWidth: 1,
                            items: [
                                {
                                    text: 'View Application Details',
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
                    text: 'Print Invoice',
                    ui: 'soft-purple',
                    name: 'print_invoice',
                    iconCls: 'fa fa-print',
                    report_type: 'Invoice'
                },
                {
                    text: 'Remove Selected Items',
                    ui: 'soft-purple',
                    name: 'remove_selected',
                    iconCls: 'fa fa-close',
                    disabled: true
                },
                {
                    text: 'Delete Invoice',
                    ui: 'soft-purple',
                    name: 'delete_invoice',
                    hidden: true,
                    iconCls: 'fa fa-trash-o'
                },
                {
                    text: 'Refresh',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-refresh',
                    handler: function () {
                        var panel = this.up('panel'),
                            store = panel.down('invoicingcostdetailsgrid').getStore(),
                            store2 = panel.down('invoicingcostelementsgrid').getStore();
                        store.load();
                        store2.load();
                    }
                },
                '->',
                {
                    text: 'Save/Update Invoice Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1,
                    isLocked: 0,
                    isSubmission: 0
                },
                {
                    text: 'Generate/Confirm Invoice Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'commit_btn',
                    toaster: 1,
                    isLocked: 1,
                    isSubmission: 0
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    winWidth: '50%',
                    toaster: 0,
                    isLocked: 1,
                    isSubmission: 1
                }
            ]
        }
    ]
});
