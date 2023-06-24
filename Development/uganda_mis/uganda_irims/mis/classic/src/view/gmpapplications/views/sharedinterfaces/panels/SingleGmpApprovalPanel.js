/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.SingleGmpApprovalPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'singlegmpapprovalpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Document Uploads',
            region: 'center',
            layout: 'fit',
            items: [
                {
                    xtype: 'gmpappdocuploadsgenericgrid'
                }
            ]
        },
        {
            title: 'Product Line Details(Director Recommendation)',
            region: 'west',
            width: 600,
            collapsed: false,
            collapsible: true,
            titleCollapse: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'productlinedetailsdgrecommgrid'
                }
            ]
        },
        {
            title: 'Other Details',
            region: 'south',
            height: 200,
            collapsed: true,
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
                                    text: 'More Details',
                                    iconCls: 'fa fa-bars',
                                    name: 'more_app_details',
                                    isReadOnly: 0,
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
                    text: 'Non-Compliance Observations',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-thumbs-down',
                    name: 'non_compliance',
                    childXtype: 'noncomplianceobservationswingrid',
                    winTitle: 'DETAILS OF NON-COMPLIANCE OBSERVATIONS',
                    winWidth: '70%',
                    stores: '[]'
                },
                '->',
                {
                    text: 'Overall Recommendation',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-chevron-circle-up',
                    stores: '["gmpapprovaldecisionsstr"]',
                    table_name: 'tra_gmp_applications',
                    name: 'show_recommendation'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ]
});