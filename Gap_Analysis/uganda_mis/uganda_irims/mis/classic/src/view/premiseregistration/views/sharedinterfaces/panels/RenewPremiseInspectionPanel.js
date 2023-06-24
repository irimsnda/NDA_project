/**
 * Created by Kip on 11/26/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.RenewPremiseInspectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'renewpremiseinspectionpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Inspection Checklists',
            region: 'center',
            layout: 'fit',
            items: [
                {
                    xtype: 'premiseinspectionscreeninggrid'//'premisescreeninggrid'
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
                                    isReadOnly: 0,
                                    is_temporal: 1
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
                    text: 'Comments',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-weixin',
                    childXtype: 'applicationcommentspnl',
                    winTitle: 'Inspection Comments',
                    winWidth: '60%',
                    comment_type_id: 1,
                    name: 'comments_btn',
                    stores: '[]'
                },
                {
                    text: 'Documents/Reports',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    childXtype: 'premregappdocuploadsgenericgrid',
                    winTitle: 'Inspection Documents',
                    winWidth: '80%',
                    name: 'docs_btn',
                    stores: '[]',
                    isWin: 1
                },
                {
                    text: 'Inspection Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    childXtype: 'inspectiondetailstabpnl',
                    winTitle: 'Inspection Details',
                    winWidth: '60%',
                    name: 'inspection_details',
                    stores: '[]',
                    isReadOnly: 1
                },
                '->',
                {
                    text: 'Save Inspection Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn'
                },
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