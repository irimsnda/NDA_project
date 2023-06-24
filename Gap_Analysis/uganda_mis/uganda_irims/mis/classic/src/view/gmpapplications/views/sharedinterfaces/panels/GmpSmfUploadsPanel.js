/**
 * Created by Kip on 5/10/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpSmfUploadsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpsmfuploadspanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Application SMF Uploads',
            region: 'center',
            layout: 'fit',
            items: [
                {
                    xtype: 'gmpappdocuploadsgenericgrid'
                }
            ]
        },
        {
            title: 'Other Details',
            region: 'south',
            width: 200,
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
                            items:[
                                {
                                    text: 'More Details',
                                    iconCls: 'fa fa-bars',
                                    name: 'more_app_details',
                                    isReadOnly: 0
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