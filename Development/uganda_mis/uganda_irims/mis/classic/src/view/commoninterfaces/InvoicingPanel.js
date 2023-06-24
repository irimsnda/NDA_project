/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.commoninterfaces.InvoicingPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'invoicingpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [{
            xtype: 'appinvoicepaymentspanel',
            region: 'center'
        },
        
        {
            title: 'Other Details',
            region: 'north',
            width: 200,
            collapsed: false,
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
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Product Details',
                            name: 'product_details',
                            hidden: true
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Premise Details',
                            name: 'premise_details',
                            hidden: true
                        },
                        {
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
                                },{
                                    text: 'Variation Request',
                                    iconCls: 'fa fa-bars',
                                    name: 'variation_requests',
                                    hidden: true,
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
                    xtype: 'applicationdismissalbtn'
                },
                
               
                '->',
               
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