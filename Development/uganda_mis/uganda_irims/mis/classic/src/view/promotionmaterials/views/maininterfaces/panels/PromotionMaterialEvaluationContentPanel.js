Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromotionMaterialEvaluationContentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'promotionmaterialevaluationcontentpanel',
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
                            fieldLabel: 'Applicant Details ',
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
                            fieldLabel: 'Promotion And Advertisement Details',
                            name: 'promotion_materials_details',
                            hidden: true
                        },
                        {
                            xtype: 'toolbar',
                            ui: 'footer',
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
                    text: 'Inspection',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-sliders',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Details',
                                iconCls: 'x-fa fa-bars',
                                childXtype: 'inspectiondetailstabpnl',
                                winTitle: 'Inspection Details',
                                winWidth: '60%',
                                name: 'inspection_details',
                                stores: '[]'
                            },
                            {
                                text: 'Comments',
                                iconCls: 'x-fa fa-weixin',
                                childXtype: 'applicationprevcommentsgrid',
                                name: 'prev_comments',
                                winTitle: 'Inspection Comments',
                                winWidth: '60%',

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
                                target_stage: 'inspection'
                            },
                            {
                                text: 'Report',
                                iconCls: 'x-fa fa-clipboard',
                                action: 'inspection_report',
                                handler: 'printManagersReport',
                                report_type: 'Inspection Report'
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
                    comment_type_id: 2,
                    name: 'comments_btn',
                    stores: '[]'
                },
                {
                    text: 'Documents/Reports ',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    childXtype: 'premregappdocuploadsgenericgrid',
                    winTitle: 'Evaluation Documents',
                    name: 'docs_btn',
                    winWidth: '80%',
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
                    text: 'Save Evaluation Details ',
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