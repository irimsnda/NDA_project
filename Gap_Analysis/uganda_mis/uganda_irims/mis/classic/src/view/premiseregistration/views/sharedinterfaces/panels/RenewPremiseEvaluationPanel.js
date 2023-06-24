/**
 * Created by Kip on 11/27/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.RenewPremiseEvaluationPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'renewpremiseevaluationpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Evaluation Checklists',
            region: 'center',
            layout: 'fit',
            items: [
                {
                    xtype: 'premisescreeninggrid'
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
                    text: 'Inspection',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-sliders',
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                                text: 'Details',
                                iconCls: 'x-fa fa-bars',
                                childXtype: 'inspectiondetailstabpnl',
                                winTitle: 'Inspection Details',
                                winWidth: '60%',
                                name: 'inspection_details',
                                isReadOnly: 1,
                                stores: '[]'
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'applicationprevcommentsgrid',
                                winTitle: 'Inspection Comments',
                                winWidth: '60%',
                                name: 'prev_comments',
                                stores: '[]',
                                comment_type_id: 1,
                                target_stage: 'inspection',
                                isWin: 1
                            },
                            {
                                text: 'Documents',
                                iconCls: 'x-fa fa-upload',
                                childXtype: 'premregappprevdocuploadsgenericgrid',
                                winTitle: 'Inspection uploaded Documents',
                                winWidth: '80%',
                                name: 'prev_uploads',
                                stores: '[]',
                                target_stage: 'inspection',
                                isWin: 1
                            },
                            {
                                text: 'Report',
                                iconCls: 'x-fa fa-clipboard',
                                action: 'inspection_report',
                                handler: 'printManagersReport',
                                report_type: 'manager_evaluation'
                            }
                        ]
                    }
                },
                {
                    text: 'Comments',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-weixin',
                    childXtype: 'applicationcommentspnl',
                    winTitle: 'Evaluation Comments',
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
                    winTitle: 'Evaluation Documents',
                    winWidth: '80%',
                    name: 'docs_btn',
                    stores: '[]',
                    isWin: 1
                },
                {
                    text: 'Inspection Template',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-th-large',
                    childXtype: 'evaluationtemplatefrm',
                    winTitle: 'Inspection Template',
                    winWidth: '50%',
                    name: 'show_template',
                    stores: '[]',
                    hidden: true
                },
                '->',
                {
                    text: 'Save Evaluation Details',
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